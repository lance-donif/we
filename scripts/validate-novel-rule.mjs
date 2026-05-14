import fs from 'node:fs';

const path = '我的文章规则-小说.md';
const text = fs.readFileSync(path, 'utf8');
const lines = text.trim().split('\n').length;

const requiredSnippets = [
  '项目类型：software/content-system',
  '主要矛盾',
  '前三屏',
  '加入书架',
  '读者根据地',
  '短篇不是标签拼盘',
  '一篇只打一个核心情绪',
  '开局800字',
  '第一人称口述体',
  '数字分节',
  '前 300 字',
  '平台话术',
  '低浏览诊断闸门',
  '展现很少',
  '点击率低于 4%',
  '发布测试',
];

const failures = [];

if (lines > 200) {
  failures.push(`规则文件超过 200 行：${lines}`);
}

for (const snippet of requiredSnippets) {
  if (!text.includes(snippet)) {
    failures.push(`缺少内容：${snippet}`);
  }
}

if (failures.length) {
  console.error(failures.map(item => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log(`小说规则校验通过：${lines} 行`);
