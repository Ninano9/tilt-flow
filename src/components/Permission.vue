<script setup>
defineProps({
  loading: { type: Boolean, default: false },
})
defineEmits(['grant', 'fallback'])
</script>

<template>
  <div class="permission">
    <div class="glass card">
      <p class="copy">
        기울기 기능을 사용하려면 권한이 필요합니다
      </p>
      <div class="actions">
        <button
          type="button"
          class="primary glow-pulse"
          :disabled="loading"
          @click="$emit('grant')"
        >
          {{ loading ? '처리 중…' : '시작하기' }}
        </button>
        <button type="button" class="ghost" @click="$emit('fallback')">
          터치로 조작하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.permission {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
}

.card {
  width: min(100%, 420px);
  padding: 40px 28px;
}

.copy {
  margin: 0 0 28px;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.primary {
  appearance: none;
  border: none;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  padding: 14px 24px;
  border-radius: 14px;
  color: #0a0a0a;
  background: linear-gradient(135deg, #38bdf8 0%, #8b5cf6 100%);
  box-shadow: 0 8px 28px rgba(56, 189, 248, 0.3);
  transition: transform 0.2s, opacity 0.2s;
}

.primary:disabled {
  opacity: 0.6;
  cursor: wait;
}

.primary:not(:disabled):active {
  transform: scale(0.98);
}

.ghost {
  appearance: none;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.65);
  transition: background 0.2s, border-color 0.2s;
}

.ghost:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
