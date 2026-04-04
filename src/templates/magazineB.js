import privateCssText from './magazineB.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineB = createMagazineTemplate({
  id: 'tpl-magazine-b',
  name: '杂志 · 苗寨',
  className: 'tpl-magazine-b',
  pageStart: 1,
  sectionPalette: [
    { bg: '#fafffc', accent: '#07bc49', number: '#d0ffe2', h3: '#06662b', cardBg: '#e7fff1' },
    { bg: '#fffffa', accent: '#ebcd04', number: '#fff9af', h3: '#484004', cardBg: '#ffffe7' },
    { bg: '#fffdfa', accent: '#fb6614', number: '#ffe9d0', h3: '#662b06', cardBg: '#fff5e7' },
  ],
  cssText: privateCssText,
})
