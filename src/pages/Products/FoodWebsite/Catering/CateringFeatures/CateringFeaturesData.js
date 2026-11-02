export const cateringContent = {
  title1: 'Catering Made Simple.',
  title2: 'Built for Bigger Orders.',

  featuredImage:
    'https://images.unsplash.com/photo-1601313054727-931178d78629?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',

  featuredImageAlt:
    'Colorful catering food displayed for a group event'
}

export const cateringFeatures = [
  {
    id: 1,
    number: '01',
    title: 'More Orders. More Profit.',
    description:
      'Grow direct catering orders and keep more revenue without third-party marketplace commissions.',
    theme: 'light',
    label: 'DIRECT CATERING ORDERS'
  },
  {
    id: 2,
    number: '02',
    title: 'Make Group Ordering Effortless',
    description:
      'Help customers explore catering menus, choose favorites, and place large orders with ease.',
    theme: 'featured',
    label: 'MADE FOR EVERY OCCASION'
  },
  {
    id: 3,
    number: '03',
    title: 'Keep Every Catering Order Connected',
    description:
      'Manage catering orders, payments, and kitchen operations in one connected platform.',
    theme: 'light',
    label: 'CONNECTED CATERING'
  }
]

export const cateringMenuPreview = {
  categories: ['Popular', 'Platters', 'Sides'],

  items: [
    {
      id: 1,
      category: 'Platters',
      name: 'Party Sandwich Platter',
      price: '$48.00',
      image:
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&auto=format&fit=crop&q=85'
    },
    {
      id: 2,
      category: 'Sides',
      name: 'Fresh Salad Bowl',
      price: '$24.00',
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format&fit=crop&q=85'
    },
    {
      id: 3,
      category: 'Platters',
      name: 'Celebration Meal Set',
      price: '$65.00',
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&auto=format&fit=crop&q=85'
    }
  ]
}

export const cateringOrderPreview = {
  business: 'The Good Table',
  title: 'Catering order overview',
  orderId: '#CAT-1024',

  details: [
    {
      id: 1,
      label: 'Event',
      value: 'Team Lunch',
      icon: 'fa-regular fa-calendar'
    },
    {
      id: 2,
      label: 'Guests',
      value: '25 people',
      icon: 'fa-solid fa-users'
    },
    {
      id: 3,
      label: 'Order',
      value: 'Catering platter package',
      icon: 'fa-solid fa-utensils'
    }
  ],

  channels: [
    {
      id: 1,
      title: 'Order details',
      status: 'Organized',
      icon: 'fa-solid fa-clipboard-list'
    },
    {
      id: 2,
      title: 'Payment details',
      status: 'Recorded',
      icon: 'fa-solid fa-credit-card'
    },
    {
      id: 3,
      title: 'Kitchen preparation',
      status: 'Ready to manage',
      icon: 'fa-solid fa-kitchen-set'
    }
  ],

  status: 'Catering workflow connected'
}
