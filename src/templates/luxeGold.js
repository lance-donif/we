import privateCssText from './luxeGold.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const luxeGold = createMagazineTemplate({
  id: 'tpl-luxe-gold',
  name: '轻奢 · 鎏金',
  className: 'tpl-luxe-gold',
  pageStart: 1,
  sectionPalette: [
    { bg: '#ffffff', accent: '#C4A35A', number: '#C4A35A', h3: '#1a1a1a', cardBg: '#f6f6f6' },
    { bg: '#ffffff', accent: '#C4A35A', number: '#C4A35A', h3: '#1a1a1a', cardBg: '#f6f6f6' },
    { bg: '#ffffff', accent: '#C4A35A', number: '#C4A35A', h3: '#1a1a1a', cardBg: '#f6f6f6' },
  ],
  cssText: privateCssText,
})
