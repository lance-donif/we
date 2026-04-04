import privateCssText from './magazineXinjiang.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineXinjiang = createMagazineTemplate({
  id: 'tpl-magazine-xinjiang',
  name: '杂志 · 新疆',
  className: 'tpl-magazine-xinjiang',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f5f5f5', accent: '#44494b', number: '#dcdddd', h3: '#181a1b', cardBg: '#ececec' },
    { bg: '#fafdff', accent: '#14aafb', number: '#d0edff', h3: '#064166', cardBg: '#e7f6ff' },
    { bg: '#faffff', accent: '#07bca4', number: '#b8fffa', h3: '#06665b', cardBg: '#e7ffff' },
    { bg: '#fffffa', accent: '#ebcd04', number: '#fff9af', h3: '#484004', cardBg: '#ffffe7' },
  ],
  cssText: privateCssText,
})
