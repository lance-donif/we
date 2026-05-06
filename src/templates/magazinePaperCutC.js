import privateCssText from './magazinePaperCutC.css?raw'
import { createPaperCutTemplate } from './paperCutBase.js'

export const magazinePaperCutC = createPaperCutTemplate({
  id: 'tpl-papercut-meadow',
  name: '3D剪纸 · 原野 (3D Art)',
  className: 'tpl-papercut-meadow',
  palette: [
    { bg: '#fafdca11', accent: '#66bb6a', cardBg: '#fafdca' },
    { bg: '#fafdca11', accent: '#ffb74d', cardBg: '#fff8e1' },
    { bg: '#fafdca11', accent: '#8d99ae', cardBg: '#edf2f4' },
  ],
  cssText: privateCssText,
})
