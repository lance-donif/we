<template>
  <div class="wx-compiled-content" :class="templateClass">
    <article ref="wxPostRef" class="wx-post">
      <div class="wx-content" v-html="renderedHTML"></div>
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  renderedHTML: { type: String, default: '' },
  templateClass: { type: String, default: 'tpl-magazine-a' },
})

const wxPostRef = ref(null)

defineExpose({
  getPostElement: () => wxPostRef.value,
})
</script>
