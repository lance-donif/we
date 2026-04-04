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

      if (line.startsWith('- ') || line.startsWith('* ')) {
        listItems.push(line.slice(2))
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
                <img class="wx-scheme-image" src="${image}" alt="" />
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

        html += `<div class="wx-media-grid columns-${images.length === 2 ? 2 : 3}">`
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
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  text = text.replace(/`(.+?)`/g, '<code style="background:#f0f0f0;padding:2px 6px;border-radius:3px;font-size:14px;">$1</code>')
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:inherit;text-decoration:underline;">$1</a>')
  return text
}
