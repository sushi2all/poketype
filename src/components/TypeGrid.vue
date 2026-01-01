<script setup>
import { computed } from 'vue'
import { allTypes } from '../data/typeChart.js'
import { formatTypeName } from '../data/typeColors.js'
import TypeIcon from './TypeIcon.vue'

const props = defineProps({
  primaryType: {
    type: String,
    default: null
  },
  secondaryType: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:primaryType', 'update:secondaryType'])

function handleTypeClick(type) {
  // If clicking on primary type, deselect it
  if (props.primaryType === type) {
    emit('update:primaryType', null)
    // Also clear secondary if it exists
    if (props.secondaryType) {
      emit('update:secondaryType', null)
    }
    return
  }
  
  // If clicking on secondary type, deselect it
  if (props.secondaryType === type) {
    emit('update:secondaryType', null)
    return
  }
  
  // If no primary selected, set as primary
  if (!props.primaryType) {
    emit('update:primaryType', type)
    return
  }
  
  // If primary exists but no secondary, set as secondary
  if (!props.secondaryType) {
    emit('update:secondaryType', type)
    return
  }
  
  // If both exist, replace secondary
  emit('update:secondaryType', type)
}

function clearSelection() {
  emit('update:primaryType', null)
  emit('update:secondaryType', null)
}

function getButtonClasses(type) {
  const isPrimary = props.primaryType === type
  const isSecondary = props.secondaryType === type
  
  if (isPrimary) {
    return 'ring-2 ring-white/80 ring-offset-2 ring-offset-[#0f0f23] scale-105 bg-white/20'
  }
  if (isSecondary) {
    return 'ring-2 ring-white/50 ring-offset-2 ring-offset-[#0f0f23] scale-105 bg-white/15'
  }
  return 'hover:bg-white/10 hover:scale-102'
}

const hasSelection = computed(() => props.primaryType !== null)
</script>

<template>
  <div class="space-y-4">
    <!-- Instructions -->
    <div class="text-center space-y-1">
      <p class="text-gray-400 text-sm">
        <span v-if="!primaryType">Select the opponent's primary type</span>
        <span v-else-if="!secondaryType">Optionally select a secondary type</span>
        <span v-else>Showing matchups for {{ formatTypeName(primaryType) }}/{{ formatTypeName(secondaryType) }}</span>
      </p>
    </div>

    <!-- Type Grid - Compact -->
    <div class="grid grid-cols-6 sm:grid-cols-9 gap-1.5 sm:gap-2 max-w-3xl mx-auto">
      <button
        v-for="type in allTypes"
        :key="type"
        @click="handleTypeClick(type)"
        class="relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg transition-all duration-150 bg-white/5 border border-white/10"
        :class="getButtonClasses(type)"
        :aria-pressed="primaryType === type || secondaryType === type"
        :aria-label="`${formatTypeName(type)} type`"
      >
        <TypeIcon :type="type" :size="40" />
        <span class="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{{ formatTypeName(type) }}</span>
        
        <!-- Selection indicator -->
        <span 
          v-if="primaryType === type"
          class="absolute -top-1 -right-1 bg-white text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow"
        >
          1
        </span>
        <span 
          v-else-if="secondaryType === type"
          class="absolute -top-1 -right-1 bg-white/80 text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow"
        >
          2
        </span>
      </button>
    </div>

    <!-- Clear Button -->
    <div class="flex justify-center">
      <button
        v-if="hasSelection"
        @click="clearSelection"
        class="px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10"
      >
        Clear Selection
      </button>
    </div>
  </div>
</template>
