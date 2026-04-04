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
      const serifStack = "'Songti SC','STSong','SimSun','Times New Roman',serif"
      const sansStack = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
      const rootBg = template.sectionPalette[0]?.bg || '#f5f5f5'

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
        const cardSurface = blendColor(palette.cardBg, 0.18)
        const noteSurface = blendColor(palette.bg, 0.72)
        const frameSurface = blendColor(palette.bg, 0.6)
        const subtleBorder = blendColor(palette.accent, 0.8)
        const frameBorder = blendColor(palette.accent, 0.84)
        const labelSurface = blendColor(palette.bg, 0.66)
        const iconSurface = blendColor(palette.accent, 0.18)
        const topRadius = index === 0 ? 'border-top-left-radius:32px; border-top-right-radius:32px;' : ''
        const bottomRadius = index === sections.length - 1 ? 'border-bottom-left-radius:32px; border-bottom-right-radius:32px;' : ''
        section.setAttribute(
          'style',
          `background-color:${palette.bg}; padding:40px 24px 24px; position:relative; ${topRadius} ${bottomRadius}`
        )

        const page = section.querySelector('.wx-page')
        if (page) {
          page.setAttribute(
            'style',
            `display:block; margin-bottom:20px; text-align:right; font-family:${serifStack}; font-size:28px; line-height:1; font-weight:700; color:${palette.number};`
          )
        }

        const h2 = section.querySelector('.wx-h2')
        if (h2) {
          h2.setAttribute(
            'style',
            `font-family:${serifStack}; font-size:22px; line-height:1.4; font-weight:700; color:${palette.accent}; margin:0 0 10px;`
          )
        }

        const h3 = section.querySelector('.wx-h3')
        if (h3) {
          h3.setAttribute(
            'style',
            h3.classList.contains('wx-h3-mood')
              ? `margin-top:0; margin-bottom:4px; font-family:${sansStack}; font-size:12px; line-height:1.5; font-weight:700; letter-spacing:0.08em; opacity:0.72; color:${palette.accent};`
              : `margin:0 0 16px; font-family:${serifStack}; font-size:18px; line-height:1.45; font-weight:700; color:${palette.h3};`
          )
        }

        section.querySelectorAll('.wx-p').forEach((paragraph, paragraphIndex) => {
          paragraph.setAttribute(
            'style',
            `margin-top:${paragraphIndex === 0 ? 0 : 12}px; font-family:${serifStack}; font-size:16px; line-height:1.75; font-weight:400; letter-spacing:0.01em; color:#0f0f0f; text-align:left;`
          )
        })

        section.querySelectorAll('.wx-strong').forEach((strong) => {
          strong.setAttribute(
            'style',
            `font-weight:700; color:${palette.accent}; background-color:${cardSurface}; border-bottom:2px solid ${palette.accent}; padding:0 2px;`
          )
        })

        section.querySelectorAll('.wx-feature').forEach((feature) => {
          feature.setAttribute('style', 'margin-top:24px; display:flex; justify-content:space-between; align-items:flex-end; gap:12px;')
          const featureCopy = feature.querySelector('.wx-feature-copy')
          if (featureCopy) {
            featureCopy.setAttribute('style', 'flex:1; min-width:0;')
          }
          const kicker = feature.querySelector('.wx-feature-kicker')
          if (kicker) {
            kicker.setAttribute(
              'style',
              `display:block; font-family:${serifStack}; font-size:12px; line-height:1.5; font-weight:700; color:${palette.h3}; letter-spacing:0.08em;`
            )
          }
          const featureTitle = feature.querySelector('.wx-feature-title')
          if (featureTitle) {
            featureTitle.setAttribute(
              'style',
              `display:block; margin-top:3px; font-family:${serifStack}; font-size:18px; line-height:1.45; font-weight:700; color:${palette.accent};`
            )
          }
          const mark = feature.querySelector('.wx-feature-mark')
          if (mark) {
            mark.setAttribute(
              'style',
              `width:24px; height:24px; border-radius:7px; flex-shrink:0; background-color:${iconSurface}; border:1px solid ${subtleBorder};`
            )
          }
        })

        section.querySelectorAll('.wx-callout').forEach((card) => {
          card.setAttribute(
            'style',
            isBalkan
              ? `margin-top:24px; padding:14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder};`
              : `margin-top:24px; padding:14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder};`
          )
          card.querySelectorAll('.wx-callout-item').forEach((item, itemIndex) => {
            item.setAttribute(
              'style',
              itemIndex === 0
                ? `margin-top:${itemIndex === 0 ? 0 : 6}px; font-family:${serifStack}; font-size:14px; line-height:1.7; font-weight:700; color:${palette.h3};`
                : `margin-top:6px; font-family:${serifStack}; font-size:14px; line-height:1.7; font-weight:500; color:${palette.h3};`
            )
          })
        })

        section.querySelectorAll('.wx-note').forEach((note) => {
          note.setAttribute(
            'style',
            isBalkan
              ? `margin-top:24px; padding:14px; border-radius:18px; background-color:${noteSurface}; border:1px solid ${frameBorder};`
              : `margin-top:24px; padding:14px; border-radius:18px; background-color:${noteSurface}; border:1px solid ${frameBorder};`
          )
          note.querySelectorAll('.wx-note-line').forEach((line, lineIndex) => {
            line.setAttribute(
              'style',
              `margin-top:${lineIndex === 0 ? 0 : 6}px; font-family:${serifStack}; font-size:12px; line-height:1.55; color:#58524a;`
            )
          })
        })

        section.querySelectorAll('.wx-highlight').forEach((highlight) => {
          highlight.setAttribute(
            'style',
            isBalkan
              ? `margin-top:24px; display:flex; gap:12px; align-items:flex-start; padding:14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder};`
              : `margin-top:24px; display:flex; gap:12px; align-items:flex-start; padding:14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder};`
          )
          const icon = highlight.querySelector('.wx-highlight-icon')
          if (icon) {
            icon.setAttribute(
              'style',
              `width:18px; height:18px; margin-top:2px; border-radius:6px; flex-shrink:0; background-color:${iconSurface}; border:1px solid ${subtleBorder};`
            )
          }
          const text = highlight.querySelector('.wx-highlight-text')
          if (text) {
            text.setAttribute(
              'style',
              `font-family:${serifStack}; font-size:14px; line-height:1.7; font-weight:500; color:${palette.h3};`
            )
          }
        })

        section.querySelectorAll('.wx-scheme-card').forEach((card) => {
          card.setAttribute(
            'style',
            isBalkan
              ? `margin-top:24px; padding:14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder};`
              : `margin-top:24px; padding:14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder};`
          )
          const label = card.querySelector('.wx-scheme-label')
          if (label) {
            label.setAttribute(
              'style',
              `display:inline-flex; align-items:center; padding:4px 10px; border-radius:999px; font-family:${sansStack}; font-size:12px; line-height:1.5; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${palette.accent}; background:${labelSurface};`
            )
          }
          const content = card.querySelector('.wx-scheme-content')
          if (content) {
            content.setAttribute('style', 'margin-top:10px; display:flex; flex-direction:column; gap:10px;')
          }
          const media = card.querySelector('.wx-scheme-media')
          if (media) {
            media.setAttribute(
              'style',
              isBalkan
                ? `overflow:hidden; border-radius:16px; background-color:${frameSurface}; border:1px solid ${frameBorder};`
                : `overflow:hidden; border-radius:16px; background-color:${frameSurface}; border:1px solid ${frameBorder};`
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
              `font-family:${serifStack}; font-size:18px; line-height:1.45; font-weight:700; color:${palette.accent}; margin:0;`
            )
          }
          const meta = card.querySelector('.wx-scheme-meta')
          if (meta) {
            meta.setAttribute(
              'style',
              `margin-top:4px; font-family:${sansStack}; font-size:12px; line-height:1.55; font-weight:700; color:${palette.h3}; letter-spacing:0.04em;`
            )
          }
          const desc = card.querySelector('.wx-scheme-desc')
          if (desc) {
            desc.setAttribute(
              'style',
              `margin-top:8px; font-family:${serifStack}; font-size:14px; line-height:1.7; color:#4d473f;`
            )
          }
        })

        section.querySelectorAll('.wx-media-grid').forEach((grid) => {
          const count = grid.querySelectorAll('.wx-media-card').length
          grid.setAttribute(
            'style',
            `margin-top:24px; display:flex; flex-wrap:wrap; gap:12px;`
          )
          grid.querySelectorAll('.wx-media-card').forEach((card, ci) => {
            if (count === 2) {
              card.setAttribute('style', ci === 0
                ? 'display:flex; flex-direction:column; gap:8px; flex:1.15 1 0; min-width:0;'
                : 'display:flex; flex-direction:column; gap:8px; flex:0.85 1 0; min-width:0;')
            } else {
              card.setAttribute('style', 'display:flex; flex-direction:column; gap:8px; flex:1 1 0; min-width:0;')
            }
          })
          grid.querySelectorAll('.wx-media-frame').forEach((frame) => {
            frame.setAttribute(
              'style',
              isBalkan
                ? `position:relative; overflow:hidden; min-height:${count === 3 ? 162 : 186}px; border-radius:18px; background-color:${frameSurface}; border:1px solid ${frameBorder};`
                : `position:relative; overflow:hidden; min-height:${count === 3 ? 162 : 186}px; border-radius:18px; background-color:${frameSurface}; border:1px solid ${frameBorder};`
            )
          })
          grid.querySelectorAll('.wx-img').forEach((image) => {
            image.setAttribute('style', 'width:100%; height:100%; object-fit:cover; display:block;')
          })
          grid.querySelectorAll('.wx-media-caption').forEach((caption) => {
            caption.setAttribute(
              'style',
              `font-family:${sansStack}; font-size:12px; line-height:1.55; font-weight:700; color:${palette.accent}; text-align:center; letter-spacing:0.04em;`
            )
          })
        })
      })

      return clone
    },
  }
}
