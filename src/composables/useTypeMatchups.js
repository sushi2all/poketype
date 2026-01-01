import { computed } from 'vue'
import {
  getSuperEffectiveMoves,
  getNotVeryEffectiveMoves,
  getResistantPokemonTypes,
  getWeakPokemonTypes
} from '../data/typeChart.js'

/**
 * Composable for calculating type matchups reactively
 * @param {import('vue').Ref<string|null>} primaryType - Primary type ref
 * @param {import('vue').Ref<string|null>} secondaryType - Secondary type ref
 */
export function useTypeMatchups(primaryType, secondaryType) {
  // Combine selected types into an array
  const opponentTypes = computed(() => {
    const types = []
    if (primaryType.value) types.push(primaryType.value)
    if (secondaryType.value && secondaryType.value !== primaryType.value) {
      types.push(secondaryType.value)
    }
    return types
  })

  // Check if any types are selected
  const hasSelection = computed(() => opponentTypes.value.length > 0)

  // Super effective moves (2x or 4x damage)
  const superEffectiveMoves = computed(() => {
    if (!hasSelection.value) return []
    return getSuperEffectiveMoves(opponentTypes.value)
  })

  // Not very effective moves (0.5x, 0.25x, or 0x damage)
  const notEffectiveMoves = computed(() => {
    if (!hasSelection.value) return []
    return getNotVeryEffectiveMoves(opponentTypes.value)
  })

  // Pokémon types that resist opponent's moves
  const resistantTypes = computed(() => {
    if (!hasSelection.value) return []
    return getResistantPokemonTypes(opponentTypes.value)
  })

  // Pokémon types weak to opponent's moves
  const weakTypes = computed(() => {
    if (!hasSelection.value) return []
    return getWeakPokemonTypes(opponentTypes.value)
  })

  return {
    opponentTypes,
    hasSelection,
    superEffectiveMoves,
    notEffectiveMoves,
    resistantTypes,
    weakTypes
  }
}

