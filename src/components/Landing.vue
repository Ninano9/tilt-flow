<script setup>
defineEmits(['start'])
</script>

<template>
  <div class="landing">
    <div class="glass card">
      <h1 class="title">TiltFlow</h1>
      <p class="subtitle">폰을 기울여서 새로운 경험을 해보세요</p>
      <button type="button" class="cta glow-pulse" @click="$emit('start')">
        시작하기
      </button>
    </div>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
}

.card {
  width: min(100%, 400px);
  text-align: center;
  padding: 48px 28px;
}

.title {
  margin: 0 0 16px;
  font-size: clamp(2rem, 6vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #22d3ee 0%, #818cf8 45%, #e879f9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 24px rgba(34, 211, 238, 0.35));
}

.subtitle {
  margin: 0 0 36px;
  font-size: 1rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.55);
}

.cta {
  appearance: none;
  border: none;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  font-size: 1rem;
  padding: 16px 40px;
  border-radius: 999px;
  color: #0f0f0f;
  background: linear-gradient(135deg, #67e8f9 0%, #a5b4fc 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.12) inset,
    0 8px 32px rgba(103, 232, 249, 0.35);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
}

.cta:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.18) inset,
    0 12px 40px rgba(165, 180, 252, 0.45);
}

.cta:active {
  transform: scale(0.98);
}
</style>
