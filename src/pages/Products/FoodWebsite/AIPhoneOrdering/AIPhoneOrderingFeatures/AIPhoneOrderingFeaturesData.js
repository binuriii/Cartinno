export const aiPhoneOrderingFeaturesContent = {
  title1: 'Smarter Phone Ordering.',
  title2: 'Better Guest Experiences.'
}

export const aiPhoneOrderingFeatures = [
  {
    id: 1,
    number: '01',
    title: 'Answer Calls Without the Wait',
    description:
      'Handle incoming order calls during busy hours and reduce pressure on restaurant staff.'
  },
  {
    id: 2,
    number: '02',
    title: 'Make Ordering Feel Natural',
    description:
      'Let customers ask about menu items, share preferences, and place orders through natural conversations.'
  },
  {
    id: 3,
    number: '03',
    title: 'Keep Orders Connected to Your Business',
    description:
      'Connect phone orders with your restaurant workflow and manage sales more efficiently.'
  }
]

export const aiPhoneOrderingPreview = {
  restaurant: 'The Good Table',
  status: 'AI ordering preview',
  phoneNumber: '+1 (555) 012-3456',

  images: {
    restaurant:
      'https://images.unsplash.com/photo-1672636401322-b909b15b7c57?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    burger:
      'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    lemonade:
      'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
  },

  conversation: [
    {
      id: 1,
      speaker: 'AI assistant',
      message:
        'Welcome to The Good Table! What can I get started for you today?',
      type: 'assistant'
    },
    {
      id: 2,
      speaker: 'Customer',
      message: "I'd like a classic burger and a lemonade, please.",
      type: 'customer'
    },
    {
      id: 3,
      speaker: 'AI assistant',
      message:
        'Of course! One classic burger and one lemonade. Would you like anything else?',
      type: 'assistant'
    }
  ],

  order: [
    {
      id: 1,
      name: 'Classic burger',
      quantity: 1,
      image: 'burger'
    },
    {
      id: 2,
      name: 'Fresh lemonade',
      quantity: 1,
      image: 'lemonade'
    }
  ]
}