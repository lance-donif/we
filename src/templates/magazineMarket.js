import privateCssText from './magazineMarket.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineMarket = createMagazineTemplate({
  id: 'tpl-magazine-market',
  name: '杂志 · 菜场',
  className: 'tpl-magazine-market',
  pageStart: 0,
  sectionPalette: [
    { bg: 'rgba(0,0,0,0.03)', accent: '#44494b', number: '#dbdad7', h3: '#181a1b', cardBg: 'rgba(0,0,0,0.06)' },
    { bg: '#fafffc', accent: '#07bc49', number: '#d0ffe2', h3: '#06662b', cardBg: '#e7fff1' },
    { bg: '#fffafa', accent: '#cf6f8d', number: '#efd8e0', h3: '#7c4158', cardBg: '#ffedf0' },
    { bg: '#fffdfa', accent: '#fb6614', number: '#ffe9d0', h3: '#662b06', cardBg: '#fff5e7' },
  ],
  cssText: privateCssText,
})
