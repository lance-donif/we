import fs from 'node:fs';

const [, , articlePath] = process.argv;

if (!articlePath) {
  console.error('用法：node scripts/validate-novel-article.mjs <article.md>');
  process.exit(1);
}

const text = fs.readFileSync(articlePath, 'utf8');
const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
const numericSections = (text.match(/^\d+\s*$/gm) || []).length;
const failures = [];

const forbiddenSnippets = [
  '加入书架',
  '求关注',
  '读者',
  '第一章',
  '第二章',
];

if (chineseChars < 9000 || chineseChars > 14000) {
  failures.push(`中文字符应在 9000-14000 之间：${chineseChars}`);
}

if (numericSections < 6) {
  failures.push(`数字分节少于 6 个：${numericSections}`);
}

if (/^#/m.test(text)) {
  failures.push('正文不应包含 Markdown 标题，微信标题单独填写');
}

for (const snippet of forbiddenSnippets) {
  if (text.includes(snippet)) {
    failures.push(`正文含平台话术或旧章名：${snippet}`);
  }
}

if (failures.length) {
  console.error(failures.map(item => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log(`小说校验通过：${chineseChars} 个中文字符，${numericSections} 个数字分节`);
