<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  tiltX: { type: Number, default: 0 },
  tiltY: { type: Number, default: 0 },
})

const root = ref(null)
const motes = ref([])

const N = 14
const FRICTION = 0.982
const GRAVITY = 0.038
const BOUNCE = 0.78
const R = 9

let w = 300
let h = 360
let raf = 0

function init() {
  const list = []
  const colors = ['#fb923c', '#f472b6', '#fbbf24', '#f87171', '#c084fc']
  for (let i = 0; i < N; i++) {
    list.push({
      x: Math.random() * (w - 40) + 20,
      y: Math.random() * (h - 40) + 20,
      vx: 0,
      vy: 0,
      c: colors[i % colors.length],
    })
  }
  motes.value = list
}

function measure() {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  w = Math.max(180, r.width)
  h = Math.max(200, r.height)
}

function step() {
  const ax = -props.tiltX * GRAVITY
  const ay = -props.tiltY * GRAVITY

  for (const m of motes.value) {
    m.vx += ax
    m.vy += ay
    m.vx *= FRICTION
    m.vy *= FRICTION
    m.x += m.vx
    m.y += m.vy

    if (m.x < R) {
      m.x = R
      m.vx *= -BOUNCE
    } else if (m.x > w - R) {
      m.x = w - R
      m.vx *= -BOUNCE
    }
    if (m.y < R) {
      m.y = R
      m.vy *= -BOUNCE
    } else if (m.y > h - R) {
      m.y = h - R
      m.vy *= -BOUNCE
    }
  }

  raf = requestAnimationFrame(step)
}

let ro

onMounted(() => {
  measure()
  init()
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
  <div class="inv-root">
    <div class="glass panel">
      <p class="badge">거꾸로 세로 · 역중력</p>
      <h2 class="title">기울기가 반대로 먹혀요</h2>
      <p class="hint">조각들이 예상과 반대로 미끄러집니다</p>
      <div ref="root" class="flow">
        <div
          v-for="(m, i) in motes"
          :key="i"
          class="mote"
          :style="{
            left: `${m.x - R}px`,
            top: `${m.y - R}px`,
            width: `${R * 2}px`,
            height: `${R * 2}px`,
            background: `linear-gradient(145deg, rgba(255,255,255,0.35), ${m.c})`,
            boxShadow: `0 0 12px ${m.c}99`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.inv-root {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.panel {
  width: min(100%, 400px);
  padding: 28px 22px 24px;
  text-align: center;
}

.badge {
  margin: 0 0 10px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fb923c;
}

.title {
  margin: 0 0 8px;
  font-size: 1.35rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.hint {
  margin: 0 0 18px;
  font-size: 0.82rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.45);
}

.flow {
  position: relative;
  height: min(48vw, 240px);
  max-height: 300px;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(60, 20, 30, 0.5) 0%,
    rgba(15, 12, 18, 0.98) 45%,
    rgba(25, 15, 40, 0.9) 100%
  );
  border: 1px solid rgba(251, 146, 60, 0.2);
  box-shadow: inset 0 0 40px rgba(244, 114, 182, 0.08);
}

.mote {
  position: absolute;
  border-radius: 6px;
  pointer-events: none;
  will-change: left, top;
}
</style>
