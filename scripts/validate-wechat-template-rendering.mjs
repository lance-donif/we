import { useMarkdown } from '../src/composables/useMarkdown.js'

const sample = [
  '## 晚上总想吃东西，先别急着怪自己',
  '提示词：一只猫在夜里看外卖软件',
  '::stat 晚饭后加餐|从5次降到2次|记录7天后的变化',
  '::compare 硬扛不吃|越忍越想点外卖|先吃一小份热的|把冲动降下来',
  '::timeline 第1天|只记录几点想吃，不急着控制',
  '::summary 睡前3步|先喝热水|刷牙离开厨房|第二天再复盘',
  '::image-right 阿柒猫夜里看外卖|https://example.com/cat.png|插画只服务场景，不替代正文',
].join('\n')

const templateRef = { value: { pageStart: 0 } }
const markdownRef = { value: sample }
const { parsedHTML } = useMarkdown(markdownRef, templateRef)
const html = parsedHTML.value

const expectations = [
  ['draft prompt is removed', !html.includes('提示词')],
  ['stat block renders', html.includes('wx-data-card')],
  ['compare block renders', html.includes('wx-compare-card')],
  ['timeline block renders', html.includes('wx-timeline')],
  ['summary block renders', html.includes('wx-summary-card')],
  ['illustration block renders', html.includes('wx-illustration-card')],
  ['image alt is preserved', html.includes('alt="阿柒猫夜里看外卖"')],
]

const failed = expectations.filter(([, ok]) => !ok)

if (failed.length) {
  console.error('Wechat template rendering validation failed:')
  failed.forEach(([name]) => console.error(`- ${name}`))
  process.exit(1)
}

console.log('Wechat template rendering validation passed.')
