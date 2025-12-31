# Vue 3 + TypeScript + Vite + Lenis + GSAP + TailwindCSS

Minimal starter template combining:
- Vue 3 + TypeScript
- Vite (dev server & build)
- Lenis for smooth scrolling (Vue plugin)
- GSAP with ScrollTrigger & SplitText
- TailwindCSS for utility styles

Quickstart
1. Install:
   ```sh
   npm install
   ```
2. Run dev server:
   ```sh
   npm run dev
   ```
3. Build:
   ```sh
   npm run build
   ```

Contents / Key files
- `src/main.ts` — mounts the app and registers GSAP plugins (ScrollTrigger, SplitText) and Lenis plugin.
- `src/App.vue` — integrates `VueLenis` and shows `useLenis` usage.
- `src/components/Demo.vue` — demo page with headline animation, scroll hint and long content to test Lenis.
- `src/components/ConfettiCanvas.vue` — performant canvas-based confetti renderer used by the demo.
- `src/style.css` — Tailwind imports and global styles.
- `package.json`, `vite.config.ts`, `index.html` — scripts and build config.

How to use
- Start the dev server (`npm run dev`) and open the app in a browser.
- The demo includes long content so you can manually scroll and verify Lenis smoothing.
- Open the browser console to see `useLenis` logs on scroll (example usage in `src/App.vue`).
- Confetti animation runs on a single canvas for better performance (see `src/components/ConfettiCanvas.vue`).

That's it! Start from `src/components/Demo.vue` to experiment with Lenis + GSAP animations.
