import privateCssText from './magazineHebei.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineHebei = createMagazineTemplate({
  id: 'tpl-magazine-hebei',
  name: '杂志 · 河北',
  className: 'tpl-magazine-hebei',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f5f5f5', accent: '#44494b', number: '#dcdddd', h3: '#181a1b', cardBg: '#ececec' },
    { bg: '#faffff', accent: '#07bca4', number: '#b8fffa', h3: '#06665b', cardBg: '#e7ffff' },
    { bg: '#fffffa', accent: '#ebcd04', number: '#fff9af', h3: '#484004', cardBg: '#ffffe7' },
    { bg: '#fafbff', accent: '#526fff', number: '#d0d9ff', h3: '#061166', cardBg: '#e7ecff' },
  ],
  cssText: privateCssText,
})
