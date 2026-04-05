import privateCssText from './pureBlue.css?raw'
import { createMagazineTemplate } from './magazineBase.js'

export const pureBlue = createMagazineTemplate({
  id: 'tpl-pure-blue',
  name: '纯色 · 雾蓝',
  className: 'tpl-pure-blue',
  pageStart: 1,
  sectionPalette: [
    { bg: '#edf3f7', accent: '#637d90', number: '#d3dee7', h3: '#233847', cardBg: '#e2ebf1' },
    { bg: '#f4f8fb', accent: '#5b7487', number: '#d8e2ea', h3: '#263a48', cardBg: '#e8f0f5' },
    { bg: '#e9f0f5', accent: '#6f8798', number: '#cfdae4', h3: '#2b3f4e', cardBg: '#dde7ee' },
  ],
  cssText: privateCssText,
})
