<template>
  <aside class="pane preview-pane">
    <!-- 顶栏 -->
    <header class="pane-header">
      <div class="layout-left">
        <span class="brand-subtitle">微信公众号 · 实时预览</span>
      </div>
      <div class="layout-right">
        <button
          class="btn-primary-text hover-lift"
          :style="copyBtnStyle"
          @click="handleCopy"
        >
          {{ copyBtnText }}
        </button>
      </div>
    </header>

    <div class="preview-body">
      <WxRenderer
        ref="rendererRef"
        :rendered-html="renderedHtml"
        :template-class="templateClass"
      />
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import WxRenderer from './WxRenderer.vue'

const props = defineProps({
  renderedHtml: { type: String, default: '' },
  templateClass: { type: String, default: 'tpl-magazine-a' },
  template: { type: Object, required: true },
})

const emit = defineEmits(['copy'])

const rendererRef = ref(null)
const copyState = ref('idle') // idle | success | error
let copyTimer = null

const copyBtnText = computed(() => {
  if (copyState.value === 'success') return '已复制 ✓'
  return '一键复制发布格式'
})

const copyBtnStyle = computed(() => {
  if (copyState.value === 'success') return { color: '#10b981' }
  return {}
})

function handleCopy() {
  const wxPost = rendererRef.value?.$el?.querySelector('.wx-post')
  emit('copy', wxPost)

  copyState.value = 'success'
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => { copyState.value = 'idle' }, 2500)
}
</script>
