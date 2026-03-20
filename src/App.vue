<script setup>
import { ref, computed } from 'vue'
import { useDeviceTilt } from './composables/useDeviceTilt'
import DesktopBlock from './components/DesktopBlock.vue'
import Landing from './components/Landing.vue'
import Permission from './components/Permission.vue'
import PortraitView from './components/PortraitView.vue'
import LandscapeView from './components/LandscapeView.vue'
import TouchTiltPad from './components/TouchTiltPad.vue'

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

function onPad({ x, y }) {
  setFallbackTilt(x, y)
}
</script>

<template>
  <div class="app-root">
    <DesktopBlock v-if="!isMobile" />

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
          <PortraitView :touch-fallback="touchFallback" />
        </div>
        <LandscapeView
          v-else
          class="stage-fill"
          :tilt-x="effectiveTiltX"
          :tilt-y="effectiveTiltY"
          :touch-fallback="touchFallback"
        />
        <TouchTiltPad
          v-if="touchFallback && phase === 'app'"
          :x="effectiveTiltX"
          :y="effectiveTiltY"
          class="tilt-dock"
          @update="onPad"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100svh;
  background: #0f0f0f;
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
</style>
