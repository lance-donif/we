import privateCssText from './magazineChangsha.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineChangsha = createMagazineTemplate({
  id: 'tpl-magazine-changsha',
  name: '杂志 · 长沙',
  className: 'tpl-magazine-changsha',
  pageStart: 1,
  sectionPalette: [
    { bg: '#fffdfa', accent: '#e65100', number: '#ffe9d0', h3: '#3e2723', cardBg: '#fff3e0' },
    { bg: '#fafbff', accent: '#3f51b5', number: '#d0d9ff', h3: '#1a237e', cardBg: '#e8eaf6' },
    { bg: '#fffafc', accent: '#ad1457', number: '#efd8e0', h3: '#880e4f', cardBg: '#fce4ec' },
    { bg: '#fffffa', accent: '#c5a000', number: '#fff9af', h3: '#5d4037', cardBg: '#fff9c4' },
  ],
  cssText: privateCssText,
})
