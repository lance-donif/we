import privateCssText from './magazineChangsha.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineChangsha = createMagazineTemplate({
  id: 'tpl-magazine-changsha',
  name: '杂志 · 长沙',
  className: 'tpl-magazine-changsha',
  pageStart: 1,
  sectionPalette: [
    { bg: '#fffdfa', accent: '#fb6614', number: '#ffe9d0', h3: '#662b06', cardBg: '#fff5e7' },
    { bg: '#fafbff', accent: '#526fff', number: '#d0d9ff', h3: '#061166', cardBg: '#e7ecff' },
    { bg: '#fffafc', accent: '#cf6f8d', number: '#efd8e0', h3: '#7c4158', cardBg: '#ffedf0' },
    { bg: '#fffffa', accent: '#ebcd04', number: '#fff9af', h3: '#484004', cardBg: '#ffffe7' },
  ],
  cssText: privateCssText,
})
