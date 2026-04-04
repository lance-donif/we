import privateCssText from './magazineBalkan.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineBalkan = createMagazineTemplate({
  id: 'tpl-magazine-balkan',
  name: '杂志 · 巴尔干',
  className: 'tpl-magazine-balkan',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f1efea', accent: '#4f4b47', number: '#d9d3cb', h3: '#272320', cardBg: '#e7e2db' },
    { bg: '#fdf8ee', accent: '#d87a3f', number: '#efd9c2', h3: '#7b4a27', cardBg: '#f6ebdc' },
    { bg: '#f6fbf5', accent: '#4a9f62', number: '#d8ead8', h3: '#2e5f39', cardBg: '#eaf3e7' },
    { bg: '#f3f0eb', accent: '#56514b', number: '#d9d1c7', h3: '#2d2925', cardBg: '#e6dfd7' },
  ],
  cssText: privateCssText,
})
