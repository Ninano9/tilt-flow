<script setup>
import GravityCanvas from './GravityCanvas.vue'
import LandscapePuckCanvas from './LandscapePuckCanvas.vue'

defineProps({
  tiltX: { type: Number, default: 0 },
  tiltY: { type: Number, default: 0 },
  /** 'balls' = 가로 A(왼쪽/primary), 'puck' = 가로 B(오른쪽/secondary) — 기기마다 primary/secondary가 바뀔 수 있음 */
  variant: { type: String, default: 'balls' },
})
</script>

<template>
  <div class="landscape">
    <GravityCanvas
      v-if="variant === 'balls'"
      badge="가로 A · 네온 볼"
      :tilt-x="tiltX"
      :tilt-y="tiltY"
    />
    <LandscapePuckCanvas
      v-else
      :tilt-x="tiltX"
      :tilt-y="tiltY"
    />
  </div>
</template>

<style scoped>
.landscape {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
}
</style>
