
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
      value: 10,
      suffix: '%',
      label:
        'brands powered across retail, food and marketplaces',

      image:
        'https://images.unsplash.com/photo-1598880940017-f22eabf81a59?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzN3x8fGVufDB8fHx8fA%3D%3D'
    },
    {
      value: 365,
      suffix: '-day',
      label:
        'care and support, every day of the year',

      image:
        'https://images.unsplash.com/photo-1742737801357-dcd6449fa317?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8'
    }
  ]

  const customerImage = {
    image:
      'https://images.unsplash.com/photo-1626387753307-5a329fa44578?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Business using digital payment technology'
  }

  function fmt(metric) {
    return (
      Math.round(
        metric.value * progress.value
      ).toLocaleString('en-US') +
      metric.suffix
    )
  }

  function runCounter() {
    cancelAnimationFrame(frame)

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
        frame = requestAnimationFrame(tick)
      } else {
        progress.value = 1
      }
    }

    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    const elements = root.value
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

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -6% 0px'
      }
    )

    elements.forEach((element) => {
      io.observe(element)
    })

    counter = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runCounter()
          counter?.disconnect()
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
    io?.disconnect()
    counter?.disconnect()
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
