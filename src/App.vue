<template>
  <div class="workbench-grid">
    <EditorPane
      v-model:title="title"
      v-model:content="content"
      :templates="templates"
      :active-template-id="activeTemplateId"
      @set-template="setTemplate"
    />

    <PreviewPane
      :rendered-html="parsedHTML"
      :template-class="activeTemplate.className"
      :template="activeTemplate"
      @copy="handleCopy"
    />
  </div>

  <ToastMessage :message="toastMessage" :visible="toastVisible" />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import EditorPane from './components/EditorPane.vue'
import PreviewPane from './components/PreviewPane.vue'
import ToastMessage from './components/ToastMessage.vue'
import { useTemplates } from './composables/useTemplates.js'
import { useMarkdown } from './composables/useMarkdown.js'
import { useClipboard } from './composables/useClipboard.js'

import './assets/styles/editor.css'

const title = ref('')
const content = ref('')

const { templates, activeTemplateId, activeTemplate, setTemplate } = useTemplates()
const { parsedHTML } = useMarkdown(content, activeTemplate)
const { toastMessage, toastVisible, copyRichText } = useClipboard()

const templateStyleEl = document.getElementById('monday-template-style') || document.createElement('style')
templateStyleEl.id = 'monday-template-style'
if (!templateStyleEl.parentNode) {
  document.head.appendChild(templateStyleEl)
}

watchEffect(() => {
  templateStyleEl.textContent = activeTemplate.value.cssText
})

onBeforeUnmount(() => {
  templateStyleEl.remove()
})

onMounted(async () => {
  const response = await fetch('/2026-04-02-喝水护肤.md')
  const sampleArticle = await response.text()
  const sampleLines = sampleArticle.trim().split('\n')

  title.value = sampleLines[0]?.replace(/^#\s+/, '') || ''
  content.value = sampleLines.slice(2).join('\n')
})

async function handleCopy(wxPostEl) {
  await copyRichText(wxPostEl, activeTemplate.value)
}
</script>
