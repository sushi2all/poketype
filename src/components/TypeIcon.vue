<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
})

const iconSrc = computed(() => `/types/${props.type}.png`)
</script>

<template>
  <img 
    :src="iconSrc"
    :alt="`${type} type icon`"
    :width="size"
    :height="size"
    class="flex-shrink-0 rounded-full"
    loading="lazy"
  />
</template>
