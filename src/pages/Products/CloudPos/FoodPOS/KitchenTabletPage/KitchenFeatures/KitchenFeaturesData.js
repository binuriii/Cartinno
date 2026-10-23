export const kitchenContent = {
  heading: 'Everything your kitchen needs',
  subheading: 'to keep moving.',
  photo:
    'https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=2070&auto=format&fit=crop',
  photoAlt: 'Busy restaurant kitchen staff preparing food'
}

export const orderCards = [
  {
    id: 'table12',
    variant: 'back-top',
    name: 'Table 12 • Dine-in',
    description: '2x Margherita Pizza (Extra Basil), 1x Iced Latte',
    price: 'LKR 4,850',
    status: 'FIRED',
    time: '19:42',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    imageAlt: 'Pizza'
  },
  {
    id: 'delivery',
    variant: 'front',
    name: 'Delivery • Web Order',
    description: '1x Chicken Shawarma (No garlic sauce), 1x Fries',
    price: 'LKR 1,250',
    status: 'PREPARING',
    time: '19:48',
    badge: 'New Order',
    image:
      'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500&auto=format&fit=crop&q=80',
    imageAlt: 'Shawarma'
  },
  {
    id: 'pickup',
    variant: 'back-bottom',
    name: 'Pickup • Phone',
    description: '1x Smash Burger (Double patty, aged cheddar)',
    price: 'LKR 1,800',
    status: 'READY',
    time: '19:51',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    imageAlt: 'Burger'
  }
]

export const kitchenFeatures = [
  {
    number: '01',
    title: 'All order types in one place.',
    description:
      'Manage dine-in, delivery, takeaway, pickup, and catering from one till. Connect your front of house, online orders, and kitchen instantly.'
  },
  {
    number: '02',
    title: 'Built for fast kitchen workflows.',
    description:
      'Tickets fire themselves directly to the kitchen viewer with sound alerts, smoothly moving through preparing and ready stages.'
  },
  {
    number: '03',
    title: 'Nothing to install or maintain.',
    description:
      'Cartinno POS runs in the cloud. It works securely in any web browser on your existing desktops, tablets, or phones.'
  }
]

export const icons = {
  clock:
    '<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/>',
  check:
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',
  sparkles:
    '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'
}