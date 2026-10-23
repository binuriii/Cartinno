
export const cloudPOSHowItWorksContent = {
  title1: 'Connect Your Business.',
  description:
    'Three connected steps take Cartinno from setup to one clear view of your sales, stock, and customers.'
}

export const cloudPOSHowItWorksSteps = [
  {
    id: 1,
    number: '01',
    label: 'PRODUCT SETUP',
    title: 'Set Up Your Cloud POS',
    description:
      'Get your Cartinno Cloud POS ready with your products, pricing, and business settings — a connected foundation for your daily operations.',
    visual: 'products'
  },
  {
    id: 2,
    number: '02',
    label: 'CONNECTED SELLING',
    title: 'Start Selling Everywhere',
    description:
      'Process in-store purchases and manage online orders while keeping your sales, customer information, and inventory connected.',
    visual: 'orders'
  },
  {
    id: 3,
    number: '03',
    label: 'BUSINESS GROWTH',
    title: 'Track, Manage & Grow',
    description:
      'Monitor sales performance, manage stock levels, and gain useful business insights through connected reports as your business grows.',
    visual: 'timeline'
  }
]

export const cloudPOSDemoProducts = [
  {
    id: 1,
    name: 'Studio Headphones',
    description: 'Wireless over-ear headphones',
    price: '$189.00',
    badge: 'Popular',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=85'
  },
  {
    id: 2,
    name: 'Classic Watch',
    description: 'Minimal everyday timepiece',
    price: '$149.00',
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=85'
  },
  {
    id: 3,
    name: 'Everyday Backpack',
    description: 'Lightweight travel essential',
    price: '$94.00',
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=85'
  }
]

export const cloudPOSDemoOrders = [
  {
    id: 1,
    productId: 1,
    order: '#1042',
    channel: 'In-store sale',
    price: '$189.00',
    status: 'Paid'
  },
  {
    id: 2,
    productId: 2,
    order: '#1043',
    channel: 'Online store',
    price: '$149.00',
    status: 'Paid'
  },
  {
    id: 3,
    productId: 3,
    order: '#1044',
    channel: 'Marketplace',
    price: '$94.00',
    status: 'Processing'
  }
]

export const cloudPOSActivityTimeline = [
  {
    id: 1,
    title: 'Sale completed',
    description: 'In-store purchase recorded',
    icon: 'fa-solid fa-check',
    color: 'green'
  },
  {
    id: 2,
    title: 'Inventory updated',
    description: 'Stock levels synchronized',
    icon: 'fa-solid fa-box',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Sales report updated',
    description: 'Business performance refreshed',
    icon: 'fa-solid fa-chart-line',
    color: 'purple'
  },
  {
    id: 4,
    title: 'Stock notification',
    description: 'A product needs attention',
    icon: 'fa-solid fa-bell',
    color: 'orange'
  }
]
