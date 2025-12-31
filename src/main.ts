import { createApp } from 'vue'
import LenisVue from 'lenis/vue'

import '@/style.css'
import App from './App.vue'

import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const app = createApp(App);

app.use(LenisVue)

app.mount('#app');
