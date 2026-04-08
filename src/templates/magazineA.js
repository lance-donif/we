import privateCssText from './magazineA.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineA = createMagazineTemplate({
  id: 'tpl-magazine-a',
  name: '杂志 · 探洞',
  className: 'tpl-magazine-a',
  pageStart: 0,
  sectionPalette: [
    { bg: 'rgba(0,0,0,0.03)', accent: '#44494b', number: '#dbdad7', h3: '#333b3d', cardBg: 'rgba(0,0,0,0.06)' },
    { bg: '#faffff', accent: '#00a7a7', number: '#b8fffa', h3: '#06665b', cardBg: '#e7ffff' },
    { bg: 'rgba(0,0,0,0.03)', accent: '#44494b', number: '#dbdad7', h3: '#333b3d', cardBg: 'rgba(0,0,0,0.06)' },
    { bg: '#fffdfa', accent: '#f57c00', number: '#ffe9d0', h3: '#662b06', cardBg: '#fff5e7' },
    { bg: '#fafffc', accent: '#4caf50', number: '#d0ffe2', h3: '#06662b', cardBg: '#e7fff1' },
  ],
  cssText: privateCssText,
})
