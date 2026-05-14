const SANS = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
const SERIF = "'Songti SC','STSong','SimSun','Times New Roman',serif"
const TEXT = '#252525'
const MUTED = '#78716c'
const LINE = '#e7e2dc'
const CARD = '#f7f6f3'
const ACCENT = '#2f3437'

export const notionBoard = {
  id: 'tpl-notion-board',
  name: 'Notion · 文档板',
  className: 'tpl-notion-board',
  pageStart: 1,
  cssText: `
    .tpl-notion-board{background:#f7f6f3;padding:28px 20px 46px}
    .tpl-notion-board .wx-post{width:min(100%,430px);margin:0 auto;background:#fff;padding:28px 26px;border:1px solid ${LINE}}
    .tpl-notion-board .wx-section{margin:28px 0 0;padding:0;background:none}
    .tpl-notion-board .wx-section:first-child{margin-top:0}
    .tpl-notion-board .wx-page{display:inline-block;margin-bottom:10px;font:${'12px/1.4'} ${SANS};color:${MUTED}}
    .tpl-notion-board .wx-h2{margin:0 0 12px;font:${'700 23px/1.35'} ${SANS};color:${TEXT};letter-spacing:0}
    .tpl-notion-board .wx-h3{margin:18px 0 8px;font:${'700 16px/1.55'} ${SANS};color:${TEXT}}
    .tpl-notion-board .wx-p{margin:0;font:${'400 16px/1.82'} ${SERIF};color:${TEXT}}
    .tpl-notion-board .wx-p+.wx-p{margin-top:13px}
    .tpl-notion-board .wx-strong{font-weight:700;background:#fff2cc;color:${TEXT}}
    .tpl-notion-board .wx-callout,.tpl-notion-board .wx-note,.tpl-notion-board .wx-highlight,.tpl-notion-board .wx-data-card,.tpl-notion-board .wx-summary-card,.tpl-notion-board .wx-scheme-card{margin:16px 0 0;padding:13px 14px;background:${CARD};border:1px solid ${LINE};border-radius:6px}
    .tpl-notion-board .wx-compare-card{margin:16px 0 0;display:grid;gap:10px}
    .tpl-notion-board .wx-compare-col{padding:13px;background:${CARD};border:1px solid ${LINE};border-radius:6px}
    .tpl-notion-board .wx-timeline{margin:12px 0 0;padding:10px 12px;background:#fff;border-left:3px solid ${LINE}}
    .tpl-notion-board .wx-timeline-dot{display:none}
    .tpl-notion-board .wx-media-grid,.tpl-notion-board .wx-illustration-card{margin:16px 0 0;text-align:left}
    .tpl-notion-board .wx-img{width:100%;height:auto;display:block;border-radius:4px}
    .tpl-notion-board .wx-illustration-img{width:36%;max-width:132px;height:auto;display:block;margin:0 0 8px}
    .tpl-notion-board .wx-data-label,.tpl-notion-board .wx-data-note,.tpl-notion-board .wx-compare-label,.tpl-notion-board .wx-compare-desc,.tpl-notion-board .wx-timeline-desc,.tpl-notion-board .wx-media-caption,.tpl-notion-board .wx-illustration-caption{display:block;font:${'12px/1.6'} ${SANS};color:${MUTED}}
    .tpl-notion-board .wx-data-value,.tpl-notion-board .wx-compare-title,.tpl-notion-board .wx-timeline-title,.tpl-notion-board .wx-summary-title{display:block;font:${'700 16px/1.55'} ${SANS};color:${ACCENT}}
    .tpl-notion-board .wx-summary-item{display:block;margin-top:8px;font:${'14px/1.75'} ${SERIF};color:${TEXT}}
    .tpl-notion-board .wx-summary-item b{margin-right:8px;color:${MUTED}}
  `,
  copyRichText(clone) {
    set(clone, `width:100%; max-width:100%; margin:0 auto; padding:28px 26px; background:#fff; color:${TEXT}; font-family:${SERIF}; border:1px solid ${LINE}; box-sizing:border-box;`)
    clone.querySelectorAll('.wx-section').forEach((el, i) => set(el, `margin:${i ? '28px 0 0' : '0'}; padding:0; background:none;`))
    clone.querySelectorAll('.wx-page').forEach(el => set(el, `display:inline-block; margin:0 0 10px; font-family:${SANS}; font-size:12px; line-height:1.4; color:${MUTED};`))
    clone.querySelectorAll('.wx-h2').forEach(el => set(el, `margin:0 0 12px; font-family:${SANS}; font-size:23px; line-height:1.35; font-weight:700; color:${TEXT};`))
    clone.querySelectorAll('.wx-h3,.wx-data-value,.wx-compare-title,.wx-timeline-title,.wx-summary-title').forEach(el => set(el, `display:block; margin:0; font-family:${SANS}; font-size:16px; line-height:1.55; font-weight:700; color:${ACCENT};`))
    clone.querySelectorAll('.wx-p').forEach((el, i) => set(el, `margin:${i ? '13px 0 0' : '0'}; font-family:${SERIF}; font-size:16px; line-height:1.82; color:${TEXT};`))
    clone.querySelectorAll('.wx-callout,.wx-note,.wx-highlight,.wx-data-card,.wx-summary-card,.wx-scheme-card').forEach(el => set(el, `margin:16px 0 0; padding:13px 14px; background:${CARD}; border:1px solid ${LINE}; border-radius:6px; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-compare-card').forEach(el => set(el, 'display:block; margin:16px 0 0;'))
    clone.querySelectorAll('.wx-compare-col').forEach(el => set(el, `display:block; margin:8px 0 0; padding:13px; background:${CARD}; border:1px solid ${LINE}; border-radius:6px; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-timeline').forEach(el => set(el, `margin:12px 0 0; padding:10px 12px; background:#fff; border-left:3px solid ${LINE};`))
    clone.querySelectorAll('.wx-timeline-dot,.wx-highlight-icon').forEach(el => set(el, 'display:none;'))
    clone.querySelectorAll('.wx-media-grid,.wx-illustration-card').forEach(el => set(el, 'margin:16px 0 0; text-align:left;'))
    clone.querySelectorAll('.wx-img,.wx-illustration-img').forEach(el => set(el, 'max-width:100%; height:auto; display:block; margin:0; border-radius:4px;'))
    clone.querySelectorAll('.wx-data-label,.wx-data-note,.wx-compare-label,.wx-compare-desc,.wx-timeline-desc,.wx-media-caption,.wx-illustration-caption').forEach(el => set(el, `display:block; margin:4px 0 0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${MUTED};`))
    clone.querySelectorAll('.wx-summary-item').forEach(el => set(el, `display:block; margin:8px 0 0; font-family:${SERIF}; font-size:14px; line-height:1.75; color:${TEXT};`))
    return clone
  },
}

function set(el, style) { el.setAttribute('style', style) }
