export const salesProcessContent = {
  heading: 'A clearer way to',
  highlight: 'manage every sale.'
}

export const salesProcessSections = [
  {
    id: 'orders',
    number: '01',
    title: 'Bring every order\ninto one workflow.',
    description: 'Keep incoming sales organised and give your team a clear view of order details, progress and the next action.',
    benefits: ['Review order details in one place', 'Follow order progress', 'Keep teams aligned on fulfilment'],
    image: 'https://images.unsplash.com/photo-1434725182100-4baea405f9bd?q=80&w=2493&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    icon: 'M3 4h18v16H3zM3 9h18M8 14h4'
  },
  {
    id: 'insights',
    number: '02',
    title: 'Understand your sales.\nSpot what matters.',
    description: 'Bring revenue and sales activity into focus with reports that help you understand performance across your business.',
    benefits: ['Review sales activity and revenue', 'Understand product performance', 'Use insights to guide decisions'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    icon: 'M4 19V5M4 19h17M8 15l4-4 4 2 5-7'
  },
  {
    id: 'improvements',
    number: '03',
    title: 'Connect the details.\nKeep improving.',
    description: 'Coordinate customer, payment and inventory information to create a more consistent day-to-day sales operation.',
    benefits: ['Connect customer and transaction details', 'Keep stock information aligned', 'Review workflows as your business grows'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    icon: 'M5 12h14M12 5l7 7-7 7'
  }
]

export const salesOrderLines = [
  { label: 'workspace', value: 'Sales management overview', type: 'heading' },
  { label: 'orders', value: 'New orders received', type: 'normal' },
  { label: 'check', value: 'Order details organised', type: 'success' },
  { label: 'check', value: 'Payment status available', type: 'success' },
  { label: 'review', value: 'Preparing order fulfilment', type: 'muted' },
  { label: 'next', value: 'Update order progress', type: 'accent' },
  { label: 'customer', value: 'Customer information connected', type: 'normal' },
  { label: 'check', value: 'Sales activity recorded', type: 'success' },
  { label: 'next', value: 'Review daily performance', type: 'accent' }
]

export const salesChannels = [
  { label: 'Online orders', value: '1,240', share: 42, color: '#d7454e' },
  { label: 'In-store sales', value: '980', share: 33, color: '#92aaa2' },
  { label: 'Other channels', value: '460', share: 16, color: '#bfadce' },
  { label: 'Assisted sales', value: '270', share: 9, color: '#dfc5ac' }
]

export const salesTasks = [
  {
    id: 'orders',
    title: 'Order coordination',
    subtitle: 'Keep each order moving',
    completed: 8,
    total: 10,
    tags: ['Order status', 'Payments', 'Fulfilment'],
    metricLabel: 'Current focus',
    metricValue: 'Open orders'
  },
  {
    id: 'customers',
    title: 'Customer follow-up',
    subtitle: 'Keep customer details connected',
    completed: 6,
    total: 8,
    tags: ['Customer details', 'Sales history', 'Service'],
    metricLabel: 'Current focus',
    metricValue: 'Customer records'
  }
]
