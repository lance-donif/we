import privateCssText from './pureOat.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const pureOat = createMagazineTemplate({
  id: 'tpl-pure-oat',
  name: '纯色 · 燕麦',
  className: 'tpl-pure-oat',
  pageStart: 1,
  sectionPalette: [
    { bg: '#f6f1e7', accent: '#8c7454', number: '#e5d9c6', h3: '#4d3f2d', cardBg: '#efe5d7' },
    { bg: '#fbf7ef', accent: '#7d684c', number: '#e7dcc9', h3: '#433727', cardBg: '#f3ebdf' },
    { bg: '#f4ede2', accent: '#92785a', number: '#e1d3be', h3: '#503f2d', cardBg: '#ebe0d0' },
  ],
  cssText: privateCssText,
})
