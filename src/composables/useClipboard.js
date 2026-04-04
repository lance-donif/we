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
    const images = Array.from(styledClone.querySelectorAll('img'))
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

    const finalHTML = styledClone.outerHTML

    // 方案A: Clipboard API
    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        const htmlBlob = new Blob([finalHTML], { type: 'text/html' })
        const textBlob = new Blob([styledClone.innerText], { type: 'text/plain' })
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
