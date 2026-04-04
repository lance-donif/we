import sharedCssText from './magazineShared.css?raw'

export function createMagazineTemplate(template) {
  return {
    ...template,
    cssText: `${sharedCssText}\n${template.cssText}`,
    copyRichText(clone) {
      const isBalkan = template.id === 'tpl-magazine-balkan'
      const balkanNoise =
        'background-image:url(https://fe-static.xhscdn.com/formula-static/slytherinh5/public/img/noise.1ab1741.svg); background-repeat:repeat;'
      const serifStack = "'Noto Serif SC','Songti SC','STSong',Georgia,'Times New Roman',serif"
      const sansStack = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Arial,sans-serif"
      const sectionPaper =
        isBalkan
          ? balkanNoise
          : 'background-image:linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.08)), repeating-linear-gradient(0deg, rgba(255,255,255,0.22) 0 1px, rgba(255,255,255,0) 1px 5px);'

      clone.setAttribute(
        'style',
        [
          'width:100%',
          'max-width:430px',
          'margin:0 auto',
          isBalkan ? `background:${template.sectionPalette[0].bg}` : 'background:none',
          'border-radius:0',
          'overflow:visible',
          `font-family:${serifStack}`,
          'box-sizing:border-box',
        ].join('; ')
      )

      const sections = Array.from(clone.querySelectorAll('.wx-section'))

      sections.forEach((section, index) => {
        const palette = template.sectionPalette[index % template.sectionPalette.length]
        const topRadius = index === 0 ? 'border-top-left-radius:32px; border-top-right-radius:32px;' : ''
        const bottomRadius = index === sections.length - 1 ? 'border-bottom-left-radius:32px; border-bottom-right-radius:32px;' : ''
        section.setAttribute(
          'style',
          `background-color:${palette.bg}; ${sectionPaper} padding:8.36px 26.6933px 14.52px; position:relative; ${topRadius} ${bottomRadius}`
        )

        const page = section.querySelector('.wx-page')
        if (page) {
          page.setAttribute(
            'style',
            `display:block; margin-bottom:55.04px; text-align:right; font-family:${serifStack}; font-size:73.3867px; line-height:1; font-weight:700; color:${palette.number};`
          )
        }

        const h2 = section.querySelector('.wx-h2')
        if (h2) {
          h2.setAttribute(
            'style',
            `font-family:${serifStack}; font-size:41.28px; line-height:1.2; font-weight:900; color:${palette.accent}; margin:0 0 9.1733px;`
          )
        }

        const h3 = section.querySelector('.wx-h3')
        if (h3) {
          h3.setAttribute(
            'style',
            h3.classList.contains('wx-h3-mood')
              ? `margin-top:0; margin-bottom:6px; font-family:${sansStack}; font-size:14px; line-height:1.2; font-weight:700; letter-spacing:0.16em; color:${palette.accent};`
              : `margin:0 0 41.28px; font-family:${serifStack}; font-size:27.52px; line-height:1.2; font-weight:700; color:${palette.h3};`
          )
        }

        section.querySelectorAll('.wx-p').forEach((paragraph, paragraphIndex) => {
          paragraph.setAttribute(
            'style',
            `margin-top:${paragraphIndex === 0 ? 0 : 20.64}px; font-family:${serifStack}; font-size:19.4933px; line-height:1.8; font-weight:500; color:#0f0f0f; text-align:left;`
          )
        })

        section.querySelectorAll('.wx-strong').forEach((strong) => {
          strong.setAttribute(
            'style',
            `font-weight:700; color:${palette.accent}; background:linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 68%, rgba(255,255,255,0) 68%, rgba(255,255,255,0) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 68%, ${palette.cardBg} 68%, ${palette.cardBg} 100%); padding:0 2px;`
          )
        })

        section.querySelectorAll('.wx-feature').forEach((feature) => {
          feature.setAttribute('style', 'margin-top:27.52px; display:grid; grid-template-columns:1fr auto; gap:13.76px; align-items:end;')
          const kicker = feature.querySelector('.wx-feature-kicker')
          if (kicker) {
            kicker.setAttribute(
              'style',
              `display:block; font-family:${serifStack}; font-size:11px; line-height:1.4; font-weight:700; color:${palette.h3}; letter-spacing:0.04em;`
            )
          }
          const featureTitle = feature.querySelector('.wx-feature-title')
          if (featureTitle) {
            featureTitle.setAttribute(
              'style',
              `display:block; margin-top:3px; font-family:${serifStack}; font-size:20px; line-height:1.2; font-weight:800; color:${palette.accent};`
            )
          }
          const mark = feature.querySelector('.wx-feature-mark')
          if (mark) {
            mark.setAttribute(
              'style',
              `width:24px; height:24px; border-radius:7px; background:linear-gradient(135deg, ${palette.accent}, ${palette.cardBg}); transform:rotate(12deg); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.5);`
            )
          }
        })

        section.querySelectorAll('.wx-callout').forEach((card) => {
          card.setAttribute(
            'style',
            isBalkan
              ? `margin-top:27.52px; padding:13.76px; border-radius:18.3467px; background-color:${palette.cardBg}; border:1px solid rgba(255,255,255,0.34); box-shadow:inset 0 1px 0 rgba(255,255,255,0.38);`
              : `margin-top:27.52px; padding:13.76px; border-radius:18.3467px; background:${palette.cardBg}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.38);`
          )
          card.querySelectorAll('.wx-callout-item').forEach((item, itemIndex) => {
            item.setAttribute(
              'style',
              itemIndex === 0
                ? `margin-top:${itemIndex === 0 ? 0 : 8}px; font-family:${serifStack}; font-size:16px; line-height:1.42; font-weight:800; color:${palette.h3};`
                : `margin-top:8px; font-family:${serifStack}; font-size:13px; line-height:1.74; font-weight:600; color:${palette.h3};`
            )
          })
        })

        section.querySelectorAll('.wx-note').forEach((note) => {
          note.setAttribute(
            'style',
            isBalkan
              ? 'margin-top:27.52px; padding:13.76px; border-radius:18.3467px; background-color:rgba(255,255,255,0.78); border:1px solid rgba(255,255,255,0.54); box-shadow:inset 0 1px 0 rgba(255,255,255,0.65);'
              : 'margin-top:27.52px; padding:13.76px; border-radius:18.3467px; background:rgba(255,255,255,0.72); border:1px solid rgba(255,255,255,0.74); box-shadow:inset 0 1px 0 rgba(255,255,255,0.65);'
          )
          note.querySelectorAll('.wx-note-line').forEach((line, lineIndex) => {
            line.setAttribute(
              'style',
              `margin-top:${lineIndex === 0 ? 0 : 7}px; font-family:${serifStack}; font-size:13px; line-height:1.74; color:#58524a;`
            )
          })
        })

        section.querySelectorAll('.wx-highlight').forEach((highlight) => {
          highlight.setAttribute(
            'style',
            isBalkan
              ? `margin-top:27.52px; display:grid; grid-template-columns:18px 1fr; gap:13.76px; align-items:start; padding:13.76px; border-radius:18.3467px; background-color:${palette.cardBg}; border:1px solid rgba(255,255,255,0.34); box-shadow:inset 0 1px 0 rgba(255,255,255,0.45);`
              : `margin-top:27.52px; display:grid; grid-template-columns:18px 1fr; gap:13.76px; align-items:start; padding:13.76px; border-radius:18.3467px; background:${palette.cardBg}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.45);`
          )
          const icon = highlight.querySelector('.wx-highlight-icon')
          if (icon) {
            icon.setAttribute(
              'style',
              `width:18px; height:18px; margin-top:2px; border-radius:6px; background:linear-gradient(135deg, ${palette.accent}, ${palette.cardBg}); transform:rotate(12deg);`
            )
          }
          const text = highlight.querySelector('.wx-highlight-text')
          if (text) {
            text.setAttribute(
              'style',
              `font-family:${serifStack}; font-size:14px; line-height:1.7; font-weight:700; color:${palette.h3};`
            )
          }
        })

        section.querySelectorAll('.wx-scheme-card').forEach((card) => {
          card.setAttribute(
            'style',
            isBalkan
              ? `margin-top:27.52px; padding:13.76px; border-radius:18.3467px; background-color:${palette.cardBg}; border:1px solid rgba(255,255,255,0.34); box-shadow:inset 0 1px 0 rgba(255,255,255,0.46), 0 10px 22px rgba(34,28,21,0.06);`
              : `margin-top:27.52px; padding:13.76px; border-radius:18.3467px; background:${palette.cardBg}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.46), 0 10px 22px rgba(34,28,21,0.06);`
          )
          const label = card.querySelector('.wx-scheme-label')
          if (label) {
            label.setAttribute(
              'style',
              `display:inline-flex; align-items:center; padding:4px 10px; border-radius:999px; font-family:${sansStack}; font-size:10px; line-height:1; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:${palette.accent}; background:rgba(255,255,255,0.72);`
            )
          }
          const content = card.querySelector('.wx-scheme-content')
          if (content) {
            content.setAttribute('style', 'margin-top:10px; display:grid; gap:12px;')
          }
          const media = card.querySelector('.wx-scheme-media')
          if (media) {
            media.setAttribute(
              'style',
              isBalkan
                ? 'overflow:hidden; border-radius:16px; background-color:rgba(255,255,255,0.78); border:1px solid rgba(255,255,255,0.54);'
                : 'overflow:hidden; border-radius:16px; background:rgba(255,255,255,0.76);'
            )
          }
          const image = card.querySelector('.wx-scheme-image')
          if (image) {
            image.setAttribute('style', 'width:100%; aspect-ratio:1.52; object-fit:cover; display:block;')
          }
          const title = card.querySelector('.wx-scheme-title')
          if (title) {
            title.setAttribute(
              'style',
              `font-family:${serifStack}; font-size:18px; line-height:1.25; font-weight:800; color:${palette.accent}; margin:0;`
            )
          }
          const meta = card.querySelector('.wx-scheme-meta')
          if (meta) {
            meta.setAttribute(
              'style',
              `margin-top:4px; font-family:${sansStack}; font-size:11px; line-height:1.4; font-weight:700; color:${palette.h3}; letter-spacing:0.04em;`
            )
          }
          const desc = card.querySelector('.wx-scheme-desc')
          if (desc) {
            desc.setAttribute(
              'style',
              `margin-top:8px; font-family:${serifStack}; font-size:13px; line-height:1.68; color:#4d473f;`
            )
          }
        })

        section.querySelectorAll('.wx-media-grid').forEach((grid) => {
          const count = grid.querySelectorAll('.wx-media-card').length
          grid.setAttribute(
            'style',
            `margin-top:27.52px; display:grid; gap:13.76px; grid-template-columns:${count === 2 ? '1.15fr 0.85fr' : 'repeat(3, minmax(0, 1fr))'};`
          )
          grid.querySelectorAll('.wx-media-card').forEach((card) => {
            card.setAttribute('style', 'display:flex; flex-direction:column; gap:6px;')
          })
          grid.querySelectorAll('.wx-media-frame').forEach((frame) => {
            frame.setAttribute(
              'style',
              isBalkan
                ? `position:relative; overflow:hidden; min-height:${count === 3 ? 162 : 186}px; border-radius:18.3467px; background-color:rgba(255,255,255,0.78); border:1px solid rgba(255,255,255,0.54); box-shadow:0 10px 22px rgba(34,28,21,0.05), inset 0 0 0 1px rgba(255,255,255,0.2);`
                : `position:relative; overflow:hidden; min-height:${count === 3 ? 162 : 186}px; border-radius:18.3467px; background:rgba(255,255,255,0.76); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.55);`
            )
          })
          grid.querySelectorAll('.wx-img').forEach((image) => {
            image.setAttribute('style', 'width:100%; height:100%; object-fit:cover; display:block;')
          })
          grid.querySelectorAll('.wx-media-caption').forEach((caption) => {
            caption.setAttribute(
              'style',
              `font-family:${sansStack}; font-size:10px; line-height:1.35; font-weight:700; color:${palette.accent}; text-align:center; letter-spacing:0.04em;`
            )
          })
        })
      })

      return clone
    },
  }
}
