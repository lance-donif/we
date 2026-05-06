import privateCssText from './magazinePaperCutB.css?raw'
import { createPaperCutTemplate } from './paperCutBase.js'

export const magazinePaperCutB = createPaperCutTemplate({
  id: 'tpl-papercut-ocean',
  name: '3D剪纸 · 静海 (3D Art)',
  className: 'tpl-papercut-ocean',
  palette: [
    { bg: '#f1f9ff', accent: '#3daee9', cardBg: '#f8fdff' },
    { bg: '#f1f9ff', accent: '#26c6da', cardBg: '#f8fdff' },
    { bg: '#f1f9ff', accent: '#5c6bc0', cardBg: '#fdfdff' },
  ],
  cssText: privateCssText,
})
