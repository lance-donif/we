import privateCssText from './magazineHebei.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineHebei = createMagazineTemplate({
  id: 'tpl-magazine-hebei',
  name: '杂志 · 河北',
  className: 'tpl-magazine-hebei',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f5f5f5', accent: '#44494b', number: '#dcdddd', h3: '#333b3d', cardBg: '#ececec' },
    { bg: '#faffff', accent: '#059080', number: '#b8fffa', h3: '#06665b', cardBg: '#e7ffff' },
    { bg: '#fffffa', accent: '#c5a000', number: '#fff9af', h3: '#5d4037', cardBg: '#fff9c4' },
    { bg: '#fafbff', accent: '#3f51b5', number: '#d0d9ff', h3: '#1a237e', cardBg: '#e8eaf6' },
  ],
  cssText: privateCssText,
})
