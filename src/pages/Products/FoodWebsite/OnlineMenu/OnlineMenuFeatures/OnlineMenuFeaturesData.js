
export const onlineMenuContent = {
  title1: 'A Menu That Makes',
  title2: 'Every Dish Irresistible.',

  featuredImage:
    'https://images.unsplash.com/photo-1615735487485-e52b9af610c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',

  featuredImageAlt:
    'Beautifully presented restaurant food'
}

export const onlineMenuFeatures = [
  {
    id: 1,
    number: '01',
    title: 'Turn Menu Browsers Into Customers',
    description:
      'Help customers discover their favorites with an engaging menu that makes browsing and ordering easy.',
    theme: 'light',
    label: 'MENU DISCOVERY'
  },
  {
    id: 2,
    number: '02',
    title: 'Beautiful Menus. Effortless Ordering.',
    description:
      'Showcase dishes with beautiful images, clear categories, and smooth navigation across all devices.',
    theme: 'featured',
    label: 'DELICIOUSLY SIMPLE'
  },
  {
    id: 3,
    number: '03',
    title: 'Keep Your Menu Fresh and Connected',
    description:
      'Easily update dishes, prices, and availability while keeping your online menu and POS connected.',
    theme: 'light',
    label: 'CONNECTED MENU'
  }
]

export const onlineMenuPreview = {
  categories: [
    'Popular',
    'Burgers',
    'Sides'
  ],

  items: [
    {
      id: 1,
      name: 'Classic Burger',
      price: '$12.00',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=250&auto=format&fit=crop&q=85'
    },
    {
      id: 2,
      name: 'House Special',
      price: '$15.00',
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=250&auto=format&fit=crop&q=85'
    }
  ]
}

export const onlineMenuSync = {
  business: 'Cartinno Restaurant',

  channels: [
    {
      id: 1,
      title: 'Online Menu',
      status: 'Updated',
      icon: 'fa-solid fa-globe'
    },
    {
      id: 2,
      title: 'Restaurant POS',
      status: 'Connected',
      icon: 'fa-solid fa-cash-register'
    }
  ],

  status: 'Menu information connected'
}
