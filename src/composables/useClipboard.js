import { ref } from 'vue'

export function useClipboard() {
  const toastMessage = ref('')
  const toastVisible = ref(false)

  function showToast(msg, duration = 3000) {
    toastMessage.value = msg
    toastVisible.value = true
    setTimeout(() => { toastVisible.value = false }, duration)
  }

  /**
   * 将渲染区 HTML 克隆、注入内联样式后，放入 Clipboard
   * @param {HTMLElement} sourceEl - #wx-render-box .wx-post
   * @param {Object} template - 当前活跃模板的配置对象
   */
  async function copyRichText(sourceEl, template) {
    if (!sourceEl) {
      showToast('复制失败：找不到渲染内容')
      return false
    }

    const styledClone = template.copyRichText(sourceEl.cloneNode(true))
    const exportRoot = document.createElement('section')
    exportRoot.className = styledClone.className || 'wx-post'
    exportRoot.setAttribute('style', styledClone.getAttribute('style') || '')

    Array.from(styledClone.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('wx-content')) {
        while (child.firstChild) {
          exportRoot.appendChild(child.firstChild)
        }
        return
      }

      exportRoot.appendChild(child)
    })

    const leadParagraph = document.createElement('p')
    leadParagraph.innerHTML = '&nbsp;'
    leadParagraph.setAttribute('style', 'margin:0; padding:0; font-size:0; line-height:0; height:0; overflow:hidden; color:transparent;')
    exportRoot.insertBefore(leadParagraph, exportRoot.firstChild)

    const nodesToRemove = []
    const exportElements = [exportRoot]
    const walker = document.createTreeWalker(exportRoot, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT)

    while (walker.nextNode()) {
      const current = walker.currentNode

      if (current.nodeType === Node.COMMENT_NODE) {
        nodesToRemove.push(current)
        continue
      }

      if (current.nodeType === Node.TEXT_NODE) {
        if (!/\S/.test(current.textContent || '')) {
          nodesToRemove.push(current)
        }
        continue
      }

      exportElements.push(current)
    }

    nodesToRemove.forEach((node) => {
      node.parentNode?.removeChild(node)
    })

    exportElements.forEach((element) => {
      const tagName = element.tagName.toLowerCase()
      let style = element.getAttribute('style') || ''

      if (/font-family\s*:\s*[^;]*(DM Sans|Caveat)/i.test(style)) {
        style = style.replace(/font-family\s*:\s*[^;]+/i, "font-family:'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif")
      }

      if (/font-family\s*:\s*[^;]*Noto Serif SC/i.test(style)) {
        style = style.replace(/font-family\s*:\s*[^;]+/i, "font-family:'Songti SC','STSong','SimSun','Times New Roman',serif")
      }

      if (/color\s*:\s*inherit/i.test(style) || (tagName === 'a' && !/color\s*:/i.test(style))) {
        let inheritedColor = ''
        let parent = element.parentElement

        while (parent && !inheritedColor) {
          const parentStyle = parent.getAttribute('style') || ''
          const colorMatch = parentStyle.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)
          if (colorMatch?.[1]) {
            inheritedColor = colorMatch[1].trim()
          }
          parent = parent.parentElement
        }

        if (/color\s*:\s*inherit/i.test(style)) {
          style = style.replace(/color\s*:\s*inherit/gi, `color:${inheritedColor || '#0f0f0f'}`)
        } else if (tagName === 'a') {
          style = `${style}${style && !style.trim().endsWith(';') ? ';' : ''} color:${inheritedColor || '#0f0f0f'};`
        }
      }

      if (tagName === 'svg') {
        style = `${style}${style && !style.trim().endsWith(';') ? ';' : ''} max-width:100%; color:#333333; fill:#333333;`
      }

      if (tagName === 'text' || tagName === 'tspan') {
        style = `${style}${style && !style.trim().endsWith(';') ? ';' : ''} fill:#333333; color:#333333; stroke:none;`
      }

      style = style
        .replace(/(?:^|;)\s*background-image\s*:[^;]+;?/gi, ';')
        .replace(/(?:^|;)\s*box-shadow\s*:[^;]+;?/gi, ';')
        .replace(/--[\w-]+\s*:\s*[^;]+;?/g, '')
        .replace(/var\(--[\w-]+,\s*([^)]+)\)/g, '$1')
        .replace(/var\(--[\w-]+\)/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim()

      if (style) {
        element.setAttribute('style', style)
      } else {
        element.removeAttribute('style')
      }
    })

    const replaceTagName = [
      ['article', 'section'],
      ['blockquote', 'section'],
      ['figure', 'section'],
      ['figcaption', 'p'],
      ['h2', 'p'],
      ['h3', 'p'],
      ['h4', 'p'],
      ['strong', 'span'],
      ['em', 'span'],
      ['code', 'span'],
    ]

    replaceTagName.forEach(([from, to]) => {
      exportRoot.querySelectorAll(from).forEach((element) => {
        const replacement = document.createElement(to)

        Array.from(element.attributes).forEach((attr) => {
          replacement.setAttribute(attr.name, attr.value)
        })

        while (element.firstChild) {
          replacement.appendChild(element.firstChild)
        }

        element.parentNode?.replaceChild(replacement, element)
      })
    })

    exportRoot.querySelectorAll('.wx-highlight').forEach((element) => {
      if (element.tagName.toLowerCase() === 'section') return

      const replacement = document.createElement('section')
      Array.from(element.attributes).forEach((attr) => {
        replacement.setAttribute(attr.name, attr.value)
      })

      while (element.firstChild) {
        replacement.appendChild(element.firstChild)
      }

      element.parentNode?.replaceChild(replacement, element)
    })

    exportRoot.querySelectorAll('.wx-highlight-text').forEach((element) => {
      if (element.tagName.toLowerCase() === 'p') return

      const replacement = document.createElement('p')
      Array.from(element.attributes).forEach((attr) => {
        replacement.setAttribute(attr.name, attr.value)
      })

      while (element.firstChild) {
        replacement.appendChild(element.firstChild)
      }

      element.parentNode?.replaceChild(replacement, element)
    })

    const images = Array.from(exportRoot.querySelectorAll('img'))
    let failedImageCount = 0

    if (images.length) {
      await Promise.all(images.map(async (image) => {
        const source = image.currentSrc || image.src || image.getAttribute('src')
        if (!source || source.startsWith('data:')) return

        try {
          const response = await fetch(source)
          if (!response.ok) throw new Error(`HTTP ${response.status}`)

          const blob = await response.blob()
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = () => reject(reader.error || new Error('readAsDataURL failed'))
            reader.readAsDataURL(blob)
          })

          image.setAttribute('src', dataUrl)
        } catch (error) {
          failedImageCount += 1
          console.warn('Inline image failed:', source, error)
        }
      }))
    }

    let finalHTML = exportRoot.outerHTML
      .replace(/<foreignObject([^>]*)>/gi, '<section$1>')
      .replace(/<\/foreignObject>/gi, '</section>')
      .replace(/background-image\s*:[^;"]+;?/gi, '')
      .replace(/box-shadow\s*:[^;"]+;?/gi, '')
      .replace(/--[\w-]+\s*:\s*[^;]+;?/g, '')
      .replace(/var\(--[\w-]+,\s*([^)]+)\)/g, '$1')
      .replace(/var\(--[\w-]+\)/g, '')
      .replace(/color\s*:\s*inherit/gi, 'color:#0f0f0f')
      .trim()

    if (!/^<section\b/i.test(finalHTML)) {
      finalHTML = `<section style="${exportRoot.getAttribute('style') || ''}">${finalHTML}</section>`
    }

    const plainText = exportRoot.innerText.replace(/^\s+/, '')

    // 方案A: Clipboard API
    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        const htmlBlob = new Blob([finalHTML], { type: 'text/html' })
        const textBlob = new Blob([plainText], { type: 'text/plain' })
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob,
          }),
        ])
        showToast(
          failedImageCount
            ? `复制成功，但有 ${failedImageCount} 张图片未能内嵌`
            : '复制成功！图片已内嵌，请去微信公众号后台粘贴'
        )
        return true
      } catch (e) {
        console.warn('Clipboard API failed, fallback:', e)
      }
    }

    // 方案B: execCommand fallback
    const tempDiv = document.createElement('div')
    tempDiv.contentEditable = 'true'
    tempDiv.style.cssText = 'position:fixed; left:-9999px; top:0; opacity:0;'
    tempDiv.innerHTML = finalHTML
    document.body.appendChild(tempDiv)

    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(tempDiv)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()
    document.body.removeChild(tempDiv)

    showToast(
      failedImageCount
        ? `复制成功，但有 ${failedImageCount} 张图片未能内嵌`
        : '复制成功！图片已内嵌，请去微信公众号后台粘贴'
    )
    return true
  }

  return {
    toastMessage,
    toastVisible,
    showToast,
    copyRichText,
  }
}
