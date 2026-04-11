import privateCssText from './blankMinimal.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const blankMinimal = createMagazineTemplate({
  id: 'tpl-blank-minimal',
  name: '空白 · 极简',
  className: 'tpl-blank-minimal',
  pageStart: 1,
  sectionPalette: [
    { bg: '#ffffff', accent: '#A63737', number: '#e8d0d0', h3: '#333333', cardBg: '#f7f3f3' },
    { bg: '#fafafa', accent: '#2C3E50', number: '#d5dfe7', h3: '#333333', cardBg: '#f0f2f5' },
    { bg: '#ffffff', accent: '#595959', number: '#d9d9d9', h3: '#333333', cardBg: '#f5f5f5' },
  ],
  copyStyles: {
    sectionPad: '16px 12px 12px',
    titleBlockPad: '10px 12px 7px',
    pageMargin: '10px',
    h2Size: '20px',
    h2Margin: '5px',
    h3Size: '17px',
    h3Margin: '8px',
    h3MoodMargin: '2px',
    pSize: '15px',
    pSpacing: '9px',
    componentSpacing: '10px',
    hrMargin: '20px',
    olItemGap: '8px',
    olNumRadius: '2px',
    postPH3Spacing: '11px',
  },
  cssText: privateCssText,
})
