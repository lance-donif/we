import { computed } from 'vue'

export function useMarkdown(markdownRef, templateRef) {
  const parsedHTML = computed(() => {
    const md = markdownRef.value || ''
    const pageStart = templateRef.value?.pageStart || 0
    const lines = md.split('\n')
    let html = ''
    let inSection = false
    let sectionCount = 0
    let listItems = []
    let olItems = []
    let quoteLines = []

    function flushCards() {
      if (listItems.length) {
        html += '<div class="wx-callout">'
        listItems.forEach((item, index) => {
          html += `<div class="wx-callout-item${index === 0 ? ' lead' : ''}">${inlineFormat(item)}</div>`
        })
        html += '</div>'
        listItems = []
      }

      if (olItems.length) {
        html += '<div class="wx-ordered-list">'
        olItems.forEach((item, index) => {
          html += `
            <div class="wx-ol-item">
              <span class="wx-ol-number">${index + 1}</span>
              <div class="wx-ol-content">${inlineFormat(item)}</div>
            </div>
          `
        })
        html += '</div>'
        olItems = []
      }

      if (quoteLines.length) {
        html += '<blockquote class="wx-note">'
        quoteLines.forEach((line) => {
          html += `<p class="wx-note-line">${inlineFormat(line)}</p>`
        })
        html += '</blockquote>'
        quoteLines = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()

      if (trimmed === '') {
        flushCards()
        continue
      }

      if (/^(提示词|图片提示词|内部备注|生成提示)[:：]/.test(trimmed)) {
        flushCards()
        continue
      }
      
      if (line.startsWith('# ')) {
        flushCards()
        const content = line.slice(2).trim()
        const [title, mainTitle] = content.split('|').map(s => s.trim())
        if (mainTitle) {
          html += `
            <div class="wx-title-block">
              <span class="wx-title">${inlineFormat(title)}</span>
              <h1 class="wx-main-title">${inlineFormat(mainTitle)}</h1>
            </div>
          `
        } else {
          html += `<div class="wx-title-block"><h1 class="wx-main-title">${inlineFormat(title)}</h1></div>`
        }
        continue
      }

      if (line.startsWith('## ')) {
        flushCards()
        if (inSection) {
          html += '</section>'
          inSection = false
        }

        const indexStr = String(pageStart + sectionCount).padStart(2, '0')
        sectionCount += 1
        const text = inlineFormat(line.slice(3))
        html += `<section class="wx-section"><span class="wx-page">${indexStr}</span><h2 class="wx-h2">${text}</h2>`
        inSection = true
        continue
      }

      if (line.startsWith('### ')) {
        flushCards()
        const rawText = line.slice(4).trim()
        const text = inlineFormat(rawText)
        const moodOnly = /^[\p{Extended_Pictographic}\uFE0F\s.,，。!！?？~\-—·•]+$/u.test(rawText)
        html += `<h3 class="wx-h3${moodOnly ? ' wx-h3-mood' : ''}">${text}</h3>`
        continue
      }

      if (line.startsWith('#### ')) {
        flushCards()
        const content = line.slice(5)
        const [kicker, featureTitle] = content.split('|')
        html += `
          <div class="wx-feature">
            <div class="wx-feature-copy">
              <span class="wx-feature-kicker">${inlineFormat((kicker || '').trim())}</span>
              <span class="wx-feature-title">${inlineFormat((featureTitle || kicker || '').trim())}</span>
            </div>
            <span class="wx-feature-mark" aria-hidden="true"></span>
          </div>
        `
        continue
      }

      if (line.startsWith('> ')) {
        quoteLines.push(line.slice(2))
        continue
      }

      const olMatch = line.match(/^\d+\.\s+(.+)$/)
      if (olMatch) {
        olItems.push(olMatch[1])
        continue
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        listItems.push(line.slice(2))
        continue
      }

      if (trimmed === '---' || trimmed === '***') {
        flushCards()
        html += '<hr class="wx-hr" />'
        continue
      }

      if (line.startsWith('!! ')) {
        flushCards()
        html += `
          <div class="wx-highlight">
            <span class="wx-highlight-icon" aria-hidden="true"></span>
            <div class="wx-highlight-text">${inlineFormat(line.slice(3).trim())}</div>
          </div>
        `
        continue
      }

      if (line.startsWith('@@ ')) {
        flushCards()
        const [label = '', title = '', meta = '', desc = '', image = ''] = line
          .slice(3)
          .split('|')
          .map(item => item.trim())

        html += `
          <article class="wx-scheme-card">
            <div class="wx-scheme-label">${inlineFormat(label || '同款方案')}</div>
            <div class="wx-scheme-content">
              <div class="wx-scheme-media">
                <div class="wx-scheme-image-wrap">
                  <img class="wx-scheme-image" src="${image}" alt="" />
                </div>
              </div>
              <div class="wx-scheme-body">
                <h4 class="wx-scheme-title">${inlineFormat(title)}</h4>
                <p class="wx-scheme-meta">${inlineFormat(meta)}</p>
                <p class="wx-scheme-desc">${inlineFormat(desc)}</p>
              </div>
            </div>
          </article>
        `
        continue
      }

      if (line.startsWith('::stat ')) {
        flushCards()
        const [label = '', value = '', note = ''] = splitParts(line, 7)
        html += `
          <section class="wx-data-card">
            <span class="wx-data-label">${inlineFormat(label)}</span>
            <strong class="wx-data-value">${inlineFormat(value)}</strong>
            <span class="wx-data-note">${inlineFormat(note)}</span>
          </section>
        `
        continue
      }

      if (line.startsWith('::compare ')) {
        flushCards()
        const [badTitle = '', badDesc = '', goodTitle = '', goodDesc = ''] = splitParts(line, 10)
        html += `
          <section class="wx-compare-card">
            <div class="wx-compare-col wx-compare-bad">
              <span class="wx-compare-label">不建议</span>
              <strong class="wx-compare-title">${inlineFormat(badTitle)}</strong>
              <span class="wx-compare-desc">${inlineFormat(badDesc)}</span>
            </div>
            <div class="wx-compare-col wx-compare-good">
              <span class="wx-compare-label">更稳妥</span>
              <strong class="wx-compare-title">${inlineFormat(goodTitle)}</strong>
              <span class="wx-compare-desc">${inlineFormat(goodDesc)}</span>
            </div>
          </section>
        `
        continue
      }

      if (line.startsWith('::timeline ')) {
        flushCards()
        const [label = '', desc = ''] = splitParts(line, 11)
        html += `
          <section class="wx-timeline">
            <span class="wx-timeline-dot"></span>
            <div class="wx-timeline-body">
              <strong class="wx-timeline-title">${inlineFormat(label)}</strong>
              <span class="wx-timeline-desc">${inlineFormat(desc)}</span>
            </div>
          </section>
        `
        continue
      }

      if (line.startsWith('::summary ')) {
        flushCards()
        const [title = '', ...items] = splitParts(line, 10)
        html += '<section class="wx-summary-card">'
        html += `<strong class="wx-summary-title">${inlineFormat(title || '最后记一下')}</strong>`
        items.filter(Boolean).forEach((item, index) => {
          html += `<span class="wx-summary-item"><b>${index + 1}</b>${inlineFormat(item)}</span>`
        })
        html += '</section>'
        continue
      }

      if (line.startsWith('::image-right ')) {
        flushCards()
        const [alt = '', src = '', caption = ''] = splitParts(line, 14)
        html += `
          <section class="wx-illustration-card">
            <img class="wx-illustration-img" src="${src}" alt="${alt}" />
            <span class="wx-illustration-caption">${inlineFormat(caption || alt)}</span>
          </section>
        `
        continue
      }

      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
      if (imgMatch) {
        flushCards()
        const images = [imgMatch]

        while (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim()
          const nextMatch = nextLine.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
          if (!nextMatch) break
          images.push(nextMatch)
          i += 1
        }

        html += `<div class="wx-media-grid columns-${images.length === 1 ? 1 : images.length === 2 ? 2 : 3}">`
        images.slice(0, 3).forEach(([, alt, src]) => {
          const trimmedAlt = alt.trim()
          html += `
            <figure class="wx-media-card">
              <div class="wx-media-frame">
                <img class="wx-img" src="${src}" alt="${alt}" />
              </div>
              ${trimmedAlt ? `<figcaption class="wx-media-caption">${inlineFormat(trimmedAlt)}</figcaption>` : ''}
            </figure>
          `
        })
        html += '</div>'
        continue
      }

      flushCards()
      const text = inlineFormat(line)
      html += `<p class="wx-p">${text}</p>`
    }

    flushCards()
    if (inSection) html += '</section>'

    return html
  })

  return { parsedHTML }
}

function inlineFormat(text) {
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="wx-strong">$1</strong>')
  text = text.replace(/\*(.+?)\*/g, '<em class="wx-em">$1</em>')
  text = text.replace(/`(.+?)`/g, '<code class="wx-code">$1</code>')
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="wx-link">$1</a>')
  return text
}

function splitParts(line, offset) {
  return line.slice(offset).split('|').map(item => item.trim())
}
