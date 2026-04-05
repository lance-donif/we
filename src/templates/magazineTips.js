import privateCssText from './magazineTips.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineTips = createMagazineTemplate({
  id: 'tpl-magazine-tips',
  name: '杂志 · 锦囊',
  className: 'tpl-magazine-tips',
  pageStart: 1,
  sectionPalette: [
    { bg: '#fafdff', accent: '#81d4fa', number: '#d0edff', h3: '#005b8a', cardBg: '#e7f6ff' },
    { bg: '#faffff', accent: '#00a7a7', number: '#b8fffa', h3: '#06665b', cardBg: '#e7ffff' },
    { bg: '#fafffc', accent: '#2e7d32', number: '#d0ffe2', h3: '#1b5e20', cardBg: '#e8f5e9' },
  ],
  cssText: privateCssText,
})
