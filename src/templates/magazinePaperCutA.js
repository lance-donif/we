import privateCssText from './magazinePaperCutA.css?raw'
import { createPaperCutTemplate } from './paperCutBase.js'

export const magazinePaperCutA = createPaperCutTemplate({
  id: 'tpl-papercut-sweet',
  name: '3D剪纸 · 甜心 (3D Art)',
  className: 'tpl-papercut-sweet',
  palette: [
    { bg: '#fdf5f7', accent: '#ff85a1', cardBg: '#fffafb' },
    { bg: '#fdf5f7', accent: '#a388ee', cardBg: '#fbfaff' },
    { bg: '#fdf5f7', accent: '#ff9e7d', cardBg: '#fffbf9' },
  ],
  cssText: privateCssText,
})
