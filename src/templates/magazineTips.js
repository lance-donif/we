import privateCssText from './magazineTips.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineTips = createMagazineTemplate({
  id: 'tpl-magazine-tips',
  name: '杂志 · 锦囊',
  className: 'tpl-magazine-tips',
  pageStart: 1,
  sectionPalette: [
    { bg: '#fafdff', accent: '#14aafb', number: '#d0edff', h3: '#064166', cardBg: '#e7f6ff' },
    { bg: '#faffff', accent: '#07bca4', number: '#b8fffa', h3: '#06665b', cardBg: '#e7ffff' },
    { bg: '#fafffc', accent: '#07bc49', number: '#d0ffe2', h3: '#06662b', cardBg: '#e7fff1' },
  ],
  cssText: privateCssText,
})
