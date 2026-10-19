export const posFAQs = [
  {
    id: 1,
    question: 'Do I pay commissions on orders?',
    answer:
      'No, Cartinno includes a free ordering website on your own domain with 0% commission on the orders that come through it.' /*[cite: 38, 42, 44] */
  },
  {
    id: 2,
    question: 'Does the POS connect to the kitchen?',
    answer:
      'Yes, tickets fire directly to the kitchen display with sound and visual alerts, moving through preparing and ready statuses.' /*[cite: 41, 44] */
  },
  {
    id: 3,
    question: 'Can it manage my inventory and recipes?',
    answer:
      'Yes, you can map a recipe once, and ingredients are deducted automatically as products sell, keeping your stock perfectly in sync.' /*[cite: 39, 40] */
  },
  {
    id: 4,
    question: 'What order types does it support?',
    answer:
      'The system supports multiple order types on one till, including dine-in, takeaway, pickup, drive-thru, and catering.' /*[cite: 37, 44] */
  },
  {
    id: 5,
    question: 'Can I run a loyalty program?',
    answer:
      'Yes, the POS includes customer profiles, loyalty tiers, points redemption, and gift cards to turn one-time visitors into regulars.' /*[cite: 40] */
  }
]

export const posHero = {
  fixedLine: 'The Restaurant POS,',

  rotatingWords: [
    'Built for Service.',
    'Connected to Everything.',
    'Powered by Cartinno.',
    'Ready for Growth.'
  ],

  description:
    'The restaurant point of sale and operations platform — orders, kitchen, tables, stock, loyalty and a free ordering website, all in one system.' /*[cite: 36] */,

  // Change to a suitable POS or Restaurant background image
  backgroundImage:
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=60',

  overlayOpacity: 0.4,

  backgroundPosition: 'center center',

  primaryButton: {
    text: 'Get a Free Demo',
    link: '/#demo'
  },

  secondaryButton: null,

  interval: 3500
}