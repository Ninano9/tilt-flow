import { ref, onMounted, onUnmounted } from 'vue'

/** @typedef {'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary' | 'unknown'} OrientationType */

function readOrientationType() {
  const t = screen.orientation?.type
  if (
    t === 'portrait-primary' ||
    t === 'portrait-secondary' ||
    t === 'landscape-primary' ||
    t === 'landscape-secondary'
  ) {
    return t
  }

  const portrait = window.matchMedia('(orientation: portrait)').matches
  const o = window.orientation

  if (portrait) {
    if (o === 180) return 'portrait-secondary'
    return 'portrait-primary'
  }

  if (o === 90 || o === -90) {
    return o === 90 ? 'landscape-primary' : 'landscape-secondary'
  }

  if (window.innerWidth > window.innerHeight) {
    return 'landscape-primary'
  }

  return 'portrait-primary'
}

export function useOrientationMode() {
  const orientationType = ref(/** @type {OrientationType} */ ('portrait-primary'))

  function sync() {
    orientationType.value = readOrientationType()
  }

  onMounted(() => {
    sync()
    screen.orientation?.addEventListener?.('change', sync)
    window.addEventListener('orientationchange', sync)
    window.addEventListener('resize', sync)
  })

  onUnmounted(() => {
    screen.orientation?.removeEventListener?.('change', sync)
    window.removeEventListener('orientationchange', sync)
    window.removeEventListener('resize', sync)
  })

  return { orientationType, syncOrientation: sync }
}
