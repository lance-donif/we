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
        <button class="tool-btn btn-text" @click="$emit('insert', '\n::stat 指标|变化|说明', '')">数据卡</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n::compare 错误做法|为什么不稳|更好做法|具体怎么做', '')">对比</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n::timeline 第1天|只记录不控制', '')">时间线</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n::summary 小结|动作一|动作二|动作三', '')">总结</button>
        <button class="tool-btn btn-text" @click="$emit('insert', '\n::image-right 图片说明|图片地址|图注', '')">插画</button>
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
