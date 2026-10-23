export const sceneDuration = 4000

export const content = {
  accessibleTitle: 'Everything Connected. One Powerful POS.',
  title1: 'Everything Connected.',
  title2: 'One Powerful POS.',
  description:
    'Bring online orders, payments, inventory and everyday operations together with Cartinno POS. Keep your business connected and your day running smoothly.',
  features: [
    {
      id: 'sales',
      title: 'Online & In-Store Sales',
      description:
        'Keep your online store and physical checkout connected. Manage incoming orders, product availability, and sales activity without switching between separate systems.',
      icon: 'M3 10h18M5 10v10h14V10M3 10l2-6h14l2 6M9 20v-6h6v6',
      theme: 'pink',
      badge: 'Order synced',
      detail: 'Online + in-store',
      scenes: [
        { background: '#f4dfeb', accent: '#a84f7e', title: 'A new online order.', label: 'ONLINE ORDER', badge: 'Order received', detail: 'Ready for your team' },
        { background: '#e4e6fb', accent: '#6b66a1', title: 'Keep your counter connected.', label: 'IN-STORE CHECKOUT', badge: 'Sale recorded', detail: 'One place for every sale' },
        { background: '#daede9', accent: '#3c8377', title: 'All your orders. Together.', label: 'CONNECTED SALES', badge: 'Orders synced', detail: 'Online + in-store' }
      ]
    },
    {
      id: 'payments',
      title: 'Payments Made Simple',
      description:
        'Support cash, cards, digital wallets, and QR payments through connected payment solutions. Simplify checkout, track transactions, and keep payment records organized.',
      icon: 'M3 7h18v12H3zM3 11h18M7 15h3',
      theme: 'yellow',
      badge: 'Payment received',
      detail: 'One connected record',
      scenes: [
        { background: '#eee6d3', accent: '#9b7a3a', title: 'Choose how to pay.', label: 'PAYMENT OPTIONS', badge: 'Flexible checkout', detail: 'Cash, card, wallet or QR' },
        { background: '#e0e8f3', accent: '#5279a1', title: 'A smoother card payment.', label: 'PROCESS PAYMENT', badge: 'Secure handoff', detail: 'Connected payment solution' },
        { background: '#e3efdd', accent: '#61834d', title: 'Payment complete.', label: 'PAYMENT RECEIPT', badge: 'Payment received', detail: 'One connected record' }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory That Stays in Sync',
      description:
        'Connect sales directly with inventory tracking. Keep stock levels updated across online and in-store channels, monitor low-stock alerts, and manage availability with greater confidence.',
      icon: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 5 9-5M12 12v9M7 5l10 5',
      theme: 'mint',
      badge: 'Stock updated',
      detail: 'Across your channels',
      scenes: [
        { background: '#ddede3', accent: '#4b896d', title: 'Know what is available.', label: 'STOCK OVERVIEW', badge: 'Stock visible', detail: 'A clear view of availability' },
        { background: '#e9e2f5', accent: '#8a6dab', title: 'A sale updates your stock.', label: 'AUTOMATIC UPDATE', badge: 'Stock updated', detail: 'Sale recorded, stock adjusted' },
        { background: '#f9e5d5', accent: '#b87c4e', title: 'Stay one step ahead.', label: 'LOW-STOCK ALERT', badge: 'Time to restock', detail: 'Across your channels' }
      ]
    }
  ]
}