const SANS = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
const SERIF = "'Songti SC','STSong','SimSun','Times New Roman',serif"
const TEXT = '#222222'
const SOFT = '#f4f1ec'
const CARD = '#fffaf3'
const ACCENT = '#9a5b32'
const MUTED = '#7a7068'

export const cleanBrief = {
  id: 'tpl-clean-brief',
  name: '简洁 · 简报',
  className: 'tpl-clean-brief',
  pageStart: 1,
  cssText: `
    .tpl-clean-brief{background:${SOFT};padding:28px 20px 44px}
    .tpl-clean-brief .wx-post{width:min(100%,430px);margin:0 auto;background:#fff;padding:18px 18px 28px}
    .tpl-clean-brief .wx-section{margin:0 0 18px;padding:18px;background:#fff;border:1px solid #ece3d9}
    .tpl-clean-brief .wx-page{display:inline-block;margin-bottom:12px;font:${'700 11px/1'} ${SANS};color:${ACCENT};letter-spacing:.18em}
    .tpl-clean-brief .wx-h2{margin:0 0 12px;font:${'700 20px/1.42'} ${SERIF};color:${TEXT}}
    .tpl-clean-brief .wx-h3{margin:16px 0 8px;font:${'700 15px/1.6'} ${SANS};color:${ACCENT}}
    .tpl-clean-brief .wx-p{margin:0;font:${'400 16px/1.82'} ${SERIF};color:${TEXT}}
    .tpl-clean-brief .wx-p+.wx-p{margin-top:13px}
    .tpl-clean-brief .wx-strong{color:${ACCENT};font-weight:700}
    .tpl-clean-brief .wx-callout,.tpl-clean-brief .wx-note,.tpl-clean-brief .wx-highlight,.tpl-clean-brief .wx-data-card,.tpl-clean-brief .wx-summary-card{margin:16px 0 0;padding:13px;background:${CARD};border:1px solid #ead9c9}
    .tpl-clean-brief .wx-compare-card{margin:16px 0 0}
    .tpl-clean-brief .wx-compare-col{padding:12px;margin-top:8px;background:${CARD};border:1px solid #ead9c9}
    .tpl-clean-brief .wx-timeline{margin:14px 0 0;padding:12px;background:#fafafa;border-left:3px solid ${ACCENT}}
    .tpl-clean-brief .wx-timeline-dot{display:none}
    .tpl-clean-brief .wx-media-grid,.tpl-clean-brief .wx-illustration-card{margin:16px 0 0;text-align:left}
    .tpl-clean-brief .wx-img{width:100%;height:auto;display:block}
    .tpl-clean-brief .wx-illustration-img{display:block;width:38%;max-width:140px;height:auto;margin:0 0 8px}
    .tpl-clean-brief .wx-data-label,.tpl-clean-brief .wx-data-note,.tpl-clean-brief .wx-compare-label,.tpl-clean-brief .wx-compare-desc,.tpl-clean-brief .wx-timeline-desc,.tpl-clean-brief .wx-media-caption,.tpl-clean-brief .wx-illustration-caption{display:block;font:${'12px/1.6'} ${SANS};color:${MUTED}}
    .tpl-clean-brief .wx-data-value,.tpl-clean-brief .wx-compare-title,.tpl-clean-brief .wx-timeline-title,.tpl-clean-brief .wx-summary-title{display:block;font:${'700 16px/1.55'} ${SANS};color:${ACCENT}}
    .tpl-clean-brief .wx-summary-item{display:block;margin-top:7px;font:${'14px/1.75'} ${SERIF};color:${TEXT}}
    .tpl-clean-brief .wx-summary-item b{margin-right:8px;color:${ACCENT}}
  `,
  copyRichText(clone) {
    set(clone, `width:100%; max-width:100%; margin:0 auto; padding:18px; background:#fff; color:${TEXT}; font-family:${SERIF}; box-sizing:border-box;`)
    clone.querySelectorAll('.wx-section').forEach(el => set(el, 'margin:0 0 18px; padding:18px; background:#fff; border:1px solid #ece3d9; box-sizing:border-box;'))
    clone.querySelectorAll('.wx-page').forEach(el => set(el, `display:inline-block; margin:0 0 12px; font-family:${SANS}; font-size:11px; line-height:1; font-weight:700; color:${ACCENT}; letter-spacing:0.18em;`))
    clone.querySelectorAll('.wx-h2').forEach(el => set(el, `margin:0 0 12px; font-family:${SERIF}; font-size:20px; line-height:1.42; font-weight:700; color:${TEXT};`))
    clone.querySelectorAll('.wx-h3,.wx-data-value,.wx-compare-title,.wx-timeline-title,.wx-summary-title').forEach(el => set(el, `display:block; margin:0; font-family:${SANS}; font-size:15px; line-height:1.6; font-weight:700; color:${ACCENT};`))
    clone.querySelectorAll('.wx-p').forEach((el, i) => set(el, `margin:${i ? '13px 0 0' : '0'}; font-family:${SERIF}; font-size:16px; line-height:1.82; color:${TEXT};`))
    clone.querySelectorAll('.wx-callout,.wx-note,.wx-highlight,.wx-data-card,.wx-summary-card,.wx-scheme-card').forEach(el => set(el, `margin:16px 0 0; padding:13px; background:${CARD}; border:1px solid #ead9c9; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-compare-card').forEach(el => set(el, 'display:block; margin:16px 0 0;'))
    clone.querySelectorAll('.wx-compare-col').forEach(el => set(el, `display:block; margin:8px 0 0; padding:12px; background:${CARD}; border:1px solid #ead9c9; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-timeline').forEach(el => set(el, `margin:14px 0 0; padding:12px; background:#fafafa; border-left:3px solid ${ACCENT};`))
    clone.querySelectorAll('.wx-timeline-dot,.wx-highlight-icon').forEach(el => set(el, 'display:none;'))
    clone.querySelectorAll('.wx-media-grid,.wx-illustration-card').forEach(el => set(el, 'margin:16px 0 0; text-align:left;'))
    clone.querySelectorAll('.wx-img,.wx-illustration-img').forEach(el => set(el, 'max-width:100%; height:auto; display:block; margin:0;'))
    clone.querySelectorAll('.wx-data-label,.wx-data-note,.wx-compare-label,.wx-compare-desc,.wx-timeline-desc,.wx-media-caption,.wx-illustration-caption').forEach(el => set(el, `display:block; margin:4px 0 0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${MUTED};`))
    clone.querySelectorAll('.wx-summary-item').forEach(el => set(el, `display:block; margin:7px 0 0; font-family:${SERIF}; font-size:14px; line-height:1.75; color:${TEXT};`))
    return clone
  },
}

function set(el, style) { el.setAttribute('style', style) }
