import sharedCssText from './magazineShared.css?raw'

export function createMagazineTemplate(template) {
  return {
    ...template,
    cssText: `${sharedCssText}\n${template.cssText}`,
    copyRichText(clone) {
      clone.setAttribute(
        'style',
        [
          'width:100%',
          'max-width:450px',
          'margin:0 auto',
          'background:#fbfaf8',
          'border-radius:32px',
          'overflow:hidden',
          "font-family:'Noto Serif SC','Songti SC',serif",
          'box-sizing:border-box',
        ].join('; ')
      )

      const titleBlock = clone.querySelector('.wx-title-block')
      if (titleBlock) {
        titleBlock.setAttribute(
          'style',
          'padding:20px 16px 14px; background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(251,250,248,0.88));'
        )
      }

      const title = clone.querySelector('.wx-title')
      if (title) {
        title.setAttribute(
          'style',
          "font-family:'DM Sans',-apple-system,'PingFang SC','Helvetica Neue',sans-serif; font-size:13px; line-height:1.4; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:#7f7a72; margin:0;"
        )
      }

      const meta = clone.querySelector('.wx-meta')
      if (meta) {
        meta.setAttribute(
          'style',
          "margin-top:6px; display:flex; align-items:center; gap:10px; font-family:'DM Sans',-apple-system,'PingFang SC','Helvetica Neue',sans-serif; font-size:11px; line-height:1.5; color:#aaa39a; letter-spacing:0.12em; text-transform:uppercase;"
        )
      }

      const author = clone.querySelector('.wx-author')
      if (author) {
        author.setAttribute('style', 'color:#6d685f;')
      }

      const date = clone.querySelector('.wx-date')
      if (date) {
        date.setAttribute('style', 'color:#b7b1a8;')
      }

      clone.querySelectorAll('.wx-section').forEach((section, index) => {
        const palette = template.sectionPalette[index % template.sectionPalette.length]
        section.setAttribute(
          'style',
          `background:${palette.bg}; padding:34px 19px 40px; position:relative;`
        )

        const page = section.querySelector('.wx-page')
        if (page) {
          page.setAttribute(
            'style',
            `display:block; margin-bottom:12px; text-align:right; font-family:'Noto Serif SC','Songti SC',serif; font-size:62px; line-height:1; font-weight:700; color:${palette.number};`
          )
        }

        const h2 = section.querySelector('.wx-h2')
        if (h2) {
          h2.setAttribute(
            'style',
            `font-family:'Noto Serif SC','Songti SC',serif; font-size:35px; line-height:1.2; font-weight:900; color:${palette.accent}; margin:0;`
          )
        }

        const h3 = section.querySelector('.wx-h3')
        if (h3) {
          h3.setAttribute(
            'style',
            `margin-top:8px; font-family:'Noto Serif SC','Songti SC',serif; font-size:22px; line-height:1.35; font-weight:700; color:${palette.h3};`
          )
        }

        section.querySelectorAll('.wx-p').forEach((paragraph, paragraphIndex) => {
          paragraph.setAttribute(
            'style',
            `margin-top:${paragraphIndex === 0 ? 16 : 14}px; font-family:'Noto Serif SC','Songti SC',serif; font-size:16px; line-height:1.9; font-weight:500; color:#161616; text-align:left;`
          )
        })

        section.querySelectorAll('.wx-strong').forEach((strong) => {
          strong.setAttribute(
            'style',
            `font-weight:700; color:${palette.accent}; background:linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 68%, rgba(255,255,255,0) 68%, rgba(255,255,255,0) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 68%, ${palette.cardBg} 68%, ${palette.cardBg} 100%); padding:0 2px;`
          )
        })

        section.querySelectorAll('.wx-feature').forEach((feature) => {
          feature.setAttribute('style', 'margin-top:22px; display:grid; grid-template-columns:1fr auto; gap:14px; align-items:end;')
          const kicker = feature.querySelector('.wx-feature-kicker')
          if (kicker) {
            kicker.setAttribute(
              'style',
              `display:block; font-family:'Noto Serif SC','Songti SC',serif; font-size:12px; line-height:1.4; font-weight:700; color:${palette.h3}; letter-spacing:0.04em;`
            )
          }
          const featureTitle = feature.querySelector('.wx-feature-title')
          if (featureTitle) {
            featureTitle.setAttribute(
              'style',
              `display:block; margin-top:4px; font-family:'Noto Serif SC','Songti SC',serif; font-size:22px; line-height:1.2; font-weight:900; color:${palette.accent};`
            )
          }
          const mark = feature.querySelector('.wx-feature-mark')
          if (mark) {
            mark.setAttribute(
              'style',
              `width:26px; height:26px; border-radius:8px; background:linear-gradient(135deg, ${palette.accent}, ${palette.cardBg}); transform:rotate(12deg); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.5);`
            )
          }
        })

        section.querySelectorAll('.wx-callout').forEach((card) => {
          card.setAttribute(
            'style',
            `margin-top:24px; padding:18px 18px 16px; border-radius:20px; background:${palette.cardBg};`
          )
          card.querySelectorAll('.wx-callout-item').forEach((item, itemIndex) => {
            item.setAttribute(
              'style',
              itemIndex === 0
                ? `margin-top:${itemIndex === 0 ? 0 : 10}px; font-family:'Noto Serif SC','Songti SC',serif; font-size:18px; line-height:1.45; font-weight:900; color:${palette.h3};`
                : `margin-top:10px; font-family:'Noto Serif SC','Songti SC',serif; font-size:14px; line-height:1.8; font-weight:600; color:${palette.h3};`
            )
          })
        })

        section.querySelectorAll('.wx-note').forEach((note) => {
          note.setAttribute(
            'style',
            'margin-top:22px; padding:18px 18px 16px; border-radius:20px; background:rgba(255,255,255,0.78); border:1px solid rgba(255,255,255,0.74); box-shadow:inset 0 1px 0 rgba(255,255,255,0.65);'
          )
          note.querySelectorAll('.wx-note-line').forEach((line, lineIndex) => {
            line.setAttribute(
              'style',
              `margin-top:${lineIndex === 0 ? 0 : 8}px; font-family:'Noto Serif SC','Songti SC',serif; font-size:14px; line-height:1.8; color:#505050;`
            )
          })
        })

        section.querySelectorAll('.wx-media-grid').forEach((grid) => {
          const count = grid.querySelectorAll('.wx-media-card').length
          grid.setAttribute(
            'style',
            `margin-top:24px; display:grid; gap:12px; grid-template-columns:${count === 2 ? '1.15fr 0.85fr' : 'repeat(3, minmax(0, 1fr))'};`
          )
          grid.querySelectorAll('.wx-media-card').forEach((card) => {
            card.setAttribute('style', 'display:flex; flex-direction:column; gap:8px;')
          })
          grid.querySelectorAll('.wx-media-frame').forEach((frame) => {
            frame.setAttribute(
              'style',
              `position:relative; overflow:hidden; min-height:${count === 3 ? 170 : 194}px; border-radius:18px; background:rgba(255,255,255,0.8); box-shadow:inset 0 0 0 1px rgba(255,255,255,0.55);`
            )
          })
          grid.querySelectorAll('.wx-img').forEach((image) => {
            image.setAttribute('style', 'width:100%; height:100%; object-fit:cover; display:block;')
          })
          grid.querySelectorAll('.wx-media-caption').forEach((caption) => {
            caption.setAttribute(
              'style',
              `font-family:'DM Sans',-apple-system,'PingFang SC','Helvetica Neue',sans-serif; font-size:11px; line-height:1.45; font-weight:700; color:${palette.accent}; text-align:center; letter-spacing:0.04em;`
            )
          })
        })
      })

      return clone
    },
  }
}
