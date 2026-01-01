<script setup>
import { computed } from 'vue'
import { typeColors, getTextColor, formatTypeName } from '../data/typeColors.js'
import TypeIcon from './TypeIcon.vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  multiplier: {
    type: Number,
    default: null
  },
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  showIcon: {
    type: Boolean,
    default: true
  }
})

const bgColor = computed(() => typeColors[props.type] || '#888888')
const textColor = computed(() => getTextColor(props.type))
const displayName = computed(() => formatTypeName(props.type))

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-0.5 text-xs gap-1'
    case 'lg':
      return 'px-4 py-2 text-base gap-2'
    default:
      return 'px-3 py-1 text-sm gap-1.5'
  }
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 12
    case 'lg':
      return 20
    default:
      return 16
  }
})

const formattedMultiplier = computed(() => {
  if (props.multiplier === null) return null
  if (props.multiplier === 0) return '0×'
  if (props.multiplier === 0.25) return '¼×'
  if (props.multiplier === 0.5) return '½×'
  if (props.multiplier === 1) return '1×'
  if (props.multiplier === 2) return '2×'
  if (props.multiplier === 4) return '4×'
  return `${props.multiplier}×`
});
</script>

<template>
  <span
    class="inline-flex items-center font-semibold rounded-full shadow-sm transition-transform hover:scale-105"
    :class="sizeClasses"
    :style="{
      backgroundColor: bgColor,
      color: textColor,
      boxShadow: `0 2px 4px ${bgColor}40`
    }"
  >
    <TypeIcon v-if="showIcon" :type="type" :size="iconSize" />
    <span>{{ displayName }}</span>
    <span 
      v-if="formattedMultiplier" 
      class="ml-1 opacity-90 font-bold"
    >
      {{ formattedMultiplier }}
    </span>
  </span>
</template>
