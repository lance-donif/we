const SANS = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
const SERIF = "'Songti SC','STSong','SimSun','Times New Roman',serif"
const INK = '#202124'
const MUTED = '#6f7478'
const LINE = '#cfd7d3'
const ACCENT = '#2f6f5e'
const SURFACE = '#f7faf8'

export const cleanLine = {
  id: 'tpl-clean-line',
  name: '简洁 · 细线',
  className: 'tpl-clean-line',
  pageStart: 1,
  cssText: `
    .tpl-clean-line{background:#f3f5f2;padding:28px 20px 44px}
    .tpl-clean-line .wx-post{width:min(100%,430px);margin:0 auto;background:#fff;padding:26px 22px;border:1px solid #e1e6e2;box-shadow:none}
    .tpl-clean-line .wx-section{padding:22px 0 0;border-top:1px solid ${LINE};background:none}
    .tpl-clean-line .wx-section:first-child{border-top:0;padding-top:0}
    .tpl-clean-line .wx-page{display:none}
    .tpl-clean-line .wx-h2{margin:0 0 14px;padding-left:12px;border-left:3px solid ${ACCENT};font:${'700 21px/1.42'} ${SERIF};color:${INK}}
    .tpl-clean-line .wx-h3{margin:18px 0 8px;font:${'700 16px/1.55'} ${SERIF};color:${ACCENT}}
    .tpl-clean-line .wx-p{margin:0;font:${'400 16px/1.86'} ${SERIF};color:${INK}}
    .tpl-clean-line .wx-p+.wx-p{margin-top:14px}
    .tpl-clean-line .wx-strong{color:${ACCENT};font-weight:700}
    .tpl-clean-line .wx-callout,.tpl-clean-line .wx-note,.tpl-clean-line .wx-highlight,.tpl-clean-line .wx-scheme-card,.tpl-clean-line .wx-data-card,.tpl-clean-line .wx-summary-card{margin:18px 0 0;padding:14px 16px;background:${SURFACE};border-left:3px solid ${ACCENT}}
    .tpl-clean-line .wx-compare-card{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0 0}
    .tpl-clean-line .wx-compare-col{padding:13px;background:${SURFACE};border:1px solid ${LINE}}
    .tpl-clean-line .wx-timeline{margin:16px 0 0;padding-left:18px;border-left:1px solid ${LINE}}
    .tpl-clean-line .wx-timeline-dot{display:none}
    .tpl-clean-line .wx-media-grid,.tpl-clean-line .wx-illustration-card{margin:18px 0 0}
    .tpl-clean-line .wx-img,.tpl-clean-line .wx-illustration-img{width:100%;height:auto;display:block}
    .tpl-clean-line .wx-illustration-img{max-width:160px;margin:0 auto 8px}
    .tpl-clean-line .wx-media-caption,.tpl-clean-line .wx-illustration-caption,.tpl-clean-line .wx-data-label,.tpl-clean-line .wx-data-note,.tpl-clean-line .wx-compare-label,.tpl-clean-line .wx-compare-desc,.tpl-clean-line .wx-timeline-desc{display:block;font:${'12px/1.6'} ${SANS};color:${MUTED}}
    .tpl-clean-line .wx-data-value,.tpl-clean-line .wx-compare-title,.tpl-clean-line .wx-timeline-title,.tpl-clean-line .wx-summary-title{display:block;font:${'700 17px/1.55'} ${SERIF};color:${ACCENT}}
    .tpl-clean-line .wx-summary-item{display:block;margin-top:8px;font:${'14px/1.75'} ${SERIF};color:${INK}}
    .tpl-clean-line .wx-summary-item b{margin-right:8px;color:${ACCENT}}
  `,
  copyRichText(clone) {
    root(clone)
    clone.querySelectorAll('.wx-section').forEach(section)
    clone.querySelectorAll('.wx-h2').forEach(el => style(el, `margin:0 0 14px; padding:0 0 0 12px; border-left:3px solid ${ACCENT}; font-family:${SERIF}; font-size:21px; line-height:1.42; font-weight:700; color:${INK};`))
    clone.querySelectorAll('.wx-h3,.wx-data-value,.wx-compare-title,.wx-timeline-title,.wx-summary-title').forEach(el => style(el, `display:block; margin:0; font-family:${SERIF}; font-size:16px; line-height:1.6; font-weight:700; color:${ACCENT};`))
    clone.querySelectorAll('.wx-p').forEach((el, i) => style(el, `margin:${i ? '14px 0 0' : '0'}; font-family:${SERIF}; font-size:16px; line-height:1.86; color:${INK};`))
    clone.querySelectorAll('.wx-callout,.wx-note,.wx-highlight,.wx-scheme-card,.wx-data-card,.wx-summary-card').forEach(card)
    clone.querySelectorAll('.wx-compare-card').forEach(el => style(el, 'display:block; margin:18px 0 0; font-size:0; line-height:0;'))
    clone.querySelectorAll('.wx-compare-col').forEach((el, i) => style(el, `display:inline-block; width:49%; margin:0 ${i ? '0' : '2%'} 0 0; padding:13px; vertical-align:top; background:${SURFACE}; border:1px solid ${LINE}; box-sizing:border-box;`))
    clone.querySelectorAll('.wx-timeline').forEach(el => style(el, `margin:16px 0 0; padding:0 0 0 14px; border-left:1px solid ${LINE};`))
    clone.querySelectorAll('.wx-timeline-dot,.wx-highlight-icon,.wx-page').forEach(el => style(el, 'display:none;'))
    clone.querySelectorAll('.wx-media-grid,.wx-illustration-card').forEach(el => style(el, 'margin:18px 0 0; text-align:center;'))
    clone.querySelectorAll('.wx-img,.wx-illustration-img').forEach(el => style(el, 'max-width:100%; height:auto; display:block; margin:0 auto;'))
    clone.querySelectorAll('.wx-data-label,.wx-data-note,.wx-compare-label,.wx-compare-desc,.wx-timeline-desc,.wx-media-caption,.wx-illustration-caption').forEach(el => style(el, `display:block; margin:4px 0 0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${MUTED};`))
    clone.querySelectorAll('.wx-summary-item').forEach(el => style(el, `display:block; margin:8px 0 0; font-family:${SERIF}; font-size:14px; line-height:1.75; color:${INK};`))
    return clone
  },
}

function root(el) { style(el, `width:100%; max-width:100%; margin:0 auto; padding:26px 22px; background:#fff; color:${INK}; font-family:${SERIF}; box-sizing:border-box;`) }
function section(el) { style(el, `padding:22px 0 0; margin:22px 0 0; border-top:1px solid ${LINE}; background:none;`) }
function card(el) { style(el, `margin:18px 0 0; padding:14px 16px; background:${SURFACE}; border:none; border-left:3px solid ${ACCENT}; box-sizing:border-box;`) }
function style(el, value) { el.setAttribute('style', value) }
