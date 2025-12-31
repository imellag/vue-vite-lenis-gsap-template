<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vrot: number
  w: number
  h: number
  color: string
  ttl?: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let particles: Particle[] = []
const colors = ['#F87171','#FBBF24','#34D399','#60A5FA','#A78BFA','#F472B6']

function rand(min = 0, max = 1) { return Math.random() * (max - min) + min }

function resizeCanvas() {
  const c = canvas.value
  if (!c) return
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const w = c.clientWidth
  const h = c.clientHeight
  c.width = Math.floor(w * dpr)
  c.height = Math.floor(h * dpr)
  ctx = c.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
}

function createParticles(count = 100) {
  const c = canvas.value
  if (!c) return
  const rect = c.getBoundingClientRect()
  for (let i = 0; i < count; i++) {
    const w = Math.round(rand(6, 14))
    const h = Math.round(w * rand(0.6, 1.4))
    particles.push({
      x: rand(0, rect.width),
      y: -rand(0, rect.height * 0.6),
      vx: rand(-60, 60),
      vy: rand(80, 260),
      rot: rand(0, 360),
      vrot: rand(-360, 360),
      w, h,
      color: colors[Math.floor(rand(0, colors.length))]!
    })
  }
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number) {
  const rr = Math.min(r, w/2, h/2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
  ctx.fill()
}

let last = performance.now()
function loop(now = performance.now()) {
  const c = canvas.value
  if (!c || !ctx) return
  const dt = (now - last) / 1000
  last = now

  ctx.clearRect(0, 0, c.width, c.height)
  const rect = c.getBoundingClientRect()

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    if (!p) continue
    p.x += p.vx * dt
    p.y += p.vy * dt
    p.rot += p.vrot * dt

    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rot * Math.PI) / 180)
    ctx.fillStyle = p.color
    drawRoundedRect(ctx, -p.w/2, -p.h/2, p.w, p.h, Math.max(1, p.w * 0.25))
    ctx.restore()

    if (p.y > rect.height + 200) {
      p.x = rand(0, rect.width)
      p.y = -rand(20, 120)
      p.vx = rand(-60, 60)
      p.vy = rand(80, 260)
      p.rot = rand(0, 360)
      p.vrot = rand(-360, 360)
      p.w = Math.round(rand(6, 14))
      p.h = Math.round(p.w * rand(0.6, 1.4))
      p.color = colors[Math.floor(rand(0, colors.length))]!
    }
  }

  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  resizeCanvas()
  createParticles(120)
  last = performance.now()
  raf = requestAnimationFrame(loop)
  window.addEventListener('resize', resizeCanvas)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resizeCanvas)
  particles = []
})
</script>

<template>
  <canvas ref="canvas" class="w-full h-full absolute inset-0 pointer-events-none"></canvas>
</template>

<style scoped>
canvas { display:block; }
</style>