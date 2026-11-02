const base = import.meta.env.BASE_URL

export const appBenefitsBrand = {
  name: 'Cartinno',
  logo: `${base}cartinno-logo.webp`
}

export const appBenefitsContent = {
  title: 'Efficient Routing. Real-Time Tracking. Happy Customers.',
  description:
    'Connect your kitchen, drivers, and customers through a seamless delivery ecosystem that ensures every order arrives on time.'
}

export const appBenefits = {
  main: {
    label: 'Live Fleet Management',
    title: 'Stay connected with your drivers, wherever they are.',
    description:
      'Monitor your entire delivery fleet in real-time, track exact locations, and ensure smooth operations from start to finish.'
  },

  promotions: {
    label: 'Smart Dispatch',
    title: 'Assign the right driver at the right moment.',
    description:
      'Optimize delivery routes automatically and dispatch orders to the nearest available driver instantly.'
  },

  purchases: {
    label: 'Customer Tracking',
    title: 'Give customers complete visibility.',
    description:
      'Keep your customers happy with live map tracking, ETA updates, and instant status notifications.'
  }
}

export const notificationExamples = [
  {
    id: 1,
    title: 'Order #1042 Picked Up',
    message: 'Driver John is on the way to the customer.',
    time: 'Now',
    icon: 'fa-solid fa-motorcycle'
  },
  {
    id: 2,
    title: 'Delivery Completed',
    message: 'Order #1040 was successfully delivered.',
    time: '2m',
    icon: 'fa-solid fa-check-double'
  },
  {
    id: 3,
    title: 'New Order Ready',
    message: 'Kitchen has finished preparing Order #1045.',
    time: '5m',
    icon: 'fa-solid fa-utensils'
  }
]

export const promotionPreview = {
  campaign: 'Order #1048 Dispatch',
  audience: 'Downtown Area',
  message: 'New Delivery Assigned to You!',
  offer: 'READY',
  subtitle: 'Pickup at Kitchen A',
  status: 'Awaiting Driver'
}

export const repeatPurchasePreview = {
  eyebrow: 'LIVE TRACKING',
  title: 'Your food is arriving soon.',
  description:
    'Track your order live on the map and get ready to enjoy your meal.',
  button: 'Track Order',
  notificationTitle: 'Driver Approaching!',
  notificationMessage: 'Your driver is just 2 minutes away.',
  productImage:
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&auto=format&fit=crop&q=80' // Map/Navigation image
}