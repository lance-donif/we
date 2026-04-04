import privateCssText from './magazineHebei.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineHebei = createMagazineTemplate({
  id: 'tpl-magazine-hebei',
  name: '杂志 · 河北',
  className: 'tpl-magazine-hebei',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f1efea', accent: '#4f4b47', number: '#d9d3cb', h3: '#272320', cardBg: '#e7e2db' },
    { bg: '#f4fbfb', accent: '#31a99a', number: '#d3ece6', h3: '#275f58', cardBg: '#e3f3ef' },
    { bg: '#fcfbf1', accent: '#c4b04b', number: '#e9e0b6', h3: '#6a6232', cardBg: '#f3eed8' },
    { bg: '#f5f8fd', accent: '#6a86d9', number: '#dbe3f5', h3: '#324675', cardBg: '#e8eef9' },
  ],
  cssText: privateCssText,
})
