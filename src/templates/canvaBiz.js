import privateCssText from './canvaBiz.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const canvaBiz = createMagazineTemplate({
  id: 'tpl-canva-biz',
  name: 'Canva · 商务',
  className: 'tpl-canva-biz',
  pageStart: 1,
  sectionPalette: [
    { bg: '#f8f9fa', accent: '#2C3E50', number: '#d5dfe7', h3: '#1a252f', cardBg: '#eef2f5' },
    { bg: '#ffffff', accent: '#34495E', number: '#c8d6e0', h3: '#1c2833', cardBg: '#f0f4f7' },
    { bg: '#f5f6f8', accent: '#2980B9', number: '#bdd8eb', h3: '#1a3a5c', cardBg: '#e8f0f8' },
  ],
  copyStyles: {
    sectionPad: '20px 14px 14px',
    titleBlockPad: '12px 14px 8px',
    pageMargin: '10px',
    h2Size: '22px',
    h2Margin: '5px',
    h3Size: '17px',
    h3Margin: '8px',
    h3MoodMargin: '2px',
    pSize: '15px',
    pSpacing: '9px',
    componentSpacing: '10px',
    hrMargin: '20px',
    olItemGap: '8px',
    olNumRadius: '4px',
    postPH3Spacing: '11px',
  },
  cssText: privateCssText,
})
