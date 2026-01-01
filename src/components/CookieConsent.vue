<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const COOKIE_KEY = 'poketype_cookie_consent'

onMounted(() => {
  const consent = localStorage.getItem(COOKIE_KEY)
  if (!consent) {
    isVisible.value = true
  }
})

function acceptCookies() {
  localStorage.setItem(COOKIE_KEY, 'accepted')
  isVisible.value = false
}

function declineCookies() {
  localStorage.setItem(COOKIE_KEY, 'declined')
  isVisible.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div 
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <div class="max-w-4xl mx-auto bg-[#1a1a2e] border border-white/10 rounded-xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex-1">
            <h3 class="font-semibold text-white mb-1">🍪 Cookie Notice</h3>
            <p class="text-sm text-gray-400">
              We use cookies to analyze site traffic and improve your experience. 
              By clicking "Accept", you consent to our use of cookies.
            </p>
          </div>
          <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              @click="declineCookies"
              class="flex-1 sm:flex-none px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            >
              Decline
            </button>
            <button
              @click="acceptCookies"
              class="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 rounded-lg transition-all shadow-lg"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>

