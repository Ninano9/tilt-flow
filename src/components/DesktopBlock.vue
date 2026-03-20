<script setup>
defineProps({
  title: { type: String, default: 'TiltFlow' },
})
</script>

<template>
  <div class="desktop-block">
    <div class="glass card">
      <h1 class="logo">{{ title }}</h1>
      <p class="msg">모바일에서 접속해주세요</p>
      <p class="hint">기울기 센서는 스마트폰 브라우저에서만 동작합니다.</p>
    </div>
  </div>
</template>

<style scoped>
.desktop-block {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
}

.card {
  max-width: 420px;
  text-align: center;
  padding: 40px 32px;
}

.logo {
  margin: 0 0 16px;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #5ee7ff 0%, #a78bfa 50%, #c084fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.msg {
  margin: 0 0 12px;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.92);
}

.hint {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.45);
}
</style>
