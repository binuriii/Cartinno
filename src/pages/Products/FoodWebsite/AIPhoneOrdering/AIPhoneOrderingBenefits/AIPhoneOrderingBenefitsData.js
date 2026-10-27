export const aiPhoneOrderingBenefitsContent = {
  title1: 'Fewer Missed Calls. Smoother Orders.',
  title2: 'More Opportunities.'
}

export const aiPhoneOrderingBenefits = [
  {
    id: 1,
    number: '01',
    label: 'Always ready to help',
    title: 'Always Ready to Help',
    description:
      'Give customers another convenient way to place their orders.'
  },
  {
    id: 2,
    number: '02',
    label: 'Less pressure on staff',
    title: 'Less Pressure on Staff',
    description:
      'Reduce the time your team spends handling routine ordering calls.'
  },
  {
    id: 3,
    number: '03',
    label: 'Connected workflow',
    title: 'A More Connected Workflow',
    description:
      'Bring phone orders closer to your everyday restaurant operations.'
  }
]

export const aiPhoneOrderingBenefitsPreview = {
  restaurant: 'The Good Table',
  phoneNumber: '+1 (555) 012-3456',
  status: 'Phone ordering preview',
  restaurantImage:
    'https://images.unsplash.com/photo-1748197399118-b4bca0c39987?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  burgerImage:
    'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  lemonadeImage:
    'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  kitchenImage:
    'https://images.unsplash.com/photo-1596205250168-c3583813eea0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  messages: [
    {
      id: 1,
      speaker: 'AI assistant',
      message: 'Welcome to The Good Table! What can I get started for you today?',
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
      message: 'Of course! One burger and one lemonade. Anything else?',
      type: 'assistant'
    }
  ],
  order: [
    {
      id: 1,
      name: 'Classic burger',
      quantity: '1',
      image: 'burgerImage'
    },
    {
      id: 2,
      name: 'Fresh lemonade',
      quantity: '1',
      image: 'lemonadeImage'
    }
  ]
}