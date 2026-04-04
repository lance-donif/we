import privateCssText from './magazineBalkan.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const magazineBalkan = createMagazineTemplate({
  id: 'tpl-magazine-balkan',
  name: '杂志 · 巴尔干',
  className: 'tpl-magazine-balkan',
  pageStart: 0,
  sectionPalette: [
    { bg: '#f5f5f5', accent: '#44494b', number: '#dcdddd', h3: '#181a1b', cardBg: '#ececec' },
    { bg: '#fffdfa', accent: '#fb6614', number: '#ffe9d0', h3: '#662b06', cardBg: '#fff5e7' },
    { bg: '#fafffc', accent: '#07bc49', number: '#d0ffe2', h3: '#06662b', cardBg: '#e7fff1' },
    { bg: '#f5f5f5', accent: '#44494b', number: '#dcdddd', h3: '#181a1b', cardBg: '#ececec' },
  ],
  cssText: privateCssText,
})
