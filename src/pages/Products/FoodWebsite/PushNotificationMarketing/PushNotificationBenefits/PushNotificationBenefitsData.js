
const base = import.meta.env.BASE_URL

export const pushNotificationBrand = {
  name: 'Cartinno',
  logo: `${base}cartinno-logo.webp`
}

export const pushNotificationBenefitsContent = {
  title: 'More Engagement. More Returns. More Opportunities.',
  description:
    'Connect with your customers through timely messages, engaging offers, and notifications that encourage them to come back.'
}

export const pushNotificationBenefits = {
  main: {
    label: 'Direct Customer Reach',
    title: 'Stay connected with customers, wherever they are.',
    description:
      'Connect with customers through notifications delivered to their devices.'
  },

  promotions: {
    label: 'Timely Promotions',
    title: 'Make every offer arrive at the right moment.',
    description:
      'Share special offers and exciting updates when they matter most.'
  },

  purchases: {
    label: 'More Repeat Purchases',
    title: 'Give customers a reason to come back for more.',
    description:
      'Give customers more reasons to return, explore, and shop again.'
  }
}

export const notificationExamples = [
  {
    id: 1,
    title: 'Something special for you!',
    message: 'Enjoy 20% off your next purchase.',
    time: 'Now',
    icon: 'fa-solid fa-gift'
  },
  {
    id: 2,
    title: 'New arrivals are here',
    message: 'Discover fresh products you will love.',
    time: '2m',
    icon: 'fa-solid fa-bag-shopping'
  },
  {
    id: 3,
    title: 'Your favorites are waiting',
    message: 'Come back and take another look.',
    time: '5m',
    icon: 'fa-regular fa-heart'
  }
]

export const promotionPreview = {
  campaign: 'October Special',
  audience: 'Returning customers',
  message: 'A little something just for you!',
  offer: '20% OFF',
  subtitle: 'Your next purchase',
  status: 'Ready to send'
}

export const repeatPurchasePreview = {
  eyebrow: 'A SPECIAL OFFER',
  title: 'Your favorites are calling.',
  description:
    'Come back and explore something you will love.',
  button: 'Shop Now',
  notificationTitle: 'We miss you!',
  notificationMessage: 'A special offer is waiting for you.',
  productImage:
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
}
