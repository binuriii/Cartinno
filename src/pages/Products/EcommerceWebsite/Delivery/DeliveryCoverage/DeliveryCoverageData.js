/** Cartinno Delivery Coverage — content and illustrative journey data. */
export const coverageContent = {
  title: 'Every order.',
  highlight: 'A better delivery journey.',
  description:
    'Bring your business, delivery team and customers together — from preparing an order to the final handover.'
}

export const deliveryLocations = [
  {
    id: 'business',
    title: 'Your business',
    subtitle: 'Order received',
    icon: 'store',
    desktop: { x: 190, y: 250 },
    mobile: { x: 90, y: 120 }
  },
  {
    id: 'preparation',
    title: 'Order preparation',
    subtitle: 'Packed with care',
    icon: 'package',
    desktop: { x: 475, y: 145 },
    mobile: { x: 310, y: 245 }
  },
  {
    id: 'delivery',
    title: 'Delivery team',
    subtitle: 'Ready for the road',
    icon: 'truck',
    desktop: { x: 810, y: 270 },
    mobile: { x: 90, y: 370 }
  },
  {
    id: 'customer',
    title: 'Your customer',
    subtitle: 'The final handover',
    icon: 'home',
    desktop: { x: 1040, y: 435 },
    mobile: { x: 310, y: 495 }
  }
]

export const deliveryJourney = [
  {
    id: 'prepare',
    from: 'business',
    to: 'preparation',
    title: 'Preparing your order',
    description: 'Your business → Order preparation',
    completeTitle: 'Order ready',
    icon: 'package',
    curve: 135
  },
  {
    id: 'dispatch',
    from: 'preparation',
    to: 'delivery',
    title: 'Handing over to delivery',
    description: 'Order preparation → Delivery team',
    completeTitle: 'Ready for delivery',
    icon: 'truck',
    curve: 135
  },
  {
    id: 'deliver',
    from: 'delivery',
    to: 'customer',
    title: 'On the way to your customer',
    description: 'Delivery team → Your customer',
    completeTitle: 'Delivery completed',
    icon: 'home',
    curve: 100
  }
]

export const coverageHighlights = [
  {
    title: 'Prepare',
    description: 'Keep order details organised'
  },
  {
    title: 'Coordinate',
    description: 'Connect every delivery handover'
  },
  {
    title: 'Deliver',
    description: 'Bring your service to the doorstep'
  }
]