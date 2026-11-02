export const aboutUniqueContent = {
  title: 'What Makes Cartinno Unique?',
  description:
    'Everything you need to grow, manage and run your online business with greater flexibility and control.'
}

export const aboutUniqueCards = [
  {
    id: 'growth',
    number: '01',
    title: 'Build for Growth',
    description:
      'Grow your business with unlimited products, powerful promotions, and tools built for success.'
  },
  {
    id: 'flexibility',
    number: '02',
    title: 'Unlimited Flexibility',
    description:
      'Scale your store with flexible product management and seamless integration with IPG providers.'
  },
  {
    id: 'control',
    number: '03',
    title: 'Complete Control',
    description:
      'Manage inventory, payments, and shipping options efficiently from one platform.'
  }
]

// Illustrative interface content only.
export const aboutUniqueDemo = {

  logo: `${import.meta.env.BASE_URL}/cartinno-logo.webp`,

  growth: {
    label: 'PRODUCT OVERVIEW',
    title: 'Your store, growing',
    products: [
      { name: 'Everyday essentials', status: 'In stock', quantity: '128' },
      { name: 'Featured collection', status: 'In stock', quantity: '64' },
      { name: 'New arrivals', status: 'In stock', quantity: '42' }
    ],
    totalLabel: 'Products in your store',
    total: '234'
  },

  flexibility: {
    label: 'PAYMENT INTEGRATIONS',
    title: 'Payment options',
    providers: ['Visa', 'Mastercard', 'IPG'],
    footer: 'Flexible payment connections'
  },

  control: {
    label: 'STORE OPERATIONS',
    inventory: [
      { name: 'Everyday essentials', status: 'In stock', quantity: '128' },
      { name: 'Featured collection', status: 'In stock', quantity: '64' },
      { name: 'New arrivals', status: 'In stock', quantity: '42' }
    ],
    payment: 'Payment options',
    shipping: 'Shipping options'
  }
}