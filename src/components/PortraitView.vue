<script setup>
defineProps({
  touchFallback: { type: Boolean, default: false },
})
</script>

<template>
  <div class="portrait">
    <div class="glass panel">
      <span class="badge">세로 모드</span>
      <h2 class="title">메뉴</h2>
      <p class="lead">
        폰을 <strong>가로</strong>로 돌리면 인터랙션 체험 화면으로 전환됩니다.
      </p>
      <ul class="tips">
        <li>기울기에 따라 오브젝트가 움직여요</li>
        <li v-if="touchFallback">터치 패드로 기울기를 대신 조절할 수 있어요</li>
      </ul>
      <div class="rotate-hint" aria-hidden="true">
        <span class="phone" />
        <span class="arrow">↻</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portrait {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.panel {
  width: min(100%, 380px);
  padding: 32px 24px;
}

.badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.15);
  color: #67e8f9;
  border: 1px solid rgba(56, 189, 248, 0.35);
  margin-bottom: 16px;
}

.title {
  margin: 0 0 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.lead {
  margin: 0 0 16px;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.55);
}

.lead strong {
  color: #a5b4fc;
  font-weight: 600;
}

.tips {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.45);
}

.rotate-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
  opacity: 0.5;
}

.phone {
  width: 36px;
  height: 64px;
  border-radius: 8px;
  border: 2px solid rgba(167, 139, 250, 0.6);
  box-shadow: 0 0 16px rgba(167, 139, 250, 0.25);
}

.arrow {
  font-size: 1.5rem;
  color: #a78bfa;
  animation: wobble 2s ease-in-out infinite;
}

@keyframes wobble {
  0%,
  100% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
}
</style>
