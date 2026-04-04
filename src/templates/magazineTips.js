import privateCssText from './magazineTips.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineTips = createMagazineTemplate({
  id: 'tpl-magazine-tips',
  name: '杂志 · 锦囊',
  className: 'tpl-magazine-tips',
  pageStart: 1,
  sectionPalette: [
    { bg: '#f5f8fd', accent: '#2fa5ee', number: '#d9e8fb', h3: '#28557a', cardBg: '#e8f1fb' },
    { bg: '#f4fbfb', accent: '#31a99a', number: '#d3ece6', h3: '#275f58', cardBg: '#e3f3ef' },
    { bg: '#f6fbf5', accent: '#59aa6b', number: '#dcecd9', h3: '#335d3d', cardBg: '#e8f3e6' },
  ],
  cssText: privateCssText,
})
