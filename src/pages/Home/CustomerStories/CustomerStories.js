import {
  onMounted,
  onUnmounted,
  ref
} from 'vue'

export function useCustomerStories() {
  const root = ref(null)
  const grid = ref(null)
  const progress = ref(0)

  let io = null
  let counter = null
  let frame = 0

  const customers = [
    {
      name: 'Nimal Perera',
      role: 'Retail Owner, Colombo',
      avatar:
        'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Sara Fernando',
      role: 'Café Owner',
      avatar:
        'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Ravi Kumar',
      role: 'Marketplace Founder',
      avatar:
        'https://randomuser.me/api/portraits/men/46.jpg'
    }
  ]

  const metrics = [
    {
      value: 1000,
      suffix: '+',
      label:
        'brands powered across retail, food and marketplaces'
    },
    {
      value: 365,
      suffix: '-day',
      label:
        'care and support, every day of the year'
    }
  ]

  const customerImage = {
    image: '/food-delivery.jpg',
    alt: 'Customer service at a checkout'
  }

  function fmt(metric) {
    return (
      Math
        .round(
          metric.value * progress.value
        )
        .toLocaleString('en-US')
      +
      metric.suffix
    )
  }

  function runCounter() {
    const start = performance.now()
    const duration = 1600

    const tick = (now) => {
      const t = Math.min(
        (now - start) / duration,
        1
      )

      progress.value =
        1 - Math.pow(1 - t, 3)

      if (t < 1) {
        frame =
          requestAnimationFrame(tick)
      }
    }

    frame =
      requestAnimationFrame(tick)
  }

  onMounted(() => {
    const elements =
      root.value
        ? root.value.querySelectorAll('[data-r]')
        : []

    const reducedMotion =
      window.matchMedia &&
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

    if (
      !('IntersectionObserver' in window) ||
      reducedMotion
    ) {
      elements.forEach((element) => {
        element.classList.add('in')
      })

      progress.value = 1

      return
    }

    io =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in')

              io.unobserve(
                entry.target
              )
            }
          })
        },
        {
          threshold: 0.15,
          rootMargin:
            '0px 0px -6% 0px'
        }
      )

    elements.forEach((element) => {
      io.observe(element)
    })

    counter =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0]?.isIntersecting
          ) {
            runCounter()
            counter.disconnect()
          }
        },
        {
          threshold: 0.25
        }
      )

    if (grid.value) {
      counter.observe(grid.value)
    }
  })

  onUnmounted(() => {
    if (io) {
      io.disconnect()
    }

    if (counter) {
      counter.disconnect()
    }

    cancelAnimationFrame(frame)
  })

  return {
    root,
    grid,
    metrics,
    customers,
    customerImage,
    fmt
  }
}