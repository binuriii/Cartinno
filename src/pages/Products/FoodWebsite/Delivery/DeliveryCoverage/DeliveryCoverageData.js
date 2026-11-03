export const coverageContent = {
  title: 'From kitchen.',
  highlight: 'To their doorstep.',
  description:
    'Follow every food order through preparation, packing and delivery. Keep your restaurant team and customers connected throughout the journey.'
}

export const deliveryLocations = [
  {
    id: 'business',
    title: 'Your restaurant',
    subtitle: 'Order received',
    icon: 'store',
    desktop: { x: 190, y: 250 },
    mobile: { x: 90, y: 120 }
  },
  {
    id: 'preparation',
    title: 'Kitchen preparation',
    subtitle: 'Freshly prepared',
    icon: 'package',
    desktop: { x: 475, y: 145 },
    mobile: { x: 310, y: 245 }
  },
  {
    id: 'delivery',
    title: 'Delivery handover',
    subtitle: 'Ready to leave',
    icon: 'truck',
    desktop: { x: 810, y: 270 },
    mobile: { x: 90, y: 370 }
  },
  {
    id: 'customer',
    title: 'Your customer',
    subtitle: 'Order delivered',
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
    title: 'Preparing the food order',
    description: 'Restaurant → Kitchen preparation',
    completeTitle: 'Order freshly prepared',
    icon: 'package',
    curve: 135
  },
  {
    id: 'dispatch',
    from: 'preparation',
    to: 'delivery',
    title: 'Packing and dispatching',
    description: 'Kitchen → Delivery handover',
    completeTitle: 'Ready for delivery',
    icon: 'truck',
    curve: 135
  },
  {
    id: 'deliver',
    from: 'delivery',
    to: 'customer',
    title: 'On the way to your customer',
    description: 'Delivery partner → Customer',
    completeTitle: 'Food order delivered',
    icon: 'home',
    curve: 100
  }
]

export const coverageHighlights = [
  {
    title: 'Prepare',
    description: 'Keep incoming food orders organised'
  },
  {
    title: 'Dispatch',
    description: 'Coordinate kitchen-to-driver handovers'
  },
  {
    title: 'Deliver',
    description: 'Bring every order to the customer'
  }
]
