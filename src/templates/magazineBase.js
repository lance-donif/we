import sharedCssText from './magazineShared.css?raw'

function blendColor(color, whiteRatio) {
  if (!color) return color
  if (color.startsWith('rgba')) {
    const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/)
    if (match) {
      const f = 1 - whiteRatio
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${+(parseFloat(match[4]) * f).toFixed(3)})`
    }
    return color
  }
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  const f = 1 - whiteRatio
  const rr = Math.round(r * f + 255 * whiteRatio)
  const gg = Math.round(g * f + 255 * whiteRatio)
  const bb = Math.round(b * f + 255 * whiteRatio)
  return '#' + [rr, gg, bb].map(v => Math.min(255, Math.max(0, v)).toString(16).padStart(2, '0')).join('')
}

/* copyStyles 默认值 — 所有旧模板自动继承，新模板可通过 copyStyles 覆盖 */
const defaultCopyStyles = {
  sectionPad: '40px 24px 24px',
  titleBlockPad: '24px 24px 16px',
  pageMargin: '20px',
  h2Size: '22px',
  h2Margin: '10px',
  h3Size: '18px',
  h3Margin: '16px',
  h3MoodMargin: '4px',
  pSize: '16px',
  pSpacing: '18px',
  componentSpacing: '20px',
  hrMargin: '40px',
  olItemGap: '16px',
  olNumRadius: '12px',
  postPH3Spacing: '22px',
}

export function createMagazineTemplate(template) {
  const cs = { ...defaultCopyStyles, ...template.copyStyles }

  return {
    ...template,
    cssText: `${sharedCssText}\n${template.cssText}`,
    copyRichText(clone) {
      const isBalkan = template.id === 'tpl-magazine-balkan'
      const serifStack = "'Songti SC','STSong','SimSun','Times New Roman',serif"
      const sansStack = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
      const rootBg = template.sectionPalette[0]?.bg || 'rgba(0,0,0,0.03)'

      clone.setAttribute(
        'style',
        [
          'width:100%',
          'max-width:100%',
          'margin:0 auto',
          `background-color:${rootBg}`,
          'color:#343a40',
          'border-radius:32px',
          'overflow:hidden',
          `font-family:${serifStack}`,
          'box-sizing:border-box',
        ].join('; ')
      )

      const sections = Array.from(clone.querySelectorAll('.wx-section'))

      clone.querySelectorAll('.wx-title-block').forEach(block => {
        block.setAttribute('style', `padding:${cs.titleBlockPad}; background:none; text-align:left; box-sizing:border-box;`)
      })
      clone.querySelectorAll('.wx-title').forEach(title => {
        title.setAttribute('style', `display:block; font-family:${sansStack}; font-size:13px; line-height:1.5; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#8a847b; margin-bottom:8px;`)
      })
      clone.querySelectorAll('.wx-main-title').forEach(title => {
        title.setAttribute('style', `margin:0; padding:0; display:block; font-family:${serifStack}; font-size:28px; line-height:1.35; font-weight:700; color:#343a40; letter-spacing:-0.01em;`)
      })

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
          `background-color:${palette.bg}; margin:0; padding:${cs.sectionPad}; position:relative; box-sizing:border-box; ${topRadius} ${bottomRadius}`
        )

        const page = section.querySelector('.wx-page')
        if (page) {
          page.setAttribute(
            'style',
            `display:block; margin-bottom:${cs.pageMargin}; text-align:right; font-family:${serifStack}; font-size:28px; line-height:1; font-weight:700; color:${palette.number};`
          )
        }

        const h2 = section.querySelector('.wx-h2')
        if (h2) {
          h2.setAttribute(
            'style',
            `font-family:${serifStack}; font-size:${cs.h2Size}; line-height:1.4; font-weight:700; color:${palette.accent}; margin:0 0 ${cs.h2Margin};`
          )
        }

        section.querySelectorAll('.wx-h3').forEach((h3) => {
          h3.setAttribute(
            'style',
            h3.classList.contains('wx-h3-mood')
              ? `margin:0 0 ${cs.h3MoodMargin}; padding:0; display:block; font-family:${sansStack}; font-size:12px; line-height:1.5; font-weight:700; letter-spacing:0.08em; opacity:0.72; color:${palette.accent};`
              : `margin:0 0 ${cs.h3Margin}; padding:0; display:block; font-family:${serifStack}; font-size:${cs.h3Size}; line-height:1.45; font-weight:700; color:${palette.h3};`
          )
        })

        section.querySelectorAll('.wx-p').forEach((paragraph, paragraphIndex) => {
          paragraph.setAttribute(
            'style',
            `margin:${paragraphIndex === 0 ? '0' : cs.pSpacing + ' 0 0'}; padding:0; display:block; font-family:${serifStack}; font-size:${cs.pSize}; line-height:1.82; font-weight:400; letter-spacing:0.01em; color:#343a40; text-align:left;`
          )
        })

        section.querySelectorAll('.wx-em').forEach((em) => {
          em.setAttribute('style', `font-family:${serifStack}; font-style:italic; font-weight:500; color:#5d6d7e;`)
        })

        section.querySelectorAll('.wx-code').forEach((code) => {
          code.setAttribute('style', `font-family:inherit; font-size:13px; padding:2px 6px; background-color:rgba(0, 0, 0, 0.04); color:${palette.accent}; border-radius:4px; margin:0 2px; border-bottom:1px solid rgba(0, 0, 0, 0.08);`)
        })

        section.querySelectorAll('.wx-link').forEach((link) => {
          link.setAttribute('style', `color:${palette.accent}; text-decoration:none; border-bottom:1px dashed ${palette.accent};`)
        })

        section.querySelectorAll('.wx-strong').forEach((strong) => {
          strong.setAttribute(
            'style',
            `font-weight:700; color:${palette.accent}; background-color:${cardSurface}; border-bottom:2px solid ${palette.accent}; padding:0 2px;`
          )
        })

        section.querySelectorAll('.wx-feature').forEach((feature) => {
          feature.setAttribute('style', `margin:${cs.componentSpacing} 0 0; padding:0 36px 0 0; display:block; position:relative; box-sizing:border-box;`)
          const featureCopy = feature.querySelector('.wx-feature-copy')
          if (featureCopy) {
            featureCopy.setAttribute('style', 'display:block; min-width:0;')
          }
          const kicker = feature.querySelector('.wx-feature-kicker')
          if (kicker) {
            kicker.setAttribute(
              'style',
              `display:block; margin:0; padding:0; font-family:${serifStack}; font-size:12px; line-height:1.5; font-weight:700; color:${palette.h3}; letter-spacing:0.08em;`
            )
          }
          const featureTitle = feature.querySelector('.wx-feature-title')
          if (featureTitle) {
            featureTitle.setAttribute(
              'style',
              `display:block; margin:3px 0 0; padding:0; font-family:${serifStack}; font-size:${cs.h3Size}; line-height:1.45; font-weight:700; color:${palette.accent};`
            )
          }
          const mark = feature.querySelector('.wx-feature-mark')
          if (mark) {
            mark.setAttribute(
              'style',
              `position:absolute; top:0; right:0; width:24px; height:24px; display:block; border-radius:7px; background-color:${iconSurface}; border:1px solid ${subtleBorder}; box-sizing:border-box;`
            )
          }
        })

        section.querySelectorAll('.wx-callout').forEach((card) => {
          card.setAttribute(
            'style',
            `margin:${cs.componentSpacing} 0 0; padding:16px 14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder}; box-sizing:border-box;`
          )
          card.querySelectorAll('.wx-callout-item').forEach((item, itemIndex) => {
            item.setAttribute(
              'style',
              itemIndex === 0
                ? `margin:0; padding:0; display:block; font-family:${serifStack}; font-size:14px; line-height:1.78; font-weight:700; color:${palette.h3};`
                : `margin:6px 0 0; padding:0; display:block; font-family:${serifStack}; font-size:14px; line-height:1.78; font-weight:500; color:${palette.h3};`
            )
          })
        })

        section.querySelectorAll('.wx-ordered-list').forEach((list) => {
          list.setAttribute('style', `margin-top:${cs.componentSpacing}; display:block; padding:0; list-style:none;`)
          /* 使用 <table> 元素替代 flex/float —— 微信编辑器只可靠支持 table 布局 */
          const items = Array.from(list.querySelectorAll('.wx-ol-item'))
          items.forEach((item) => {
            const num = item.querySelector('.wx-ol-number')
            const content = item.querySelector('.wx-ol-content')

            const table = document.createElement('table')
            table.setAttribute('style', `width:100%; table-layout:fixed; border-collapse:collapse; border:none; margin-bottom:${cs.olItemGap}; border-spacing:0;`)
            table.setAttribute('border', '0')
            table.setAttribute('cellpadding', '0')
            table.setAttribute('cellspacing', '0')

            const tr = document.createElement('tr')
            tr.setAttribute('style', 'border:none;')
            const tdNum = document.createElement('td')
            tdNum.setAttribute('width', '38')
            tdNum.setAttribute('style', 'width:38px; vertical-align:top; padding:2px 14px 0 0; border:none;')
            const tdContent = document.createElement('td')
            tdContent.setAttribute('style', 'vertical-align:top; padding:0; border:none;')

            if (num) {
              num.setAttribute('style', `display:inline-block; width:24px; height:24px; line-height:24px; text-align:center; background-color:${palette.accent}; color:#fff; font-family:${sansStack}; font-size:12px; font-weight:700; border-radius:${cs.olNumRadius};`)
              tdNum.appendChild(num)
            }
            if (content) {
              content.setAttribute('style', `font-family:${serifStack}; font-size:15px; line-height:1.7; color:#4d473f; padding-top:2px;`)
              tdContent.appendChild(content)
            }

            tr.appendChild(tdNum)
            tr.appendChild(tdContent)
            table.appendChild(tr)
            list.replaceChild(table, item)
          })
        })

        section.querySelectorAll('.wx-hr').forEach((hr) => {
          hr.setAttribute('style', `border:none; height:1px; margin:${cs.hrMargin} auto; width:80%; background-color:#e0e0e0; display:block;`)
        })

        section.querySelectorAll('.wx-note').forEach((note) => {
          note.setAttribute(
            'style',
            `margin:${cs.componentSpacing} 0 0; padding:16px 14px; border-radius:18px; background-color:${noteSurface}; border:1px solid ${frameBorder}; box-sizing:border-box;`
          )
          note.querySelectorAll('.wx-note-line').forEach((line, lineIndex) => {
            line.setAttribute(
              'style',
              `margin:${lineIndex === 0 ? '0' : '6px 0 0'}; padding:0; display:block; font-family:${serifStack}; font-size:12px; line-height:1.55; color:#58524a;`
            )
          })
        })

        section.querySelectorAll('.wx-highlight').forEach((highlight) => {
          highlight.setAttribute(
            'style',
            `margin:${cs.componentSpacing} 0 0; display:block; padding:14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder}; box-sizing:border-box;`
          )
          const icon = highlight.querySelector('.wx-highlight-icon')
          if (icon) {
            icon.setAttribute(
              'style',
              `width:18px; height:18px; margin:0 0 8px; display:block; border-radius:6px; background-color:${iconSurface}; border:1px solid ${subtleBorder}; box-sizing:border-box;`
            )
          }
          const text = highlight.querySelector('.wx-highlight-text')
          if (text) {
            text.setAttribute(
              'style',
              `margin:0; padding:0; display:block; font-family:${serifStack}; font-size:14px; line-height:1.78; font-weight:500; color:${palette.h3};`
            )
          }
        })

        section.querySelectorAll('.wx-scheme-card').forEach((card) => {
          card.setAttribute(
            'style',
            `margin:${cs.componentSpacing} 0 0; padding:16px 14px; border-radius:18px; background-color:${cardSurface}; border:1px solid ${subtleBorder}; box-sizing:border-box;`
          )
          const label = card.querySelector('.wx-scheme-label')
          if (label) {
            label.setAttribute(
              'style',
              `display:inline-block; margin:0; padding:4px 10px; border-radius:999px; font-family:${sansStack}; font-size:12px; line-height:1.5; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${palette.accent}; background:${labelSurface};`
            )
          }
          const content = card.querySelector('.wx-scheme-content')
          if (content) {
            content.setAttribute('style', 'margin-top:10px; display:block;')
          }
          const media = card.querySelector('.wx-scheme-media')
          if (media) {
            media.setAttribute(
              'style',
              `margin:0 0 10px; overflow:hidden; border-radius:16px; background-color:${frameSurface}; border:1px solid ${frameBorder}; box-sizing:border-box;`
            )
          }
          const imageWrap = card.querySelector('.wx-scheme-image-wrap')
          if (imageWrap) {
            imageWrap.setAttribute('style', 'width:100%; overflow:hidden;')
          }
          const image = card.querySelector('.wx-scheme-image')
          if (image) {
            image.setAttribute('style', 'width:100%; height:auto; display:block; border-radius:16px;')
          }
          const title = card.querySelector('.wx-scheme-title')
          if (title) {
            title.setAttribute(
              'style',
              `margin:0; padding:0; display:block; font-family:${serifStack}; font-size:${cs.h3Size}; line-height:1.45; font-weight:700; color:${palette.accent};`
            )
          }
          const meta = card.querySelector('.wx-scheme-meta')
          if (meta) {
            meta.setAttribute(
              'style',
              `margin:4px 0 0; padding:0; display:block; font-family:${sansStack}; font-size:12px; line-height:1.55; font-weight:700; color:${palette.h3}; letter-spacing:0.04em;`
            )
          }
          const desc = card.querySelector('.wx-scheme-desc')
          if (desc) {
            desc.setAttribute(
              'style',
              `margin:8px 0 0; padding:0; display:block; font-family:${serifStack}; font-size:14px; line-height:1.78; color:#4d473f;`
            )
          }
        })

        section.querySelectorAll('.wx-media-grid').forEach((grid) => {
          const count = grid.querySelectorAll('.wx-media-card').length
          grid.setAttribute(
            'style',
            `margin:${cs.componentSpacing} 0 0; padding:0; display:block; font-size:0; line-height:0;`
          )
          grid.querySelectorAll('.wx-media-card').forEach((card, ci) => {
            if (count === 1) {
              card.setAttribute('style', 'display:block; width:100%; margin:0; vertical-align:top;')
            } else if (count === 2) {
              card.setAttribute('style', ci === 0
                ? 'display:inline-block; width:57%; margin:0 2% 0 0; vertical-align:top;'
                : 'display:inline-block; width:41%; margin:0; vertical-align:top;')
            } else {
              card.setAttribute('style', `display:inline-block; width:32%; margin:0 ${ci < count - 1 ? '2%' : '0'} 0 0; vertical-align:top;`)
            }
          })
          grid.querySelectorAll('.wx-media-frame').forEach((frame) => {
            frame.setAttribute(
              'style',
              `display:block; overflow:hidden; border-radius:18px; background-color:${frameSurface}; border:1px solid ${frameBorder}; box-sizing:border-box;`
            )
          })
          grid.querySelectorAll('.wx-img').forEach((image) => {
            image.setAttribute('style', 'width:100%; height:auto; display:block; border-radius:18px;')
          })
          grid.querySelectorAll('.wx-media-caption').forEach((caption) => {
            caption.setAttribute(
              'style',
              `margin:8px 0 0; padding:0; display:block; font-family:${sansStack}; font-size:12px; line-height:1.55; font-weight:700; color:${palette.accent}; text-align:center; letter-spacing:0.04em;`
            )
          })
        })

        section.querySelectorAll('.wx-feature + .wx-p, .wx-callout + .wx-p, .wx-note + .wx-p, .wx-highlight + .wx-p, .wx-scheme-card + .wx-p, .wx-media-grid + .wx-p').forEach((paragraph) => {
          paragraph.setAttribute(
            'style',
            `margin:${cs.componentSpacing} 0 0; padding:0; display:block; font-family:${serifStack}; font-size:${cs.pSize}; line-height:1.82; font-weight:400; letter-spacing:0.01em; color:#343a40; text-align:left;`
          )
        })

        section.querySelectorAll('.wx-feature + .wx-h3, .wx-callout + .wx-h3, .wx-note + .wx-h3, .wx-highlight + .wx-h3, .wx-scheme-card + .wx-h3, .wx-media-grid + .wx-h3').forEach((h3) => {
          h3.setAttribute(
            'style',
            h3.classList.contains('wx-h3-mood')
              ? `margin:${cs.componentSpacing} 0 ${cs.h3MoodMargin}; padding:0; display:block; font-family:${sansStack}; font-size:12px; line-height:1.5; font-weight:700; letter-spacing:0.08em; opacity:0.72; color:${palette.accent};`
              : `margin:${cs.componentSpacing} 0 ${cs.h3Margin}; padding:0; display:block; font-family:${serifStack}; font-size:${cs.h3Size}; line-height:1.45; font-weight:700; color:${palette.h3};`
          )
        })

        section.querySelectorAll('.wx-p + .wx-h3').forEach((h3) => {
          h3.setAttribute(
            'style',
            h3.classList.contains('wx-h3-mood')
              ? `margin:${cs.postPH3Spacing} 0 ${cs.h3MoodMargin}; padding:0; display:block; font-family:${sansStack}; font-size:12px; line-height:1.5; font-weight:700; letter-spacing:0.08em; opacity:0.72; color:${palette.accent};`
              : `margin:${cs.postPH3Spacing} 0 ${cs.h3Margin}; padding:0; display:block; font-family:${serifStack}; font-size:${cs.h3Size}; line-height:1.45; font-weight:700; color:${palette.h3};`
          )
        })
      })

      /* 模板后处理钩子 — 允许模板覆盖基础内联样式 */
      if (template.copyPostProcess) {
        template.copyPostProcess(clone)
      }

      return clone
    },
  }
}
