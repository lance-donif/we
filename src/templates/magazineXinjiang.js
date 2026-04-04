import privateCssText from './magazineXinjiang.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineXinjiang = createMagazineTemplate({
  id: 'tpl-magazine-xinjiang',
  name: '杂志 · 新疆',
  className: 'tpl-magazine-xinjiang',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f1efea', accent: '#4f4b47', number: '#d9d3cb', h3: '#272320', cardBg: '#e7e2db' },
    { bg: '#f5f8fd', accent: '#2fa5ee', number: '#d9e8fb', h3: '#28557a', cardBg: '#e8f1fb' },
    { bg: '#f4fbfb', accent: '#31a99a', number: '#d3ece6', h3: '#275f58', cardBg: '#e3f3ef' },
    { bg: '#fcfbf1', accent: '#c4b04b', number: '#e9e0b6', h3: '#6a6232', cardBg: '#f3eed8' },
  ],
  cssText: privateCssText,
})
