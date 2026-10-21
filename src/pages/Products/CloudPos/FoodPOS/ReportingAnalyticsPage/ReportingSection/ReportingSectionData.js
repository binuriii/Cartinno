export const reportingContent = {
  headingPart1: 'What you can see with',
  headingPart2: 'Cartinno reporting & analytics',

  cards: {
    top: {
      label: 'Full picture',
      title: 'Sales, order sources, top sellers, SEO, and more.',
      widget: {
        salesLabel: 'Overall sales',
        sales: 1234,
        salesChange: '11%',
        ordersLabel: 'Total orders',
        orders: 67,
        ordersChange: '8%',
        axisStart: '9AM',
        axisEnd: '9PM'
      }
    },
    bottomLeft: {
      label: 'Growth signals',
      title: 'Cartinno flags where you have room to grow and what to act on.',
      notification: {
        app: 'Cartinno',
        time: 'Just now',
        text: '3 menu items are missing pictures. Tap to add them now.'
      }
    },
    bottomRight: {
      label: 'On your phone',
      title: 'Stay on top of things from anywhere with the Cartinno mobile app.',
      phone: {
        time: '9:41',
        store: 'Miramar',
        sales: 1234,
        before: 'You’ve made',
        middle: 'today,',
        warn: '3 things',
        after: 'need your attention.',
        alerts: [
          { icon: 'fa-tag', text: '3 items out of stock' },
          { icon: 'fa-bag-shopping', text: 'Pickup is off' },
          { icon: 'fa-image', text: '3 items missing pictures' }
        ]
      }
    }
  }
}