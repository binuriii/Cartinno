
export const reportingFeaturesContent = {
  title1: 'Every Number Tells a Story.',
  title2: 'See the Bigger Picture.',

  description:
    'Understand your business with connected sales reports, clear performance insights, and the information you need to make smarter decisions.'
}

export const reportingFeatures = [
  {
    id: 1,
    number: '01',
    label: 'Business overview',
    title: 'Your Business at a Glance',
    description:
      'Get a clear view of your sales, orders, revenue, and business performance in one place. Stay informed with easy-to-understand reports that help you see how your business is doing.'
  },
  {
    id: 2,
    number: '02',
    label: 'Sales insights',
    title: "Discover What's Driving Your Sales",
    description:
      'Understand which products are performing best, follow customer purchasing trends, and explore sales patterns. Turn everyday business data into meaningful insights that guide smarter decisions.'
  },
  {
    id: 3,
    number: '03',
    label: 'Connected reports',
    title: 'Stay Connected to Your Business',
    description:
      'Keep an eye on performance across your online store, physical sales, and multiple locations. Access connected reports and stay informed about your business wherever you work.'
  }
]

// Illustrative reporting information.
// Replace these values with actual business data
// if you connect the UI to your reporting system.

export const reportingOverview = {
  totalSales: '$12,480',
  salesChange: '+12.8%',
  totalOrders: '284',
  ordersChange: '+8.2%',
  period: 'This week',

  salesBars: [
    28, 42, 60, 39, 77, 55,
    46, 88, 59, 71, 95, 64
  ],

  platforms: [
    { label: 'Online', value: 52, color: '#3056d3' },
    { label: 'In-store', value: 33, color: '#5e87f9' },
    { label: 'Other', value: 15, color: '#adc4ff' }
  ]
}

export const reportingProducts = [
  {
    id: 1,
    name: 'Studio Headphones',
    sales: '124 sold',
    change: '+18%'
  },
  {
    id: 2,
    name: 'Classic Watch',
    sales: '98 sold',
    change: '+12%'
  },
  {
    id: 3,
    name: 'Everyday Backpack',
    sales: '76 sold',
    change: '+9%'
  }
]

export const reportingInsight = {
  title: 'Your sales are growing',
  description:
    'Studio Headphones is your top-selling product this week.',
  time: 'Just now'
}

export const reportingMobile = {
  businessName: 'Cartinno Store',
  sales: '$12,480',
  orders: '284',
  locations: '3',
  status: 'All locations connected',

  channels: [
    { id: 1, name: 'Online store', value: '$6,490' },
    { id: 2, name: 'In-store sales', value: '$4,180' },
    { id: 3, name: 'Other channels', value: '$1,810' }
  ]
}
