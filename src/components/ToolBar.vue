<template>
  <div class="toolbar-area">
    <div class="tool-section">
      <span class="tool-label">模板</span>
      <div class="tool-group">
        <button
          v-for="tpl in templates"
          :key="tpl.id"
          class="btn-pill"
          :class="{ active: activeId === tpl.id }"
          @click="$emit('select', tpl.id)"
        >
          {{ tpl.name }}
        </button>
      </div>
    </div>

    <div class="tool-section">
      <span class="tool-label">排版</span>
      <div class="tool-group">
        <button class="tool-btn btn-text" @click="$emit('insert', '**', '**')">加粗</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n#### 小标题|大标题', '')">特写</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n> ', '')">说明卡</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n- ', '')">要点卡</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n!! ', '')">高亮块</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n@@ 推荐方案|标题|时间/数量|简短说明|图片地址', '')">方案卡</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n![](', ')')">图片</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  templates: { type: Array, required: true },
  activeId: { type: String, required: true },
})

defineEmits(['select', 'insert'])
</script>
