import privateCssText from './pureSage.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const pureSage = createMagazineTemplate({
  id: 'tpl-pure-sage',
  name: '纯色 · 鼠尾草',
  className: 'tpl-pure-sage',
  pageStart: 1,
  sectionPalette: [
    { bg: '#eef2eb', accent: '#68806c', number: '#d1ddd0', h3: '#29412d', cardBg: '#e3ebe1' },
    { bg: '#f4f7f2', accent: '#5f7563', number: '#d6e0d4', h3: '#25392a', cardBg: '#e8eee6' },
    { bg: '#e8eee6', accent: '#728978', number: '#cad7ca', h3: '#304634', cardBg: '#dde6dc' },
  ],
  cssText: privateCssText,
})
