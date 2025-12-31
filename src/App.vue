<script setup lang="ts">
import Demo from '@/components/Demo.vue';

import { VueLenis, useLenis } from 'lenis/vue'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenisOptions = {
  // lenis options (optional)
}

useLenis((lenis) => {
  // called every scroll
  console.log(lenis)
})
</script>

<template>
  <VueLenis root :options="lenisOptions" />
  <Demo />
</template>
