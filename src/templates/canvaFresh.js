import privateCssText from './canvaFresh.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const canvaFresh = createMagazineTemplate({
  id: 'tpl-canva-fresh',
  name: 'Canva · 清新',
  className: 'tpl-canva-fresh',
  pageStart: 1,
  sectionPalette: [
    { bg: '#f6f9f4', accent: '#7FB69E', number: '#c8e0d4', h3: '#3d5c4c', cardBg: '#eaf3eb' },
    { bg: '#fdf9f5', accent: '#C4956A', number: '#e5d3be', h3: '#6b4d32', cardBg: '#f5eddf' },
    { bg: '#f5f7fa', accent: '#8ba7c2', number: '#c7d5e2', h3: '#3e5670', cardBg: '#e9eff5' },
  ],
  copyStyles: {
    sectionPad: '20px 12px 12px',
    titleBlockPad: '12px 12px 8px',
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
    olNumRadius: '12px',
    postPH3Spacing: '11px',
  },
  cssText: privateCssText,
})
