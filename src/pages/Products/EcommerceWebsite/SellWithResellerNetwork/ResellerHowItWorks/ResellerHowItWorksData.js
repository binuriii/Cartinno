
const base = import.meta.env.BASE_URL

export const resellerBrand = {
  name: 'cartinno',
  logo: `${base}Products/ResellerNetwork/cartinno-logo.png`,
  businessName: 'Cartinno Supply Co.'
}

export const resellerHowItWorksContent = {
  title1: 'Build Your Network.',
  title2: 'Grow Your Business.',
  description:
    'Connect your resellers, share your products, and manage your growing network through one connected platform.'
}

export const resellerHowItWorksSteps = [
  {
    id: 1,
    number: '01',
    title: 'Connect Your Resellers',
    description:
      'Bring your reselling partners together and establish a network that helps your products reach more customers.',
    label: 'Network overview'
  },
  {
    id: 2,
    number: '02',
    title: 'Share Your Products',
    description:
      'Make your product catalog available to your reseller network, creating more ways for customers to discover and purchase your products.',
    label: 'Catalog distribution'
  },
  {
    id: 3,
    number: '03',
    title: 'Manage & Grow',
    description:
      'Keep track of reseller orders and sales activity as your business expands, all through one connected platform.',
    label: 'Performance overview'
  }
]

export const resellerNetworkMembers = [
  {
    id: 1,
    name: 'Maya Chen',
    store: "Maya's Market",
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&q=85'
  },
  {
    id: 2,
    name: 'Theo Ross',
    store: 'Northline Goods',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&q=85'
  },
  {
    id: 3,
    name: 'Nina Adeyemi',
    store: 'Nina Studio',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces&q=85'
  },
  {
    id: 4,
    name: 'Liam Park',
    store: 'Park Supply',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces&q=85'
  },
  {
    id: 5,
    name: 'Ava Laurent',
    store: 'Maison Ava',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=faces&q=85'
  },
  {
    id: 6,
    name: 'Owen Brooks',
    store: 'Brooks & Co.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=85'
  }
]

export const resellerCatalogProducts = [
  {
    id: 1,
    name: 'Studio Headphones',
    price: '$189',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=380&fit=crop&q=85',
    imageAlt: 'Black over-ear headphones',
    color: 'yellow'
  },
  {
    id: 2,
    name: 'Meridian Watch',
    price: '$149',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=380&fit=crop&q=85',
    imageAlt: 'Minimalist wristwatch',
    color: 'gray'
  },
  {
    id: 3,
    name: 'Forma Stool',
    price: '$120',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=380&fit=crop&q=85',
    imageAlt: 'Contemporary wooden chair',
    color: 'blue'
  },
  {
    id: 4,
    name: 'Arc Task Lamp',
    price: '$86',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=380&fit=crop&q=85',
    imageAlt: 'Home interior with a decorative lamp',
    color: 'stone'
  },
  {
    id: 5,
    name: 'Weekday Pack',
    price: '$94',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=380&fit=crop&q=85',
    imageAlt: 'Everyday travel backpack',
    color: 'slate'
  },
  {
    id: 6,
    name: 'Keeper Flask',
    price: '$42',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=380&fit=crop&q=85',
    imageAlt: 'Reusable water bottle',
    color: 'mint'
  }
]

export const resellerStorefronts = [
  {
    id: 1,
    name: "Maya's Market",
    products: '6 products live',
    memberId: 1
  },
  {
    id: 2,
    name: 'Northline Goods',
    products: '6 products live',
    memberId: 2
  },
  {
    id: 3,
    name: 'Nina Studio',
    products: '6 products live',
    memberId: 3
  }
]

export const resellerPerformanceMetrics = [
  {
    id: 1,
    label: 'Total reseller orders',
    value: '1,284',
    trend: '+18.6%'
  },
  {
    id: 2,
    label: 'Active resellers',
    value: '24',
    trend: '+6 this month'
  },
  {
    id: 3,
    label: 'Revenue growth',
    value: '+32.4%',
    trend: 'vs last month'
  }
]

export const resellerRecentOrders = [
  {
    id: 'CT-2048',
    customer: "Maya's Market",
    amount: '$246.00',
    status: 'Paid',
    productId: 1
  },
  {
    id: 'CT-2047',
    customer: 'Park Supply',
    amount: '$128.00',
    status: 'Paid',
    productId: 2
  },
  {
    id: 'CT-2046',
    customer: 'Northline Goods',
    amount: '$420.00',
    status: 'Processing',
    productId: 4
  }
]

export const resellerSalesChart = {
  path:
    'M 0 225 C 45 222, 70 185, 115 190 S 195 235, 240 178 S 300 112, 355 104 S 435 98, 485 38 S 545 7, 600 0',
  area:
    'M 0 225 C 45 222, 70 185, 115 190 S 195 235, 240 178 S 300 112, 355 104 S 435 98, 485 38 S 545 7, 600 0 L 600 240 L 0 240 Z',
  months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
}
