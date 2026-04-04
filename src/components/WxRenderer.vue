<template>
  <div class="wx-compiled-content" :class="templateClass">
    <article ref="wxPostRef" class="wx-post">
      <div class="wx-content" v-html="renderedHtml"></div>
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  renderedHtml: { type: String, default: '' },
  templateClass: { type: String, default: 'tpl-magazine-a' },
})

const wxPostRef = ref(null)

defineExpose({
  getPostElement: () => wxPostRef.value,
})
</script>
