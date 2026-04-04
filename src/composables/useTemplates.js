import { ref, computed } from 'vue'
import { templates as registeredTemplates } from '../templates/index.js'

export function useTemplates() {
  const activeTemplateId = ref(registeredTemplates[0].id)

  const activeTemplate = computed(() =>
    registeredTemplates.find(template => template.id === activeTemplateId.value) || registeredTemplates[0]
  )

  const templates = registeredTemplates

  function setTemplate(id) {
    if (registeredTemplates.some(template => template.id === id)) {
      activeTemplateId.value = id
    }
  }

  return {
    templates,
    activeTemplateId,
    activeTemplate,
    setTemplate,
  }
}
