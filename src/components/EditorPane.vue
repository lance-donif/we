<template>
  <main class="pane editor-pane">
    <!-- 顶栏 -->
    <header class="pane-header">
      <div class="layout-left">
        <h1 class="brand-title">MONDAY</h1>
        <span class="brand-subtitle">极致排版 · 化繁为简</span>
      </div>
      <div class="layout-right">
        <button class="btn-text hover-dim">新建</button>
        <span class="txt-divider">·</span>
        <button class="btn-text hover-dim">文档</button>
        <span class="txt-divider">·</span>
        <button class="btn-text hover-dim">设置</button>
      </div>
    </header>

    <!-- 工具栏 -->
    <ToolBar
      :templates="templates"
      :active-id="activeTemplateId"
      @select="setTemplate"
      @insert="handleInsert"
    />

    <!-- 编辑区 -->
    <div class="editor-body">
      <input
        type="text"
        class="md-title-input"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        placeholder="在这里输入大标题..."
      />
      <textarea
        ref="textareaRef"
        class="md-textarea"
        :value="content"
        @input="handleInput"
        placeholder="从这里开始创作... (支持 Markdown)"
      ></textarea>
    </div>

    <!-- 底栏 -->
    <div class="pane-footer">
      字数：{{ charCount }} 字 &nbsp;&nbsp; 自动保存
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import ToolBar from './ToolBar.vue'

const props = defineProps({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  templates: { type: Array, required: true },
  activeTemplateId: { type: String, required: true },
})

const emit = defineEmits(['update:title', 'update:content', 'setTemplate'])

const textareaRef = ref(null)

const charCount = computed(() => props.content.length)

function setTemplate(id) {
  emit('setTemplate', id)
}

function handleInput(e) {
  emit('update:content', e.target.value)
}

function handleInsert(before, after) {
  const el = textareaRef.value
  if (!el) return

  const start = el.selectionStart
  const end = el.selectionEnd
  const text = props.content
  const selected = text.substring(start, end)

  const newText = text.substring(0, start) + before + selected + after + text.substring(end)
  emit('update:content', newText)

  // 重新定位光标
  requestAnimationFrame(() => {
    el.focus()
    const cursorPos = start + before.length + selected.length
    el.setSelectionRange(cursorPos, cursorPos)
  })
}
</script>
