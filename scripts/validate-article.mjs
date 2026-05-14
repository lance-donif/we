import fs from 'node:fs';

const [, , articlePath] = process.argv;

if (!articlePath) {
  console.error('用法：node scripts/validate-article.mjs <article.md>');
  process.exit(1);
}

const text = fs.readFileSync(articlePath, 'utf8');
const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
const failures = [];

const requiredSnippets = [
  '提示词：',
  '阿柒猫',
  '奶油白三花猫',
];

const forbiddenSnippets = [
  '快速瘦',
  '三天见效',
  '管用十倍',
  '一招解决',
  '根治',
  '永久改善',
  '一只穿睡衣的橘猫',
  '一只橘猫关掉手机',
];

if (chineseChars < 1000) {
  failures.push(`中文正文少于 1000 字：${chineseChars}`);
}

for (const snippet of requiredSnippets) {
  if (!text.includes(snippet)) {
    failures.push(`缺少内容：${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (text.includes(snippet)) {
    failures.push(`包含禁用强功效词：${snippet}`);
  }
}

if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log(`文章校验通过：${chineseChars} 个中文字符`);
