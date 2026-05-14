const SANS = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
const TEXT = '#263238'
const MUTED = '#607d6d'
const GREEN = '#58a700'
const LIME = '#e5f7d2'
const BLUE = '#1cb0f6'
const CARD = '#ffffff'
const BORDER = '#d7edc5'

export const duoLesson = {
  id: 'tpl-duo-lesson',
  name: 'Duo · 课程卡',
  className: 'tpl-duo-lesson',
  pageStart: 1,
  cssText: `
    .tpl-duo-lesson{background:#f2fbeb;padding:28px 20px 46px}
    .tpl-duo-lesson .wx-post{width:min(100%,430px);margin:0 auto;background:#fbfff7;padding:22px;border:1px solid ${BORDER};border-radius:12px}
    .tpl-duo-lesson .wx-section{margin:18px 0 0;padding:18px;background:${CARD};border:2px solid ${BORDER};border-radius:12px}
    .tpl-duo-lesson .wx-section:first-child{margin-top:0}
    .tpl-duo-lesson .wx-page{display:inline-block;margin-bottom:10px;padding:4px 9px;border-radius:999px;background:${LIME};font:${'700 11px/1'} ${SANS};color:${GREEN}}
    .tpl-duo-lesson .wx-h2{margin:0 0 12px;font:${'800 21px/1.38'} ${SANS};color:${TEXT}}
    .tpl-duo-lesson .wx-h3{margin:16px 0 8px;font:${'800 16px/1.5'} ${SANS};color:${GREEN}}
    .tpl-duo-lesson .wx-p{margin:0;font:${'500 15px/1.82'} ${SANS};color:${TEXT}}
    .tpl-duo-lesson .wx-p+.wx-p{margin-top:12px}
    .tpl-duo-lesson .wx-strong{color:${GREEN};font-weight:800}
    .tpl-duo-lesson .wx-callout,.tpl-duo-lesson .wx-note,.tpl-duo-lesson .wx-highlight,.tpl-duo-lesson .wx-data-card,.tpl-duo-lesson .wx-summary-card,.tpl-duo-lesson .wx-scheme-card{margin:16px 0 0;padding:14px;background:${LIME};border:2px solid ${BORDER};border-radius:12px}
    .tpl-duo-lesson .wx-compare-card{margin:16px 0 0;display:grid;gap:10px}
    .tpl-duo-lesson .wx-compare-col{padding:13px;background:#fff;border:2px solid ${BORDER};border-radius:12px}
    .tpl-duo-lesson .wx-timeline{margin:12px 0 0;padding:12px 14px;background:#fff;border:2px solid ${BORDER};border-radius:12px}
    .tpl-duo-lesson .wx-timeline-dot{display:inline-block;width:10px;height:10px;margin-right:7px;border-radius:10px;background:${BLUE}}
    .tpl-duo-lesson .wx-media-grid,.tpl-duo-lesson .wx-illustration-card{margin:16px 0 0;text-align:center}
    .tpl-duo-lesson .wx-img{width:100%;height:auto;display:block;border-radius:10px}
    .tpl-duo-lesson .wx-illustration-img{width:42%;max-width:150px;height:auto;display:block;margin:0 auto 8px;border-radius:10px}
    .tpl-duo-lesson .wx-data-label,.tpl-duo-lesson .wx-data-note,.tpl-duo-lesson .wx-compare-label,.tpl-duo-lesson .wx-compare-desc,.tpl-duo-lesson .wx-timeline-desc,.tpl-duo-lesson .wx-media-caption,.tpl-duo-lesson .wx-illustration-caption{display:block;font:${'700 12px/1.58'} ${SANS};color:${MUTED}}
    .tpl-duo-lesson .wx-data-value,.tpl-duo-lesson .wx-compare-title,.tpl-duo-lesson .wx-timeline-title,.tpl-duo-lesson .wx-summary-title{display:block;font:${'800 17px/1.5'} ${SANS};color:${GREEN}}
    .tpl-duo-lesson .wx-summary-item{display:block;margin-top:8px;font:${'600 14px/1.7'} ${SANS};color:${TEXT}}
    .tpl-duo-lesson .wx-summary-item b{display:inline-block;width:20px;height:20px;margin-right:8px;border-radius:20px;background:${GREEN};color:#fff;text-align:center;line-height:20px}
  `,
  copyRichText(clone) {
    set(clone, `width:100%; max-width:100%; margin:0 auto; padding:22px; background:#fbfff7; color:${TEXT}; font-family:${SANS}; border:1px solid ${BORDER}; box-sizing:border-box;`)
    clone.querySelectorAll('.wx-section').forEach((el, i) => set(el, `margin:${i ? '18px 0 0' : '0'}; padding:18px; background:#fff; border:2px solid ${BORDER}; border-radius:12px; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-page').forEach(el => set(el, `display:inline-block; margin:0 0 10px; padding:4px 9px; border-radius:999px; background:${LIME}; font-family:${SANS}; font-size:11px; line-height:1; font-weight:700; color:${GREEN};`))
    clone.querySelectorAll('.wx-h2').forEach(el => set(el, `margin:0 0 12px; font-family:${SANS}; font-size:21px; line-height:1.38; font-weight:800; color:${TEXT};`))
    clone.querySelectorAll('.wx-h3,.wx-data-value,.wx-compare-title,.wx-timeline-title,.wx-summary-title').forEach(el => set(el, `display:block; margin:0; font-family:${SANS}; font-size:16px; line-height:1.5; font-weight:800; color:${GREEN};`))
    clone.querySelectorAll('.wx-p').forEach((el, i) => set(el, `margin:${i ? '12px 0 0' : '0'}; font-family:${SANS}; font-size:15px; line-height:1.82; font-weight:500; color:${TEXT};`))
    clone.querySelectorAll('.wx-callout,.wx-note,.wx-highlight,.wx-data-card,.wx-summary-card,.wx-scheme-card').forEach(el => set(el, `margin:16px 0 0; padding:14px; background:${LIME}; border:2px solid ${BORDER}; border-radius:12px; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-compare-card').forEach(el => set(el, 'display:block; margin:16px 0 0;'))
    clone.querySelectorAll('.wx-compare-col').forEach(el => set(el, `display:block; margin:8px 0 0; padding:13px; background:#fff; border:2px solid ${BORDER}; border-radius:12px; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-timeline').forEach(el => set(el, `margin:12px 0 0; padding:12px 14px; background:#fff; border:2px solid ${BORDER}; border-radius:12px;`))
    clone.querySelectorAll('.wx-timeline-dot').forEach(el => set(el, `display:inline-block; width:10px; height:10px; margin-right:7px; border-radius:10px; background:${BLUE};`))
    clone.querySelectorAll('.wx-highlight-icon').forEach(el => set(el, 'display:none;'))
    clone.querySelectorAll('.wx-media-grid,.wx-illustration-card').forEach(el => set(el, 'margin:16px 0 0; text-align:center;'))
    clone.querySelectorAll('.wx-img,.wx-illustration-img').forEach(el => set(el, 'max-width:100%; height:auto; display:block; margin:0 auto; border-radius:10px;'))
    clone.querySelectorAll('.wx-data-label,.wx-data-note,.wx-compare-label,.wx-compare-desc,.wx-timeline-desc,.wx-media-caption,.wx-illustration-caption').forEach(el => set(el, `display:block; margin:4px 0 0; font-family:${SANS}; font-size:12px; line-height:1.58; font-weight:700; color:${MUTED};`))
    clone.querySelectorAll('.wx-summary-item').forEach(el => set(el, `display:block; margin:8px 0 0; font-family:${SANS}; font-size:14px; line-height:1.7; font-weight:600; color:${TEXT};`))
    return clone
  },
}

function set(el, style) { el.setAttribute('style', style) }
