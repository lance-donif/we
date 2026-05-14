import { readFile } from 'node:fs/promises'

const indexPath = new URL('../src/templates/index.js', import.meta.url)
const indexSource = await readFile(indexPath, 'utf8')

const requiredTemplates = [
  ['cleanLine', './cleanLine.js'],
  ['cleanBrief', './cleanBrief.js'],
  ['cleanWarm', './cleanWarm.js'],
  ['notionBoard', './notionBoard.js'],
  ['duoLesson', './duoLesson.js'],
]

const failures = []

if (/magazinePaperCut|papercut/i.test(indexSource)) {
  failures.push('3D paper-cut templates should not be registered')
}

if (/\bpure[A-Z]\w*\b|\bcanva[A-Z]\w*\b/.test(indexSource)) {
  failures.push('Pure color and Canva templates should be hidden from registry')
}

for (const [name, file] of requiredTemplates) {
  if (!indexSource.includes(`import { ${name} } from '${file}'`)) {
    failures.push(`${name} should be imported from ${file}`)
  }
  if (!new RegExp(`\\b${name}\\b`).test(indexSource.split('export const templates = [')[1] || '')) {
    failures.push(`${name} should be present in exported templates`)
  }
}

for (const [name, file] of requiredTemplates) {
  const source = await readFile(new URL(`../src/templates/${file.slice(2)}`, import.meta.url), 'utf8')
    .catch(() => '')

  if (!source) {
    failures.push(`${file} should exist`)
    continue
  }
  if (/createMagazineTemplate|createPaperCutTemplate/.test(source)) {
    failures.push(`${file} should not reuse the old shared layout bases`)
  }
  if (!/copyRichText\(clone\)/.test(source)) {
    failures.push(`${file} should provide its own copyRichText layout`)
  }
}

if (failures.length) {
  console.error('Template registry validation failed:')
  failures.forEach(failure => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Template registry validation passed.')
