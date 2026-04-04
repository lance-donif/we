import sharedCssText from './magazineShared.css?raw'

function blendColor(hex, whiteRatio) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const f = 1 - whiteRatio
  const rr = Math.round(r * f + 255 * whiteRatio)
  const gg = Math.round(g * f + 255 * whiteRatio)
  const bb = Math.round(b * f + 255 * whiteRatio)
  return '#' + [rr, gg, bb].map(v => Math.min(255, Math.max(0, v)).toString(16).padStart(2, '0')).join('')
}

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
      const rootBg = template.sectionPalette[0]?.bg || '#f5f5f5'
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
          `background-color:${rootBg}`,
          'color:#0f0f0f',
          'border-radius:32px',
          'overflow:hidden',
          `font-family:${serifStack}`,
          'box-sizing:border-box',
        ].join('; ')
      )

      const sections = Array.from(clone.querySelectorAll('.wx-section'))

      sections.forEach((section, index) => {
        const palette = template.sectionPalette[index % template.sectionPalette.length]
        const mutedSurface = blendColor(palette.bg, 0.72)
        const mutedBorder = blendColor(palette.bg, 0.74)
        const elevatedSurface = blendColor(palette.bg, 0.78)
        const elevatedBorder = blendColor(palette.bg, 0.54)
        const labelSurface = blendColor(palette.bg, 0.72)
        const topRadius = index === 0 ? 'border-top-left-radius:32px; border-top-right-radius:32px;' : ''
        const bottomRadius = index === sections.length - 1 ? 'border-bottom-left-radius:32px; border-bottom-right-radius:32px;' : ''
        section.setAttribute(
          'style',
          `background-color:${palette.bg}; ${sectionPaper} padding:12px 12px 12px; position:relative; ${topRadius} ${bottomRadius}`
        )

        const page = section.querySelector('.wx-page')
        if (page) {
          page.setAttribute(
            'style',
            `display:block; margin-bottom:55px; text-align:right; font-family:${serifStack}; font-size:73px; line-height:1; font-weight:700; color:${palette.number};`
          )
        }

        const h2 = section.querySelector('.wx-h2')
        if (h2) {
          h2.setAttribute(
            'style',
            `font-family:${serifStack}; font-size:41px; line-height:1.2; font-weight:900; color:${palette.accent}; margin:0 0 9px;`
          )
        }

        const h3 = section.querySelector('.wx-h3')
        if (h3) {
          h3.setAttribute(
            'style',
            h3.classList.contains('wx-h3-mood')
              ? `margin-top:0; margin-bottom:6px; font-family:${sansStack}; font-size:14px; line-height:1.2; font-weight:700; letter-spacing:0.16em; opacity:0.72; color:${palette.accent};`
              : `margin:0 0 41px; font-family:${serifStack}; font-size:28px; line-height:1.2; font-weight:700; color:${palette.h3};`
          )
        }

        section.querySelectorAll('.wx-p').forEach((paragraph, paragraphIndex) => {
          paragraph.setAttribute(
            'style',
            `margin-top:${paragraphIndex === 0 ? 0 : 21}px; font-family:${serifStack}; font-size:19.5px; line-height:1.8; font-weight:500; color:#0f0f0f; text-align:left;`
          )
        })

        section.querySelectorAll('.wx-strong').forEach((strong) => {
          strong.setAttribute(
            'style',
            `font-weight:700; color:${palette.accent}; background:linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 68%, ${palette.cardBg} 68%, ${palette.cardBg} 100%); padding:0 2px;`
          )
        })

        section.querySelectorAll('.wx-feature').forEach((feature) => {
          feature.setAttribute('style', 'margin-top:28px; display:flex; justify-content:space-between; align-items:flex-end; gap:14px;')
          const featureCopy = feature.querySelector('.wx-feature-copy')
          if (featureCopy) {
            featureCopy.setAttribute('style', 'flex:1; min-width:0;')
          }
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
              `width:24px; height:24px; border-radius:7px; flex-shrink:0; background:linear-gradient(135deg, ${palette.accent}, ${palette.cardBg}); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.5);`
            )
          }
        })

        section.querySelectorAll('.wx-callout').forEach((card) => {
          card.setAttribute(
            'style',
            isBalkan
              ? `margin-top:28px; padding:14px; border-radius:18px; background-color:${palette.cardBg}; border:1px solid rgba(255,255,255,0.34); box-shadow:inset 0 1px 0 rgba(255,255,255,0.38);`
              : `margin-top:28px; padding:14px; border-radius:18px; background:${palette.cardBg}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.38);`
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
              ? `margin-top:28px; padding:14px; border-radius:18px; background-color:${elevatedSurface}; border:1px solid ${elevatedBorder}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.65);`
              : `margin-top:28px; padding:14px; border-radius:18px; background:${mutedSurface}; border:1px solid ${mutedBorder}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.65);`
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
              ? `margin-top:28px; display:flex; gap:14px; align-items:flex-start; padding:14px; border-radius:18px; background-color:${palette.cardBg}; border:1px solid rgba(255,255,255,0.34); box-shadow:inset 0 1px 0 rgba(255,255,255,0.45);`
              : `margin-top:28px; display:flex; gap:14px; align-items:flex-start; padding:14px; border-radius:18px; background:${palette.cardBg}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.45);`
          )
          const icon = highlight.querySelector('.wx-highlight-icon')
          if (icon) {
            icon.setAttribute(
              'style',
              `width:18px; height:18px; margin-top:2px; border-radius:6px; flex-shrink:0; background:linear-gradient(135deg, ${palette.accent}, ${palette.cardBg});`
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
              ? `margin-top:28px; padding:14px; border-radius:18px; background-color:${palette.cardBg}; border:1px solid rgba(255,255,255,0.34); box-shadow:inset 0 1px 0 rgba(255,255,255,0.46), 0 10px 22px rgba(34,28,21,0.06);`
              : `margin-top:28px; padding:14px; border-radius:18px; background:${palette.cardBg}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.46), 0 10px 22px rgba(34,28,21,0.06);`
          )
          const label = card.querySelector('.wx-scheme-label')
          if (label) {
            label.setAttribute(
              'style',
              `display:inline-flex; align-items:center; padding:4px 10px; border-radius:999px; font-family:${sansStack}; font-size:10px; line-height:1; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:${palette.accent}; background:${labelSurface};`
            )
          }
          const content = card.querySelector('.wx-scheme-content')
          if (content) {
            content.setAttribute('style', 'margin-top:10px; display:flex; flex-direction:column; gap:12px;')
          }
          const media = card.querySelector('.wx-scheme-media')
          if (media) {
            media.setAttribute(
              'style',
              isBalkan
                ? `overflow:hidden; border-radius:16px; background-color:${elevatedSurface}; border:1px solid ${elevatedBorder};`
                : `overflow:hidden; border-radius:16px; background:${elevatedSurface};`
            )
          }
          const imageWrap = card.querySelector('.wx-scheme-image-wrap')
          if (imageWrap) {
            imageWrap.setAttribute('style', 'position:relative; width:100%; padding-bottom:65.79%; overflow:hidden;')
          }
          const image = card.querySelector('.wx-scheme-image')
          if (image) {
            image.setAttribute('style', 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; display:block;')
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
            `margin-top:28px; display:flex; flex-wrap:wrap; gap:14px;`
          )
          grid.querySelectorAll('.wx-media-card').forEach((card, ci) => {
            if (count === 2) {
              card.setAttribute('style', ci === 0
                ? 'display:flex; flex-direction:column; gap:6px; flex:1.15 1 0; min-width:0;'
                : 'display:flex; flex-direction:column; gap:6px; flex:0.85 1 0; min-width:0;')
            } else {
              card.setAttribute('style', 'display:flex; flex-direction:column; gap:6px; flex:1 1 0; min-width:0;')
            }
          })
          grid.querySelectorAll('.wx-media-frame').forEach((frame) => {
            frame.setAttribute(
              'style',
              isBalkan
                ? `position:relative; overflow:hidden; min-height:${count === 3 ? 162 : 186}px; border-radius:18px; background-color:${elevatedSurface}; border:1px solid ${elevatedBorder}; box-shadow:0 10px 22px rgba(34,28,21,0.05), inset 0 0 0 1px rgba(255,255,255,0.2);`
                : `position:relative; overflow:hidden; min-height:${count === 3 ? 162 : 186}px; border-radius:18px; background:${elevatedSurface}; box-shadow:inset 0 0 0 1px rgba(255,255,255,0.55);`
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
