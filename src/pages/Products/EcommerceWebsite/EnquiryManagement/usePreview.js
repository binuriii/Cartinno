import { ref, onMounted, onUnmounted } from 'vue'
export function usePreview(count, delay = 4200) {
  const active = ref(0), paused = ref(false), target = ref(null)
  let timer, observer, visible = false, media
  const next = () => { active.value = (active.value + 1) % count }
  function preference() { paused.value = media.matches }
  onMounted(() => {
    media = window.matchMedia('(prefers-reduced-motion: reduce)')
    preference(); media.addEventListener('change', preference)
    observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting })
    if (target.value) observer.observe(target.value)
    timer = window.setInterval(() => { if (visible && !paused.value && !document.hidden) next() }, delay)
  })
  onUnmounted(() => { clearInterval(timer); observer?.disconnect(); media?.removeEventListener('change', preference) })
  return { active, paused, target, next }
}
