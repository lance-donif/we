import privateCssText from './magazineB.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineB = createMagazineTemplate({
  id: 'tpl-magazine-b',
  name: '杂志 · 苗寨',
  className: 'tpl-magazine-b',
  pageStart: 1,
  sectionPalette: [
    { bg: '#fafffc', accent: '#2e7d32', number: '#d0ffe2', h3: '#1b5e20', cardBg: '#e8f5e9' },
    { bg: '#fffffa', accent: '#c5a000', number: '#fff9af', h3: '#5d4037', cardBg: '#fff9c4' },
    { bg: '#fffdfa', accent: '#e65100', number: '#ffe9d0', h3: '#3e2723', cardBg: '#fff3e0' },
  ],
  cssText: privateCssText,
})
