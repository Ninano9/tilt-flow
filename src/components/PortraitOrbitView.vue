<script setup>
const props = defineProps({
  tiltX: { type: Number, default: 0 },
  tiltY: { type: Number, default: 0 },
})
</script>

<template>
  <div class="orbit-root">
    <div class="glass panel">
      <p class="badge">세로 · 오빗</p>
      <h2 class="title">기울이면 층이 밀려요</h2>
      <p class="hint">가로·거꾸로 세로로 넘어가면 다른 모드가 열려요</p>
      <div class="stage">
        <div
          class="glow back"
          :style="{
            transform: `translate3d(${tiltX * 0.25}px, ${tiltY * 0.25}px, 0) scale(1.1)`,
          }"
        />
        <div
          class="ring r3"
          :style="{
            transform: `translate3d(${tiltX * 0.35}px, ${tiltY * 0.35}px, 0) rotate(${tiltX * 0.4}deg)`,
          }"
        />
        <div
          class="ring r2"
          :style="{
            transform: `translate3d(${tiltX * 0.55}px, ${tiltY * 0.55}px, 0) rotate(${-tiltY * 0.35}deg)`,
          }"
        />
        <div
          class="core"
          :style="{
            transform: `translate3d(${tiltX * 0.85}px, ${tiltY * 0.85}px, 0)`,
          }"
        >
          <span class="core-label">Tilt</span>
        </div>
        <div
          class="satellite s1"
          :style="{
            transform: `translate3d(${tiltX * 1.1}px, ${tiltY * 0.7}px, 0)`,
          }"
        />
        <div
          class="satellite s2"
          :style="{
            transform: `translate3d(${tiltX * 0.65}px, ${tiltY * 1.05}px, 0)`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.orbit-root {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.panel {
  width: min(100%, 400px);
  padding: 28px 22px 32px;
  text-align: center;
}

.badge {
  margin: 0 0 10px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #67e8f9;
}

.title {
  margin: 0 0 8px;
  font-size: 1.35rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.hint {
  margin: 0 0 24px;
  font-size: 0.82rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.45);
}

.stage {
  position: relative;
  height: min(52vw, 260px);
  max-height: 320px;
  border-radius: 20px;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 40%, rgba(56, 189, 248, 0.12), transparent 55%),
    linear-gradient(165deg, rgba(20, 20, 28, 0.95), rgba(15, 15, 22, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glow,
.ring,
.core,
.satellite {
  position: absolute;
  transition: transform 0.08s ease-out;
  will-change: transform;
}

.glow.back {
  inset: -20%;
  background: radial-gradient(circle at 45% 45%, rgba(129, 140, 248, 0.35), transparent 60%);
  filter: blur(24px);
  pointer-events: none;
}

.ring {
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.12);
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  box-shadow: 0 0 24px rgba(34, 211, 238, 0.15);
}

.r3 {
  width: 78%;
  height: 78%;
  border-color: rgba(34, 211, 238, 0.25);
}

.r2 {
  width: 56%;
  height: 56%;
  border-color: rgba(167, 139, 250, 0.35);
}

.core {
  left: 50%;
  top: 50%;
  width: 72px;
  height: 72px;
  margin: -36px 0 0 -36px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.45), #22d3ee 42%, #6366f1);
  box-shadow:
    0 0 28px rgba(34, 211, 238, 0.55),
    inset 0 0 14px rgba(255, 255, 255, 0.2);
  display: grid;
  place-items: center;
}

.core-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(15, 15, 15, 0.85);
  text-transform: uppercase;
}

.satellite {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, #e879f9);
  box-shadow: 0 0 16px rgba(232, 121, 249, 0.65);
}

.s1 {
  left: 18%;
  top: 22%;
}

.s2 {
  right: 16%;
  bottom: 20%;
  left: auto;
  top: auto;
}
</style>
