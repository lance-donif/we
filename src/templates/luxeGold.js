import privateCssText from './luxeGold.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

const GOLD = '#C4A35A'
const BLACK = '#1a1a1a'
const TEXT = '#2a2a2a'
const GRAY = '#999'
const SERIF = "'Songti SC','STSong','SimSun','Times New Roman',serif"
const SANS = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"

export const luxeGold = createMagazineTemplate({
  id: 'tpl-luxe-gold',
  name: '轻奢 · 鎏金',
  className: 'tpl-luxe-gold',
  pageStart: 1,
  sectionPalette: [
    { bg: '#ffffff', accent: GOLD, number: GOLD, h3: BLACK, cardBg: '#f6f6f6' },
    { bg: '#ffffff', accent: GOLD, number: GOLD, h3: BLACK, cardBg: '#f6f6f6' },
    { bg: '#ffffff', accent: GOLD, number: GOLD, h3: BLACK, cardBg: '#f6f6f6' },
  ],
  cssText: privateCssText,

  /* ── 复制后处理：覆盖杂志基础样式 → 轻奢黑白金 ── */
  copyPostProcess(clone) {
    /* 根容器：去掉圆角，纯白 */
    clone.setAttribute('style',
      `width:100%; max-width:100%; margin:0 auto; background-color:#ffffff; color:${TEXT}; border-radius:0; overflow:hidden; font-family:${SERIF}; box-sizing:border-box;`
    )

    /* 标题区：居中 */
    clone.querySelectorAll('.wx-title-block').forEach(b => {
      b.setAttribute('style', 'padding:36px 28px 24px; background:none; text-align:center; box-sizing:border-box;')
    })
    clone.querySelectorAll('.wx-title').forEach(t => {
      t.setAttribute('style', `display:inline-block; font-family:${SANS}; font-size:10px; line-height:1.5; font-weight:600; letter-spacing:0.35em; text-transform:uppercase; color:${GOLD}; border:1px solid ${GOLD}; padding:4px 14px; margin-bottom:14px;`)
    })
    clone.querySelectorAll('.wx-main-title').forEach(t => {
      t.setAttribute('style', `margin:0; padding:0; display:block; font-family:${SERIF}; font-size:28px; line-height:1.35; font-weight:800; color:${BLACK}; letter-spacing:0.02em; text-align:center;`)
    })

    /* 所有 section：去圆角 */
    clone.querySelectorAll('.wx-section').forEach(s => {
      const old = s.getAttribute('style') || ''
      s.setAttribute('style', old
        .replace(/border-top-left-radius:\d+px;?/g, '')
        .replace(/border-top-right-radius:\d+px;?/g, '')
        .replace(/border-bottom-left-radius:\d+px;?/g, '')
        .replace(/border-bottom-right-radius:\d+px;?/g, '')
      )
    })

    /* 页码：居中 + 装饰线 */
    clone.querySelectorAll('.wx-page').forEach(p => {
      const text = p.textContent
      p.textContent = ''
      p.setAttribute('style', `display:block; margin-bottom:24px; text-align:center; font-family:${SANS}; font-size:11px; line-height:1; font-weight:700; color:${GOLD}; letter-spacing:0.3em;`)
      p.innerHTML = `<span style="color:#ddd;font-weight:300;letter-spacing:-0.1em;margin-right:8px;">——</span>${text}<span style="color:#ddd;font-weight:300;letter-spacing:-0.1em;margin-left:8px;">——</span>`
    })

    /* h2：居中 + 金色短线 */
    clone.querySelectorAll('.wx-h2').forEach(h2 => {
      h2.setAttribute('style', `font-family:${SERIF}; font-size:22px; line-height:1.4; font-weight:800; color:${BLACK}; margin:0 0 10px; letter-spacing:0.04em; text-align:center;`)
      const line = document.createElement('div')
      line.setAttribute('style', `width:24px; height:2px; background:${GOLD}; margin:8px auto 0;`)
      h2.appendChild(line)
    })

    /* 加粗：金色文字，无底色 */
    clone.querySelectorAll('.wx-strong').forEach(s => {
      s.setAttribute('style', `font-weight:700; color:${GOLD}; background:none; border-bottom:none; padding:0;`)
    })

    /* 斜体 */
    clone.querySelectorAll('.wx-em').forEach(em => {
      em.setAttribute('style', `font-family:${SERIF}; font-style:italic; font-weight:400; color:#666;`)
    })

    /* 无序列表卡片：金色顶线 */
    clone.querySelectorAll('.wx-callout').forEach(c => {
      c.setAttribute('style', `margin:20px 0 0; padding:16px 14px; border-radius:0; background:#fafafa; border:none; border-top:2px solid ${GOLD}; box-shadow:none; box-sizing:border-box;`)
    })

    /* 高亮块：金色左线 */
    clone.querySelectorAll('.wx-highlight').forEach(h => {
      h.setAttribute('style', `margin:20px 0 0; display:block; padding:14px; border-radius:0; background:#fafafa; border:none; border-left:3px solid ${GOLD}; box-shadow:none; box-sizing:border-box;`)
    })
    clone.querySelectorAll('.wx-highlight-icon').forEach(i => {
      i.setAttribute('style', 'display:none;')
    })

    /* 引用块：透明底 + 金色左线 */
    clone.querySelectorAll('.wx-note').forEach(n => {
      n.setAttribute('style', `margin:20px 0 0; padding:12px 0 12px 24px; border-radius:0; background:none; border:none; border-left:1px solid ${GOLD}; box-shadow:none; box-sizing:border-box;`)
    })

    /* 分割线：40px金色短线 */
    clone.querySelectorAll('.wx-hr').forEach(hr => {
      hr.setAttribute('style', `border:none; height:1px; margin:40px auto; width:40px; background-color:${GOLD}; opacity:0.6; display:block;`)
    })

    /* 方案卡：灰边 + 黑底金字标签 */
    clone.querySelectorAll('.wx-scheme-card').forEach(c => {
      c.setAttribute('style', `margin:20px 0 0; padding:16px 14px; border-radius:0; background:#fff; border:1px solid #e8e8e8; box-shadow:none; box-sizing:border-box;`)
    })
    clone.querySelectorAll('.wx-scheme-label').forEach(l => {
      l.setAttribute('style', `display:inline-block; margin:0; padding:4px 12px; border-radius:0; font-family:${SANS}; font-size:12px; line-height:1.5; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:${GOLD}; background:${BLACK};`)
    })

    /* 图片：无圆角无边框 */
    clone.querySelectorAll('.wx-media-frame').forEach(f => {
      const old = f.getAttribute('style') || ''
      f.setAttribute('style', old.replace(/border-radius:\d+px;?/g, 'border-radius:0;').replace(/border:1px[^;]+;?/g, 'border:none;'))
    })
    clone.querySelectorAll('.wx-img').forEach(img => {
      img.setAttribute('style', 'width:100%; height:auto; display:block; border-radius:0;')
    })

    /* 特写标记：小金色方块 */
    clone.querySelectorAll('.wx-feature-mark').forEach(m => {
      m.setAttribute('style', `position:absolute; top:0; right:0; width:6px; height:6px; display:block; border-radius:0; background-color:${GOLD}; border:none; box-sizing:border-box;`)
    })
  },
})
