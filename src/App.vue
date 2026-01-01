<script setup>
import { ref, watch } from 'vue'
import TypeGrid from './components/TypeGrid.vue'
import RecommendationCard from './components/RecommendationCard.vue'
import CookieConsent from './components/CookieConsent.vue'
import { useTypeMatchups } from './composables/useTypeMatchups.js'
import { formatTypeName } from './data/typeColors.js'


// State for selected types
const primaryType = ref(null)
const secondaryType = ref(null)

// Get matchup calculations
const {
  hasSelection,
  superEffectiveMoves,
  notEffectiveMoves,
  resistantTypes,
  weakTypes
} = useTypeMatchups(primaryType, secondaryType)

// Track selections with Plausible analytics
watch([primaryType, secondaryType], ([primary, secondary]) => {
  if (primary && window.plausible) {
    const typeString = secondary ? `${primary}/${secondary}` : primary
    window.plausible('Type Selected', { props: { types: typeString } })
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="pt-8 pb-6 px-4 text-center">
      <div class="flex items-center justify-center gap-3 mb-2">
        <img src="/pokeball.svg" alt="" class="w-10 h-10" />
        <h1 class="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
          PokeType
        </h1>
      </div>
      <p class="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
        Find the best types and moves against any Pokémon opponent
      </p>
    </header>

    <!-- Main Content -->
    <main class="flex-1 px-4 pb-8 max-w-6xl mx-auto w-full">
      <!-- Type Selector -->
      <section class="mb-8">
        <TypeGrid 
          v-model:primary-type="primaryType"
          v-model:secondary-type="secondaryType"
        />
      </section>

      <!-- Results -->
      <section 
        v-if="hasSelection"
        class="space-y-6 animate-fade-in"
      >
        <!-- Selected Types Display -->
        <div class="text-center">
          <span class="text-gray-400 text-sm">Showing matchups against </span>
          <span class="font-semibold text-white">
            {{ formatTypeName(primaryType) }}
            <span v-if="secondaryType"> / {{ formatTypeName(secondaryType) }}</span>
          </span>
        </div>

        <!-- Recommendation Cards Grid - 2x2 -->
        <div class="space-y-3 sm:space-y-4">
          <!-- Column Headers -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <h3 class="text-lg font-semibold text-gray-300 flex items-center justify-center gap-2">
              <span>🐾</span>
              <span>Pokemon</span>
            </h3>
            <h3 class="text-lg font-semibold text-gray-300 flex items-center justify-center gap-2">
              <span>⚔️</span>
              <span>Moves</span>
            </h3>
          </div>
          
          <!-- Cards Grid -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
          <!-- Resistant Pokémon Types -->
          <RecommendationCard
            title="Bring These Pokémon Types"
            subtitle="Resist opponent's STAB moves"
            :items="resistantTypes"
            variant="positive"
            empty-message="No resistant types found"
          />

          <!-- Super Effective Moves -->
          <RecommendationCard
            title="Use These Move Types"
            subtitle="Deal super effective damage"
            :items="superEffectiveMoves"
            variant="positive"
            empty-message="No super effective moves found"
          />

          <!-- Weak Pokémon Types -->
          <RecommendationCard
            title="Avoid These Pokémon Types"
            subtitle="Weak to opponent's STAB moves"
            :items="weakTypes"
            variant="negative"
            empty-message="No weak types found"
          />

          <!-- Not Effective Moves -->
          <RecommendationCard
            title="Avoid These Move Types"
            subtitle="Reduced or no damage"
            :items="notEffectiveMoves"
            variant="negative"
            empty-message="No resisted moves found"
          />
          </div>
        </div>
      </section>

      <!-- Empty State -->
      <section 
        v-else
        class="text-center py-16"
      >
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4 animate-float">
          <span class="text-4xl">🎯</span>
        </div>
        <h2 class="text-xl font-semibold text-gray-300 mb-2">Ready to Battle?</h2>
        <p class="text-gray-500 max-w-sm mx-auto">
          Select your opponent's type above to see which moves and Pokémon types give you the advantage.
        </p>
      </section>
    </main>

    <!-- Footer -->
    <footer class="py-6 px-4 border-t border-white/5 text-center text-gray-500 text-sm">
      <p>
        Built with 💜 for Pokémon trainers everywhere
      </p>
      <p class="mt-1 text-xs text-gray-600">
        Pokémon and all related names are trademarks of Nintendo, Game Freak, and The Pokémon Company.
      </p>
    </footer>

    <!-- Cookie Consent Banner -->
    <CookieConsent />
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
