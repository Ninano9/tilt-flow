<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  tiltX: { type: Number, default: 0 },
  tiltY: { type: Number, default: 0 },
})

const root = ref(null)
const balls = ref([])

const N = 12
const FRICTION = 0.985
const GRAVITY = 0.045
const BOUNCE = 0.72
const RADIUS = 14

let w = 300
let h = 400
let raf = 0

function initBalls() {
  const list = []
  const palette = ['#22d3ee', '#818cf8', '#c084fc', '#e879f9', '#34d399', '#f472b6']
  for (let i = 0; i < N; i++) {
    list.push({
      x: Math.random() * (w - RADIUS * 4) + RADIUS * 2,
      y: Math.random() * (h - RADIUS * 4) + RADIUS * 2,
      vx: 0,
      vy: 0,
      r: RADIUS + Math.random() * 4,
      hue: palette[i % palette.length],
    })
  }
  balls.value = list
}

function measure() {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  w = Math.max(200, r.width)
  h = Math.max(200, r.height)
}

function step() {
  const ax = props.tiltX * GRAVITY
  const ay = props.tiltY * GRAVITY

  for (const b of balls.value) {
    b.vx += ax
    b.vy += ay
    b.vx *= FRICTION
    b.vy *= FRICTION
    b.x += b.vx
    b.y += b.vy

    if (b.x < b.r) {
      b.x = b.r
      b.vx *= -BOUNCE
    } else if (b.x > w - b.r) {
      b.x = w - b.r
      b.vx *= -BOUNCE
    }
    if (b.y < b.r) {
      b.y = b.r
      b.vy *= -BOUNCE
    } else if (b.y > h - b.r) {
      b.y = h - b.r
      b.vy *= -BOUNCE
    }
  }

  for (let i = 0; i < balls.value.length; i++) {
    for (let j = i + 1; j < balls.value.length; j++) {
      const a = balls.value[i]
      const b = balls.value[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.hypot(dx, dy) || 0.001
      const minD = a.r + b.r
      if (dist < minD) {
        const nx = dx / dist
        const ny = dy / dist
        const overlap = minD - dist
        const push = overlap * 0.5
        a.x -= nx * push
        a.y -= ny * push
        b.x += nx * push
        b.y += ny * push
        const dvx = b.vx - a.vx
        const dvy = b.vy - a.vy
        const rel = dvx * nx + dvy * ny
        if (rel < 0) {
          const impulse = rel * 0.85
          a.vx += impulse * nx
          a.vy += impulse * ny
          b.vx -= impulse * nx
          b.vy -= impulse * ny
        }
      }
    }
  }

  raf = requestAnimationFrame(step)
}

let ro

onMounted(() => {
  measure()
  initBalls()
  window.addEventListener('resize', measure)
  const el = root.value
  if (el && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => measure())
    ro.observe(el)
  }
  raf = requestAnimationFrame(step)
})

onUnmounted(() => {
  window.removeEventListener('resize', measure)
  ro?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="root" class="gravity-canvas">
    <div
      v-for="(b, i) in balls"
      :key="i"
      class="orb"
      :style="{
        left: `${b.x - b.r}px`,
        top: `${b.y - b.r}px`,
        width: `${b.r * 2}px`,
        height: `${b.r * 2}px`,
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), ${b.hue})`,
        boxShadow: `0 0 ${b.r * 1.2}px ${b.hue}88, inset 0 0 12px rgba(255,255,255,0.15)`,
      }"
    />
  </div>
</template>

<style scoped>
.gravity-canvas {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 220px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(
    160deg,
    rgba(15, 15, 15, 0.95) 0%,
    rgba(30, 27, 45, 0.6) 50%,
    rgba(15, 23, 42, 0.85) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 12px 40px rgba(0, 0, 0, 0.45);
}

.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: left, top;
}
</style>
