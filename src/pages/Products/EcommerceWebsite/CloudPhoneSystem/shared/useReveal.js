import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * One-time scroll reveal for a section.
 *  - ready  : JS is running and motion is allowed (CSS then hides content until it is revealed)
 *  - inView : the section has scrolled into view (plays the entrance + starts looping scenes)
 * With reduced motion (or no IntersectionObserver) nothing is hidden and everything is shown.
 */
export function useReveal(options = {}) {
  const root = ref(null)
  const ready = ref(false)
  const inView = ref(false)
  let io = null

  onMounted(() => {
    const el = root.value
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      inView.value = true
      return
    }

    ready.value = true
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true
          io.disconnect()
        }
      },
      { threshold: options.threshold ?? 0.12 }
    )
    io.observe(el)
  })

  onBeforeUnmount(() => io && io.disconnect())

  return { root, ready, inView }
}
