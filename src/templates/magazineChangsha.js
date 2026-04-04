import privateCssText from './magazineChangsha.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineChangsha = createMagazineTemplate({
  id: 'tpl-magazine-changsha',
  name: '杂志 · 长沙',
  className: 'tpl-magazine-changsha',
  pageStart: 1,
  sectionPalette: [
    { bg: '#fdf8ef', accent: '#d87a3f', number: '#efd9c2', h3: '#7b4a27', cardBg: '#f6ebdc' },
    { bg: '#f4f7fd', accent: '#6a86d9', number: '#dbe3f5', h3: '#324675', cardBg: '#e8eef9' },
    { bg: '#fcf3f6', accent: '#cf6f8d', number: '#efd8e0', h3: '#7c4158', cardBg: '#f6e6ec' },
    { bg: '#fcfbf1', accent: '#c4b04b', number: '#e9e0b6', h3: '#6a6232', cardBg: '#f3eed8' },
  ],
  cssText: privateCssText,
})
