<script setup>
import { ref, computed } from 'vue'
import { useDeviceTilt } from './composables/useDeviceTilt'
import Landing from './components/Landing.vue'
import Permission from './components/Permission.vue'
import PortraitView from './components/PortraitView.vue'
import LandscapeView from './components/LandscapeView.vue'

const phase = ref('landing')
const permLoading = ref(false)

const {
  effectiveTiltX,
  effectiveTiltY,
  isLandscape,
  touchFallback,
  requestAccess,
  enableTouchFallback,
  setFallbackTilt,
} = useDeviceTilt()

const isMobile = computed(() => {
  const q = new URLSearchParams(window.location.search)
  if (q.get('mobile') === '1') return true
  if (q.get('desktop') === '1') return false
  const ua = navigator.userAgent || ''
  const touch = navigator.maxTouchPoints > 0
  const mobileUa = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  return mobileUa || touch
})

async function onGrant() {
  permLoading.value = true
  await requestAccess()
  permLoading.value = false
  phase.value = 'app'
}

function onFallback() {
  enableTouchFallback()
  phase.value = 'app'
}

function onPadUpdate({ x, y }) {
  setFallbackTilt(x, y)
}

function onPadPointerDown(e) {
  e.currentTarget.setPointerCapture(e.pointerId)
  applyPadPointer(e)
}

function onPadPointerMove(e) {
  if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
  applyPadPointer(e)
}

function applyPadPointer(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const px = ((e.clientX - r.left) / r.width) * 2 - 1
  const py = ((e.clientY - r.top) / r.height) * 2 - 1
  onPadUpdate({ x: px * 30, y: py * 30 })
}
</script>

<template>
  <div class="app-root">
    <div v-if="!isMobile" class="desktop-block">
      <div class="glass card desktop-card">
        <h1 class="desktop-logo">TiltFlow</h1>
        <p class="desktop-msg">모바일에서 접속해주세요</p>
      </div>
    </div>

    <template v-else>
      <Landing v-if="phase === 'landing'" @start="phase = 'permission'" />
      <Permission
        v-else-if="phase === 'permission'"
        :loading="permLoading"
        @grant="onGrant"
        @fallback="onFallback"
      />
      <div v-else class="app-stage">
        <div v-if="!isLandscape" class="stage-fill">
          <PortraitView />
        </div>
        <LandscapeView
          v-else
          class="stage-fill"
          :tilt-x="effectiveTiltX"
          :tilt-y="effectiveTiltY"
        />
        <div
          v-if="touchFallback && phase === 'app'"
          class="tilt-dock"
        >
          <p class="pad-label">터치로 기울기 조절</p>
          <div
            class="pad"
            @pointerdown="onPadPointerDown"
            @pointermove="onPadPointerMove"
          >
            <div
              class="knob"
              :style="{
                left: `${50 + (effectiveTiltX / 30) * 42}%`,
                top: `${50 + (effectiveTiltY / 30) * 42}%`,
              }"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100svh;
  background: #0f0f0f;
}

.desktop-block {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
}

.desktop-card {
  max-width: 420px;
  text-align: center;
  padding: 40px 32px;
}

.desktop-logo {
  margin: 0 0 16px;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #5ee7ff 0%, #a78bfa 50%, #c084fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.desktop-msg {
  margin: 0;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.92);
}

.app-stage {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.stage-fill {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.tilt-dock {
  padding: 0 16px 16px;
  flex-shrink: 0;
}

.pad-label {
  margin: 0 0 8px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
}

.pad {
  position: relative;
  height: 120px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  touch-action: none;
  cursor: pointer;
  overflow: hidden;
}

.knob {
  position: absolute;
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff 0%, #38bdf8 40%, #8b5cf6 100%);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
  pointer-events: none;
  transition: left 0.05s ease-out, top 0.05s ease-out;
}
</style>
