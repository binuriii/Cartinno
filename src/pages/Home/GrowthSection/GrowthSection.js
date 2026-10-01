import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

const BASE = import.meta.env.BASE_URL // '/Cartinno/' in build, '/' in dev

// prefix local public/ files with the base; leave full URLs alone
const asset = (path) =>
  /^(https?:)?\/\//.test(path) ? path : BASE + path.replace(/^\//, '')

export function useGrowthSection() {
  const DUR = 4200

  const root = ref(null)
  const entered = ref([false, false, false])
  const tick = ref(0)

  let panels = []
  let stack = null
  let observer = null
  let resizeObserver = null
  let motionQuery = null
  let timer = null

  let scrollFrame = 0
  let layoutFrame = 0

  let reduced = false
  let stackEnabled = false

  let stackTop = 104
  let stackPeek = 24

  const cards = [
    {
      title: 'Start earning with the Cartinno reseller programme',
      text: 'Sell vendor accounts as a Website Reseller, or run your own store as a Product Reseller. Set your own prices and manage everything from your reseller panel.',
      cta: 'Become a reseller',
      route: '/get-started'
    },
    {
      title: 'Simple subscription plans that grow with you',
      text: 'Pick Beginner, Developer, Corporate or Enterprise. Every plan includes your own domain with free SSL, and you can pay monthly or yearly.',
      cta: 'View pricing',
      route: '/pricing'
    },
    {
      title: 'Every feature you need to run your store',
      text: 'Your own domain, product catalogue, staff accounts, B2B and wholesale selling, and billing in LKR or USD, all in one dashboard.',
      cta: 'Explore features',
      route: '/products'
    }
  ]

  const icons = {
    users:
      'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    store:
      'M3 9l1.5-5h15L21 9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8M10 20v-5h4v5',
    tag:
      'M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01',
    chart:
      'M3 3v18h18M7 15l4-4 3 3 5-6',
    building:
      'M4 21V5l8-3 8 3v16M9 21v-5h6v5M9 8h.01M15 8h.01M9 12h.01M15 12h.01',
    globe:
      'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',
    shield:
      'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zM9 12l2 2 4-4',
    box:
      'M21 8l-9-5-9 5v8l9 5 9-5zM3.3 7.5L12 12.5l8.7-5M12 22V12.5',
    briefcase:
      'M3 7h18v13H3zM8 7V4h8v3M3 13h18'
  }

  const stories = [
    [
      {
        video: asset('/gemini_generated_video_8d37cebe.mp4'),
        poster:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=86',
        position: 'center center',
        icon: 'users',
        t1: 'Sell vendor accounts.',
        t2: 'Set your own prices.'
      },
      {
        video: 'https://www.pexels.com/download/video/6994693/',
        poster:
          'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1200&q=86',
        position: 'center 42%',
        icon: 'store',
        t1: 'Launch your own store.',
        t2: 'Sell from top vendors.'
      }
    ],

    [
      {
        video: 'https://www.pexels.com/download/video/6898014/',
        poster:
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=86',
        position: 'center center',
        icon: 'tag',
        t1: 'Beginner.',
        t2: 'For new stores & small sellers.'
      },
      {
        video: 'https://www.pexels.com/download/video/6956725/',
        poster:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=86',
        position: 'center center',
        icon: 'chart',
        t1: 'Developer.',
        t2: 'For growing eCommerce teams.'
      },
      {
        video: 'https://www.pexels.com/download/video/7643442/',
        poster:
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=86',
        position: 'center 45%',
        icon: 'building',
        t1: 'Corporate.',
        t2: 'For high-volume businesses.'
      },
      {
        video: 'https://www.pexels.com/download/video/8348312/',
        poster:
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=86',
        position: 'center center',
        icon: 'globe',
        t1: 'Enterprise.',
        t2: 'Unlimited scale & operations.'
      }
    ],

    [
      {
        video: asset('/gemini_generated_video_7e79593b.mp4'),
        poster:
          'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=86',
        position: 'center center',
        icon: 'shield',
        t1: 'Your own domain.',
        t2: 'Free SSL included.'
      },
      {
        video: 'https://www.pexels.com/download/video/7568745/',
        poster:
          'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=86',
        position: 'center center',
        icon: 'box',
        t1: 'Every product',
        t2: 'in one catalogue.'
      },
      {
        video: 'https://www.pexels.com/download/video/5439031/',
        poster:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=86',
        position: 'center 44%',
        icon: 'users',
        t1: 'Your team, your roles.',
        t2: 'Add staff accounts.'
      },
      {
        video: 'https://www.pexels.com/download/video/7191371/',
        poster:
          'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=86',
        position: 'center center',
        icon: 'briefcase',
        t1: 'B2B + Wholesale.',
        t2: 'Sell to businesses too.'
      }
    ]
  ]

  const resellers = [
    {
      name: 'Website Reseller',
      tag: 'Build a vendor network',
      note: 'Set your own prices for the vendor accounts you sell.',
      steps: [
        'Join the reseller program.',
        'Access your reseller admin panel.',
        'Configure your vendor account selling prices.',
        'Sell vendor accounts to your customers.',
        'Manage and grow your vendor network.'
      ]
    },
    {
      name: 'Product Reseller',
      tag: 'Launch your own store',
      note: 'Earn a profit margin of up to 100%, subject to product pricing and costs.',
      steps: [
        'Join the reseller program.',
        'Receive your reseller website and admin panel.',
        'Select products from participating vendors.',
        'Configure your selling prices.',
        'Start selling through your website.'
      ]
    }
  ]

  const plans = [
    {
      name: 'Beginner',
      monthly: 5000,
      yearly: 50000,
      includes: [
        'Your own domain + Free SSL',
        'Products: 50',
        'Staff accounts: 1'
      ]
    },
    {
      name: 'Developer',
      monthly: 7500,
      yearly: 75000,
      includes: [
        'Your own domain + Free SSL',
        'Products: 500',
        'Staff accounts: 10'
      ]
    },
    {
      name: 'Corporate',
      monthly: 10000,
      yearly: 100000,
      includes: [
        'Your own domain + Free SSL',
        'Products: 5,000',
        'B2B + Wholesale: Yes'
      ]
    },
    {
      name: 'Enterprise',
      monthly: 15000,
      yearly: 150000,
      includes: [
        'Your own domain + Free SSL',
        'Products: Unlimited',
        'Staff accounts: Unlimited'
      ]
    }
  ]

  const features = [
    { title: 'Own domain', text: 'Free SSL included' },
    { title: 'Product catalogue', text: 'From 50 to unlimited' },
    { title: 'Staff accounts', text: 'From 1 to unlimited' },
    { title: 'B2B + Wholesale', text: 'Corporate and Enterprise' }
  ]

  const limits = [
    { name: 'Beginner', value: '50', width: 6 },
    { name: 'Developer', value: '500', width: 26 },
    { name: 'Corporate', value: '5,000', width: 60 },
    { name: 'Enterprise', value: 'Unlimited', width: 100 }
  ]

  function cur(card) {
    return tick.value % stories[card].length
  }

  const yearly = computed(() => {
    return Math.floor(tick.value / plans.length) % 2 === 1
  })

  function fmt(value) {
    return value.toLocaleString('en-US')
  }

  function price(plan) {
    return yearly.value ? plan.yearly : plan.monthly
  }

  function billing(plan) {
    if (yearly.value) {
      return `Billed yearly. You save Rs ${fmt(
        plan.monthly * 12 - plan.yearly
      )}.`
    }

    return 'Monthly plans have a one-time setup fee of Rs 15,000.'
  }

  function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value))
  }

  function syncVideos() {
    root.value
      ?.querySelectorAll('.gp-frame video')
      .forEach((video) => {
        const frame = video.closest('.gp-frame')

        const shouldPlay =
          !reduced && frame?.classList.contains('on')

        if (shouldPlay) {
          video.play?.().catch(() => {})
        } else {
          video.pause()
        }
      })
  }

  watch(tick, async () => {
    await nextTick()

    syncVideos()
  })

  function updateStack() {
    scrollFrame = 0

    if (!panels.length) {
      return
    }

    if (!stackEnabled) {
      panels.forEach((panel) => {
        panel.style.setProperty('--panel-scale', '1')
      })

      return
    }

    const positions = panels.map(
      (panel) => panel.getBoundingClientRect().top
    )

    const viewportHeight = window.innerHeight

    panels.forEach((panel, index) => {
      let coveredBy = 0

      for (let next = index + 1; next < panels.length; next++) {
        const nextStickyTop = stackTop + next * stackPeek

        const distance = Math.max(1, viewportHeight - nextStickyTop)

        coveredBy += clamp(
          (viewportHeight - positions[next]) / distance
        )
      }

      panel.style.setProperty(
        '--panel-scale',
        (1 - coveredBy * 0.04).toFixed(5)
      )
    })
  }

  function queueStack() {
    if (!scrollFrame) {
      scrollFrame = requestAnimationFrame(updateStack)
    }
  }

  function configureStack() {
    layoutFrame = 0

    if (!root.value || !stack || !panels.length) {
      return
    }

    const styles = getComputedStyle(root.value)

    const preferredTop =
      parseFloat(styles.getPropertyValue('--stack-top')) || 104

    stackPeek =
      parseFloat(styles.getPropertyValue('--stack-peek')) || 24

    const tallestPanel = Math.max(
      ...panels.map((panel) => panel.offsetHeight)
    )

    const visibleEdges = stackPeek * (panels.length - 1)

    const availableTop =
      window.innerHeight - tallestPanel - visibleEdges - 20

    stackEnabled =
      !reduced && window.innerWidth >= 1000 && availableTop >= 16

    stackTop = Math.min(preferredTop, Math.max(16, availableTop))

    panels.forEach((panel, index) => {
      panel.style.position = stackEnabled ? 'sticky' : 'relative'

      panel.style.top = stackEnabled
        ? `${stackTop + index * stackPeek}px`
        : 'auto'

      panel.style.zIndex = String(index + 1)

      panel.style.transformOrigin = 'center top'
    })

    /* IMPORTANT: NO EXTRA BOTTOM SPACE */
    stack.style.paddingBottom = '0px'

    queueStack()
  }

  function queueLayout() {
    if (!layoutFrame) {
      layoutFrame = requestAnimationFrame(configureStack)
    }
  }

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer)

      timer = null
    }
  }

  function startTimer() {
    stopTimer()

    if (reduced) {
      return
    }

    timer = setInterval(() => {
      if (document.hidden || !root.value) {
        return
      }

      const rect = root.value.getBoundingClientRect()

      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        tick.value++
      }
    }, DUR)
  }

  function setMotion() {
    reduced = motionQuery.matches

    if (reduced) {
      stopTimer()

      entered.value = [true, true, true]
    } else {
      startTimer()
    }

    syncVideos()

    queueLayout()
  }

  onMounted(() => {
    if (!root.value) {
      return
    }

    panels = Array.from(root.value.querySelectorAll('.growth-panel'))

    stack = root.value.querySelector('.growth-stack')

    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    setMotion()

    motionQuery.addEventListener('change', setMotion)

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (items) => {
          items.forEach((entry) => {
            if (!entry.isIntersecting) {
              return
            }

            const index = panels.indexOf(entry.target)

            if (index < 0) {
              return
            }

            entered.value[index] = true

            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.12 }
      )

      panels.forEach((panel) => observer.observe(panel))
    } else {
      entered.value = [true, true, true]
    }

    window.addEventListener('scroll', queueStack, { passive: true })

    window.addEventListener('resize', queueLayout)

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(queueLayout)

      panels.forEach((panel) => resizeObserver.observe(panel))
    }

    queueLayout()
  })

  onUnmounted(() => {
    observer?.disconnect()

    resizeObserver?.disconnect()

    stopTimer()

    cancelAnimationFrame(scrollFrame)

    cancelAnimationFrame(layoutFrame)

    motionQuery?.removeEventListener('change', setMotion)

    window.removeEventListener('scroll', queueStack)

    window.removeEventListener('resize', queueLayout)
  })

  return {
    DUR,
    root,
    entered,
    cards,
    stories,
    icons,
    resellers,
    plans,
    features,
    limits,
    cur,
    yearly,
    price,
    billing,
    fmt
  }
}