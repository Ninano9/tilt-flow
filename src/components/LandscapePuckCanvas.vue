<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  tiltX: { type: Number, default: 0 },
  tiltY: { type: Number, default: 0 },
})

const root = ref(null)
const puck = ref({ x: 200, y: 200, vx: 0, vy: 0 })

const R = 26
const FRICTION = 0.988
const GRAVITY = 0.055
const BOUNCE = 0.82

let w = 400
let h = 280
let raf = 0
let sizeReady = false

const targets = ref([])

function measure() {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const nw = Math.max(220, rect.width)
  const nh = Math.max(200, rect.height)
  if (!sizeReady || nw !== w || nh !== h) {
    w = nw
    h = nh
    placeTargets()
    sizeReady = true
  }
}

function placeTargets() {
  const margin = 48
  targets.value = [
    { x: margin, y: margin, collected: false },
    { x: w - margin, y: margin, collected: false },
    { x: margin, y: h - margin, collected: false },
    { x: w - margin, y: h - margin, collected: false },
  ]
  puck.value.x = w * 0.5
  puck.value.y = h * 0.5
  puck.value.vx = 0
  puck.value.vy = 0
}

function step() {
  const p = puck.value
  p.vx += props.tiltX * GRAVITY
  p.vy += props.tiltY * GRAVITY
  p.vx *= FRICTION
  p.vy *= FRICTION

  for (const t of targets.value) {
    if (t.collected) continue
    const dx = t.x - p.x
    const dy = t.y - p.y
    const d = Math.hypot(dx, dy) || 0.001
    if (d < 120) {
      const pull = 0.018 * (1 - d / 120)
      p.vx += (dx / d) * pull
      p.vy += (dy / d) * pull
    }
    if (d < R + 10) {
      t.collected = true
    }
  }

  p.x += p.vx
  p.y += p.vy

  const cx = w * 0.5
  const cy = h * 0.5
  const holeR = 56
  const dxo = p.x - cx
  const dyo = p.y - cy
  const distO = Math.hypot(dxo, dyo)
  if (distO < holeR + R && distO > 0.001) {
    const nx = dxo / distO
    const ny = dyo / distO
    const overlap = holeR + R - distO
    p.x += nx * overlap * 0.5
    p.y += ny * overlap * 0.5
    const vn = p.vx * nx + p.vy * ny
    if (vn < 0) {
      p.vx -= 1.85 * vn * nx
      p.vy -= 1.85 * vn * ny
    }
  }

  if (p.x < R) {
    p.x = R
    p.vx *= -BOUNCE
  } else if (p.x > w - R) {
    p.x = w - R
    p.vx *= -BOUNCE
  }
  if (p.y < R) {
    p.y = R
    p.vy *= -BOUNCE
  } else if (p.y > h - R) {
    p.y = h - R
    p.vy *= -BOUNCE
  }

  raf = requestAnimationFrame(step)
}

let ro

onMounted(() => {
  measure()
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
  <div class="puck-wrap">
    <p class="badge">가로 B · 퍽과 링</p>
    <p class="sub">모서리 네 점을 퍽으로 밀어 스쳐 지나가 보세요. 가운데 링은 튕겨 나옵니다.</p>
    <div ref="root" class="puck-canvas">
      <div class="obstacle-ring" />
      <div
        v-for="(t, i) in targets"
        :key="i"
        class="target"
        :class="{ done: t.collected }"
        :style="{ left: `${t.x}px`, top: `${t.y}px` }"
      />
      <div
        class="puck"
        :style="{
          left: `${puck.x - R}px`,
          top: `${puck.y - R}px`,
          width: `${R * 2}px`,
          height: `${R * 2}px`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.puck-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 12px 16px 16px;
  box-sizing: border-box;
  gap: 8px;
}

.badge {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #4ade80;
}

.sub {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.42);
}

.puck-canvas {
  position: relative;
  flex: 1;
  min-height: 200px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(
    145deg,
    rgba(12, 28, 22, 0.95) 0%,
    rgba(15, 15, 20, 0.98) 50%,
    rgba(10, 30, 24, 0.92) 100%
  );
  border: 1px solid rgba(74, 222, 128, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 12px 40px rgba(0, 0, 0, 0.45);
}

.obstacle-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 112px;
  height: 112px;
  margin: -56px 0 0 -56px;
  border-radius: 50%;
  border: 3px solid rgba(74, 222, 128, 0.35);
  box-shadow:
    0 0 20px rgba(74, 222, 128, 0.2),
    inset 0 0 20px rgba(74, 222, 128, 0.08);
  pointer-events: none;
}

.target {
  position: absolute;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-radius: 50%;
  border: 2px solid rgba(250, 204, 21, 0.85);
  background: rgba(250, 204, 21, 0.2);
  box-shadow: 0 0 14px rgba(250, 204, 21, 0.45);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.target.done {
  opacity: 0.2;
  transform: scale(0.6);
  border-color: rgba(255, 255, 255, 0.2);
}

.puck {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.5), #22c55e 40%, #15803d);
  box-shadow:
    0 0 24px rgba(34, 197, 94, 0.55),
    inset 0 0 12px rgba(255, 255, 255, 0.2);
  pointer-events: none;
  will-change: left, top;
}
</style>
