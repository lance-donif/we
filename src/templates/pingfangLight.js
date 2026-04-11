import privateCssText from './pingfangLight.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const pingfangLight = createMagazineTemplate({
  id: 'tpl-pingfang-light',
  name: '苹方 · 轻盈',
  className: 'tpl-pingfang-light',
  pageStart: 1,
  sectionPalette: [
    { bg: '#ffffff', accent: '#3f3f3f', number: '#d0d0d0', h3: '#2a2a2a', cardBg: '#f5f5f5' },
    { bg: '#fafafa', accent: '#555555', number: '#c8c8c8', h3: '#2d2d2d', cardBg: '#f0f0f0' },
    { bg: '#ffffff', accent: '#3f3f3f', number: '#d0d0d0', h3: '#2a2a2a', cardBg: '#f5f5f5' },
  ],
  copyStyles: {
    sectionPad: '18px 8px 10px',
    titleBlockPad: '10px 8px 7px',
    pageMargin: '10px',
    h2Size: '18px',
    h2Margin: '5px',
    h3Size: '16px',
    h3Margin: '8px',
    h3MoodMargin: '2px',
    pSize: '15px',
    pSpacing: '9px',
    componentSpacing: '10px',
    hrMargin: '16px',
    olItemGap: '8px',
    olNumRadius: '0',
    postPH3Spacing: '11px',
  },
  cssText: privateCssText,
})
