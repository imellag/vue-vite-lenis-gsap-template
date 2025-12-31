<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative bg-white">
    <h1 class="headline text-3xl md:text-5xl font-bold text-center px-4">
      Vue + Vite + GSAP + Lenis + TailwindCSS
    </h1>

    <div class="mt-8 flex flex-col items-center gap-2 text-sm text-gray-600" aria-hidden="true">
      <span>Scroll down</span>
      <svg class="arrow w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9l6 6 6-6"></path>
      </svg>
    </div>
  </div>

  <main>
    <section v-for="n in 2" :key="n" class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-2xl text-center p-6">
        <h2 class="text-2xl font-semibold mb-4">Content section {{ n }}</h2>
        <p class="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
        </p>
      </div>
    </section>

    <section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-600 to-indigo-800 relative overflow-hidden">
      <div class="text-center text-white z-10">
        <h2 class="text-3xl font-bold mb-2">All set!</h2>
        <p class="mb-6">Now it's your turn: delete this file when you're ready to start your project.</p>
      </div>

      <ConfettiCanvas class="absolute inset-0 z-0 pointer-events-none" />
    </section>
  </main>
</template>

<script setup lang="ts">
import ConfettiCanvas from './ConfettiCanvas.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'

let split: any = null
let charsTween: gsap.core.Timeline | null = null
let arrowTween: gsap.core.Tween | null = null

onMounted(() => {
  split = new (SplitText as any)('.headline', { type: 'chars' })
  const chars = split.chars as HTMLElement[]
  charsTween = gsap.timeline()
    .from(chars, {
      y: 40,
      opacity: 0,
      stagger: 0.02,
      ease: 'power3.out',
      duration: 0.6
    })

  arrowTween = gsap.to('.arrow', {
    y: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    duration: 0.8
  })
})

onBeforeUnmount(() => {
  if (split && typeof split.revert === 'function') split.revert()
  charsTween?.kill()
  arrowTween?.kill()
})
</script>

<style scoped>
.confetti-root { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.confetti {
  will-change: transform, opacity;
  mix-blend-mode: normal;
}
</style>