import fs from 'node:fs';

const rulePath = new URL('../我的文章规则-九宫格2.md', import.meta.url);
const text = fs.readFileSync(rulePath, 'utf8');
const lines = text.trimEnd().split(/\r?\n/);

const requiredSnippets = [
  '真实场景 → 没说出口的问题 → 错误动作 → 为什么错 → 一个安全动作 → 什么时候就医/停止',
  '凡出现百分比、温度、周期、医学结论，必须有来源',
  '至少 2 个非模板化细节',
  '接下来 6 篇',
  '推荐阅读超过 `20`',
  '不用“规避 AI 检测”做目标',
  'AI 给答案，公众号给共鸣后的一个选择',
  '提出读者没说出口的问题',
  '不和 AI 争百科，去争生活现场',
  '一个具体失败',
  '一个明确取舍',
  '标题要占关键词',
  '核心搜索词',
  '品牌主角固定为“阿柒猫”',
  '奶油白三花猫',
  '橘猫只做配角',
  '低浏览诊断闸门',
  '推荐阅读为 0',
  '有推荐展现但点击低',
  '连续 3 篇没有推荐来源',
];

const forbiddenSnippets = [
  '认知颠覆 → 原理降维 → 量化动作 → 注意事项',
  '每个章节结束处必须插入一张配图',
  '### 黄金三步',
];

const failures = [];

if (lines.length > 200) {
  failures.push(`规则文件 ${lines.length} 行，超过 200 行上限`);
}

for (const snippet of requiredSnippets) {
  if (!text.includes(snippet)) {
    failures.push(`缺少约束：${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (text.includes(snippet)) {
    failures.push(`仍保留旧模板信号：${snippet}`);
  }
}

if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('九宫格规则校验通过');
