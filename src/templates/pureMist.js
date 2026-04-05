import privateCssText from './pureMist.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const pureMist = createMagazineTemplate({
  id: 'tpl-pure-mist',
  name: '纯色 · 雾灰',
  className: 'tpl-pure-mist',
  pageStart: 1,
  sectionPalette: [
    { bg: '#f3f1ed', accent: '#6f6860', number: '#d7d2ca', h3: '#2d2925', cardBg: '#ebe6df' },
    { bg: '#efebe6', accent: '#7a7269', number: '#dbd5cd', h3: '#322e29', cardBg: '#e7e1d9' },
    { bg: '#f7f5f2', accent: '#665f57', number: '#d9d4cc', h3: '#292521', cardBg: '#efebe4' },
  ],
  cssText: privateCssText,
})
