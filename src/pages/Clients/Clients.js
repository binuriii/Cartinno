const base = import.meta.env.BASE_URL

export const clientsHero = {
  title: 'Trusted by Growing\nBusinesses Worldwide',
  description:
    'See how retailers, restaurants and service providers use Cartinno to build, sell and grow online.',
  primaryButton: {
    text: 'Get a Free Demo',
    link: '/#demo'
  },
  secondaryButton: null,
  image: `https://images.unsplash.com/photo-1648824571682-109acc138294?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D`,
  imageAlt: 'Cartinno clients',
  imagePosition: 'center center',
  stat: {
    value: '500+',
    label: 'Businesses growing with Cartinno'
  },
  feature: {
    title: 'Built to Scale',
    text: 'From small shops to large marketplaces.'
  },
  logos: [
    { name: 'Trusted' },
    { name: 'Valued' },
    { name: 'Connected' },
    { name: 'Successful' }
  ],
  shade: 0.18
}

export const clientsFAQs = [
  {
    id: 1,
    question: 'What types of businesses use Cartinno?',
    answer:
      'Cartinno offers solutions for different business needs, including retail, wholesale, restaurants, and ecommerce. Available features depend on the selected solution and configuration.'
  },
  {
    id: 2,
    question: 'How can Cartinno help my business?',
    answer:
      'Cartinno helps businesses manage key workflows, connect relevant operations, and create more convenient customer experiences using tools suited to their needs.'
  },
  {
    id: 3,
    question: 'Can Cartinno support different industries?',
    answer:
      'Yes. Cartinno provides industry-focused solutions designed around the needs of different business types, helping each business choose relevant tools and workflows.'
  },
  {
    id: 4,
    question: 'Can I choose the features my business needs?',
    answer:
      'The appropriate modules and integrations depend on your business requirements and Cartinno configuration. Contact the team to discuss the best fit for your operations.'
  },
  {
    id: 5,
    question: 'Can Cartinno support a growing business?',
    answer:
      'Cartinno offers business tools designed to support day-to-day operations. The best setup depends on your current requirements, future plans, and the features available for your business.'
  },
  {
    id: 6,
    question: 'How can my business become a Cartinno client?',
    answer:
      'Contact the Cartinno team to discuss your business needs, explore relevant solutions, and arrange a demonstration of the platform.'
  },
  {
    id: 7,
    question: 'How can I learn more about Cartinno solutions?',
    answer:
      'Explore the relevant product pages on the Cartinno website or request a demo to learn more about available features, integrations, and suitable configurations.'
  }
]