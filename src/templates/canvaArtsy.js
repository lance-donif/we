import privateCssText from './canvaArtsy.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const canvaArtsy = createMagazineTemplate({
  id: 'tpl-canva-artsy',
  name: 'Canva · 文艺',
  className: 'tpl-canva-artsy',
  pageStart: 1,
  sectionPalette: [
    { bg: '#f9f5f0', accent: '#8B6F5A', number: '#ddd0c3', h3: '#4a3829', cardBg: '#f0e9e0' },
    { bg: '#f4f0ea', accent: '#6B7F5F', number: '#c5d4bc', h3: '#3a4d32', cardBg: '#e8e3d8' },
    { bg: '#faf7f3', accent: '#9c7a6a', number: '#ddd0c3', h3: '#5a4234', cardBg: '#f2ece4' },
  ],
  copyStyles: {
    sectionPad: '20px 12px 14px',
    titleBlockPad: '12px 12px 8px',
    pageMargin: '10px',
    h2Size: '24px',
    h2Margin: '5px',
    h3Size: '17px',
    h3Margin: '8px',
    h3MoodMargin: '2px',
    pSize: '15px',
    pSpacing: '9px',
    componentSpacing: '10px',
    hrMargin: '20px',
    olItemGap: '8px',
    olNumRadius: '3px',
    postPH3Spacing: '11px',
  },
  cssText: privateCssText,
})
