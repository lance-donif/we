import privateCssText from './magazineA.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineA = createMagazineTemplate({
  id: 'tpl-magazine-a',
  name: '杂志 · 探洞',
  className: 'tpl-magazine-a',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f5f5f5', accent: '#44494b', number: '#dcdddd', h3: '#181a1b', cardBg: '#ececec' },
    { bg: '#faffff', accent: '#07bca4', number: '#b8fffa', h3: '#06665b', cardBg: '#e7fcfa' },
    { bg: '#f5f5f5', accent: '#44494b', number: '#dcdddd', h3: '#181a1b', cardBg: '#ececec' },
    { bg: '#fffdf0', accent: '#fb6614', number: '#ffe9d0', h3: '#662b06', cardBg: '#fff3e5' },
    { bg: '#fafffc', accent: '#07bc49', number: '#d0ffe2', h3: '#06662b', cardBg: '#e7fced' },
  ],
  cssText: privateCssText,
})
