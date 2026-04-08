import privateCssText from './magazineBalkan.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineBalkan = createMagazineTemplate({
  id: 'tpl-magazine-balkan',
  name: '杂志 · 巴尔干',
  className: 'tpl-magazine-balkan',
  pageStart: 0,
  sectionPalette: [
    { bg: 'rgba(0,0,0,0.03)', accent: '#44494b', number: '#dbdad7', h3: '#333b3d', cardBg: 'rgba(0,0,0,0.06)' },
    { bg: '#fffdfa', accent: '#e65100', number: '#ffe9d0', h3: '#3e2723', cardBg: '#fff3e0' },
    { bg: '#fafffc', accent: '#2e7d32', number: '#d0ffe2', h3: '#1b5e20', cardBg: '#e8f5e9' },
    { bg: 'rgba(0,0,0,0.03)', accent: '#44494b', number: '#dbdad7', h3: '#333b3d', cardBg: 'rgba(0,0,0,0.06)' },
  ],
  cssText: privateCssText,
})
