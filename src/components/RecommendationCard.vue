<script setup>
import { computed } from 'vue'
import TypeBadge from './TypeBadge.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  },
  variant: {
    type: String,
    default: 'neutral', // 'positive', 'negative', 'neutral'
    validator: (value) => ['positive', 'negative', 'neutral'].includes(value)
  },
  emptyMessage: {
    type: String,
    default: 'No types to display'
  },
  showResistances: {
    type: Boolean,
    default: false
  }
})

const headerClasses = computed(() => {
  switch (props.variant) {
    case 'positive':
      return 'text-emerald-400'
    case 'negative':
      return 'text-rose-400'
    default:
      return 'text-gray-300'
  }
})

const borderClasses = computed(() => {
  switch (props.variant) {
    case 'positive':
      return 'border-emerald-500/30'
    case 'negative':
      return 'border-rose-500/30'
    default:
      return 'border-white/10'
  }
})

const iconBgClasses = computed(() => {
  switch (props.variant) {
    case 'positive':
      return 'bg-emerald-500/20'
    case 'negative':
      return 'bg-rose-500/20'
    default:
      return 'bg-white/10'
  }
})

const icon = computed(() => {
  switch (props.variant) {
    case 'positive':
      return '✓'
    case 'negative':
      return '✗'
    default:
      return '•'
  }
})

// Helper to get multiplier from different item structures
function getMultiplier(item) {
  if (typeof item.multiplier === 'number') {
    return item.multiplier
  }
  // For resistant/weak types, calculate from resistances/weaknesses
  if (item.resistances) {
    return Math.min(...item.resistances.map(r => r.multiplier))
  }
  if (item.weaknesses) {
    return Math.max(...item.weaknesses.map(w => w.multiplier))
  }
  return null
}
</script>

<template>
  <div 
    class="bg-white/5 backdrop-blur-sm rounded-2xl border p-4 sm:p-5 transition-all hover:bg-white/[0.07]"
    :class="borderClasses"
  >
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <span 
        class="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold"
        :class="iconBgClasses"
      >
        {{ icon }}
      </span>
      <div>
        <h3 class="font-semibold" :class="headerClasses">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-gray-500">{{ subtitle }}</p>
      </div>
    </div>

    <!-- Content -->
    <div v-if="items.length > 0" class="flex flex-wrap gap-2">
      <TypeBadge
        v-for="item in items"
        :key="item.type"
        :type="item.type"
        :multiplier="getMultiplier(item)"
        size="md"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-6 text-gray-500 text-sm">
      {{ emptyMessage }}
    </div>
  </div>
</template>

