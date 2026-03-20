<script setup>
import GravityCanvas from './GravityCanvas.vue'

defineProps({
  tiltX: { type: Number, default: 0 },
  tiltY: { type: Number, default: 0 },
  touchFallback: { type: Boolean, default: false },
})
</script>

<template>
  <div class="landscape">
    <header class="bar glass">
      <span class="tag">가로 · 인터랙션</span>
      <span v-if="touchFallback" class="pill">터치 모드</span>
    </header>
    <GravityCanvas :tilt-x="tiltX" :tilt-y="tiltY" />
    <p class="hint">기울여 보세요 — 공들이 중력처럼 굴러갑니다</p>
  </div>
</template>

<style scoped>
.landscape {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 12px 16px 20px;
  box-sizing: border-box;
  gap: 12px;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 16px;
}

.tag {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
}

.pill {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.15);
  color: #fcd34d;
  border: 1px solid rgba(251, 191, 36, 0.35);
}

.hint {
  margin: 0;
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}
</style>
