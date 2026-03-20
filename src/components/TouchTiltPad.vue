<script setup>
const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
})

const emit = defineEmits(['update'])

function onPointerDown(e) {
  e.currentTarget.setPointerCapture(e.pointerId)
  applyPointer(e)
}

function onPointerMove(e) {
  if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
  applyPointer(e)
}

function applyPointer(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const px = ((e.clientX - r.left) / r.width) * 2 - 1
  const py = ((e.clientY - r.top) / r.height) * 2 - 1
  emit('update', { x: px * 30, y: py * 30 })
}
</script>

<template>
  <div class="wrap">
    <p class="label">터치로 기울기 조절</p>
    <div
      class="pad"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
    >
      <div
        class="knob"
        :style="{
          left: `${50 + (x / 30) * 42}%`,
          top: `${50 + (y / 30) * 42}%`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  margin-top: auto;
  padding-top: 8px;
}

.label {
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
