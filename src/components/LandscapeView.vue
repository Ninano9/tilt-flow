<script setup>
import GravityCanvas from './GravityCanvas.vue'

defineProps({
  tiltX: { type: Number, default: 0 },
  tiltY: { type: Number, default: 0 },
})
</script>

<template>
  <div class="landscape">
    <GravityCanvas :tilt-x="tiltX" :tilt-y="tiltY" />
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
