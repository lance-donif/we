const SANS = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
const SERIF = "'Songti SC','STSong','SimSun','Times New Roman',serif"
const TEXT = '#2d2a26'
const MUTED = '#83796f'
const ACCENT = '#b05d46'
const WASH = '#fff7f2'
const BORDER = '#efd8cc'

export const cleanWarm = {
  id: 'tpl-clean-warm',
  name: '简洁 · 暖页',
  className: 'tpl-clean-warm',
  pageStart: 1,
  cssText: `
    .tpl-clean-warm{background:#fffaf7;padding:30px 20px 46px}
    .tpl-clean-warm .wx-post{width:min(100%,430px);margin:0 auto;background:#fff;padding:28px 24px;border:1px solid ${BORDER}}
    .tpl-clean-warm .wx-section{padding:0;margin:28px 0 0;background:none}
    .tpl-clean-warm .wx-section:first-child{margin-top:0}
    .tpl-clean-warm .wx-page{display:none}
    .tpl-clean-warm .wx-h2{margin:0 0 14px;font:${'700 22px/1.38'} ${SERIF};color:${TEXT}}
    .tpl-clean-warm .wx-h2::after{content:"";display:block;width:36px;height:2px;margin-top:9px;background:${ACCENT}}
    .tpl-clean-warm .wx-h3{margin:20px 0 8px;font:${'700 16px/1.55'} ${SERIF};color:${ACCENT}}
    .tpl-clean-warm .wx-p{margin:0;font:${'400 16px/1.9'} ${SERIF};color:${TEXT}}
    .tpl-clean-warm .wx-p+.wx-p{margin-top:14px}
    .tpl-clean-warm .wx-strong{color:${ACCENT};font-weight:700}
    .tpl-clean-warm .wx-callout,.tpl-clean-warm .wx-note,.tpl-clean-warm .wx-highlight,.tpl-clean-warm .wx-data-card,.tpl-clean-warm .wx-summary-card{margin:18px 0 0;padding:15px 16px;background:${WASH};border:1px solid ${BORDER}}
    .tpl-clean-warm .wx-compare-card{margin:18px 0 0;display:grid;gap:10px}
    .tpl-clean-warm .wx-compare-col{padding:14px 16px;background:${WASH};border:1px solid ${BORDER}}
    .tpl-clean-warm .wx-timeline{margin:14px 0 0;padding:0 0 0 20px;position:relative}
    .tpl-clean-warm .wx-timeline-dot{position:absolute;left:0;top:7px;width:8px;height:8px;border-radius:8px;background:${ACCENT}}
    .tpl-clean-warm .wx-media-grid,.tpl-clean-warm .wx-illustration-card{margin:18px 0 0;text-align:center}
    .tpl-clean-warm .wx-img{width:100%;height:auto;display:block}
    .tpl-clean-warm .wx-illustration-img{display:block;width:44%;max-width:150px;height:auto;margin:0 auto 8px}
    .tpl-clean-warm .wx-data-label,.tpl-clean-warm .wx-data-note,.tpl-clean-warm .wx-compare-label,.tpl-clean-warm .wx-compare-desc,.tpl-clean-warm .wx-timeline-desc,.tpl-clean-warm .wx-media-caption,.tpl-clean-warm .wx-illustration-caption{display:block;font:${'12px/1.62'} ${SANS};color:${MUTED}}
    .tpl-clean-warm .wx-data-value,.tpl-clean-warm .wx-compare-title,.tpl-clean-warm .wx-timeline-title,.tpl-clean-warm .wx-summary-title{display:block;font:${'700 17px/1.55'} ${SERIF};color:${ACCENT}}
    .tpl-clean-warm .wx-summary-item{display:block;margin-top:8px;font:${'14px/1.78'} ${SERIF};color:${TEXT}}
    .tpl-clean-warm .wx-summary-item b{margin-right:8px;color:${ACCENT}}
  `,
  copyRichText(clone) {
    set(clone, `width:100%; max-width:100%; margin:0 auto; padding:28px 24px; background:#fff; color:${TEXT}; font-family:${SERIF}; border:1px solid ${BORDER}; box-sizing:border-box;`)
    clone.querySelectorAll('.wx-section').forEach((el, i) => set(el, `padding:0; margin:${i ? '28px 0 0' : '0'}; background:none;`))
    clone.querySelectorAll('.wx-page,.wx-highlight-icon').forEach(el => set(el, 'display:none;'))
    clone.querySelectorAll('.wx-h2').forEach(el => set(el, `margin:0 0 14px; padding:0 0 10px; border-bottom:2px solid ${ACCENT}; font-family:${SERIF}; font-size:22px; line-height:1.38; font-weight:700; color:${TEXT};`))
    clone.querySelectorAll('.wx-h3,.wx-data-value,.wx-compare-title,.wx-timeline-title,.wx-summary-title').forEach(el => set(el, `display:block; margin:0; font-family:${SERIF}; font-size:16px; line-height:1.6; font-weight:700; color:${ACCENT};`))
    clone.querySelectorAll('.wx-p').forEach((el, i) => set(el, `margin:${i ? '14px 0 0' : '0'}; font-family:${SERIF}; font-size:16px; line-height:1.9; color:${TEXT};`))
    clone.querySelectorAll('.wx-callout,.wx-note,.wx-highlight,.wx-data-card,.wx-summary-card,.wx-scheme-card').forEach(el => set(el, `margin:18px 0 0; padding:15px 16px; background:${WASH}; border:1px solid ${BORDER}; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-compare-card').forEach(el => set(el, 'display:block; margin:18px 0 0;'))
    clone.querySelectorAll('.wx-compare-col').forEach(el => set(el, `display:block; margin:10px 0 0; padding:14px 16px; background:${WASH}; border:1px solid ${BORDER}; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-timeline').forEach(el => set(el, 'margin:14px 0 0; padding:0 0 0 20px;'))
    clone.querySelectorAll('.wx-timeline-dot').forEach(el => set(el, `display:inline-block; width:8px; height:8px; margin:7px 8px 0 -20px; border-radius:8px; background:${ACCENT}; vertical-align:top;`))
    clone.querySelectorAll('.wx-media-grid,.wx-illustration-card').forEach(el => set(el, 'margin:18px 0 0; text-align:center;'))
    clone.querySelectorAll('.wx-img,.wx-illustration-img').forEach(el => set(el, 'max-width:100%; height:auto; display:block; margin:0 auto;'))
    clone.querySelectorAll('.wx-data-label,.wx-data-note,.wx-compare-label,.wx-compare-desc,.wx-timeline-desc,.wx-media-caption,.wx-illustration-caption').forEach(el => set(el, `display:block; margin:4px 0 0; font-family:${SANS}; font-size:12px; line-height:1.62; color:${MUTED};`))
    clone.querySelectorAll('.wx-summary-item').forEach(el => set(el, `display:block; margin:8px 0 0; font-family:${SERIF}; font-size:14px; line-height:1.78; color:${TEXT};`))
    return clone
  },
}

function set(el, style) { el.setAttribute('style', style) }
