import { ref, computed, onMounted, onUnmounted } from 'vue'

const CLAMP = 30
const SMOOTH_PREV = 0.8
const SMOOTH_CUR = 0.2

function clamp(n, min = -CLAMP, max = CLAMP) {
  return Math.min(max, Math.max(min, n))
}

function smooth(prev, cur) {
  return prev * SMOOTH_PREV + cur * SMOOTH_CUR
}

export function useDeviceTilt() {
  const rawGamma = ref(0)
  const rawBeta = ref(0)
  const tiltX = ref(0)
  const tiltY = ref(0)
  const isLandscape = ref(false)
  const permissionGranted = ref(false)
  const permissionDenied = ref(false)
  const listening = ref(false)
  const touchFallback = ref(false)

  const fallbackX = ref(0)
  const fallbackY = ref(0)

  const effectiveTiltX = computed(() =>
    touchFallback.value ? fallbackX.value : tiltX.value
  )
  const effectiveTiltY = computed(() =>
    touchFallback.value ? fallbackY.value : tiltY.value
  )

  let raf = 0
  const needsUpdate = ref(false)

  function updateOrientation() {
    isLandscape.value = window.innerWidth > window.innerHeight
  }

  function onOrientation(e) {
    if (e.gamma == null || e.beta == null) return
    rawGamma.value = e.gamma
    rawBeta.value = e.beta
    needsUpdate.value = true
  }

  function tick() {
    if (needsUpdate.value && permissionGranted.value && !touchFallback.value) {
      const gx = clamp(rawGamma.value * 0.35)
      const gy = clamp((rawBeta.value - 45) * 0.25)
      tiltX.value = smooth(tiltX.value, gx)
      tiltY.value = smooth(tiltY.value, gy)
      needsUpdate.value = false
    }
    raf = requestAnimationFrame(tick)
  }

  async function requestAccess() {
    permissionDenied.value = false
    touchFallback.value = false

    if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
      try {
        const res = await DeviceOrientationEvent.requestPermission()
        if (res !== 'granted') {
          permissionDenied.value = true
          touchFallback.value = true
          return false
        }
      } catch {
        permissionDenied.value = true
        touchFallback.value = true
        return false
      }
    }

    permissionGranted.value = true
    if (!listening.value) {
      window.addEventListener('deviceorientation', onOrientation, true)
      listening.value = true
    }
    return true
  }

  function enableTouchFallback() {
    touchFallback.value = true
    permissionDenied.value = true
    permissionGranted.value = false
  }

  function setFallbackTilt(x, y) {
    fallbackX.value = clamp(x)
    fallbackY.value = clamp(y)
  }

  function stopListening() {
    window.removeEventListener('deviceorientation', onOrientation, true)
    listening.value = false
  }

  onMounted(() => {
    updateOrientation()
    window.addEventListener('resize', updateOrientation)
    raf = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateOrientation)
    stopListening()
    if (raf) cancelAnimationFrame(raf)
    raf = 0
  })

  return {
    tiltX,
    tiltY,
    effectiveTiltX,
    effectiveTiltY,
    isLandscape,
    permissionGranted,
    permissionDenied,
    touchFallback,
    requestAccess,
    enableTouchFallback,
    setFallbackTilt,
    updateOrientation,
  }
}
