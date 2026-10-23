
export const giftCardHowItWorksContent = {
  eyebrow: 'HOW IT WORKS',
  title1: 'The Perfect Gift Is',
  title2: 'Just a Few Steps Away.',
  description:
    'From choosing the perfect gift to making someone’s day, Cartinno makes gifting simple, personal, and memorable.'
}

export const giftCardSteps = [
  {
    id: 1,
    number: '01',
    title: 'Choose a Gift Card',
    description:
      'Customers select a gift card from your business and choose the value that works for their occasion.',

    theme: 'peach',

    // ADD YOUR IMAGE LINK HERE
    image: './Products/GiftCards/GiftCard1.webp',
    imageAlt: 'Customer choosing a Cartinno gift card',

    previewLabel: 'Choose your gift',
    previewTitle: 'A Little Something Special',
    amounts: ['Rs. 2,500', 'Rs. 5,000', 'Rs. 10,000']
  },
  {
    id: 2,
    number: '02',
    title: 'Make It Personal',
    description:
      "Add a thoughtful message to make the gift feel special, whether it's a birthday, celebration, or simple thank-you.",

    theme: 'lavender',

    // ADD YOUR IMAGE LINK HERE
    image: './Products/GiftCards/GiftCard2.webp',
    imageAlt: 'Personalized gift card and special message',

    previewLabel: 'Your message',
    previewTitle: 'Just for You',
    message:
      'Wishing you a wonderful day filled with happy moments!',
    recipient: 'Someone Special'
  },
  {
    id: 3,
    number: '03',
    title: 'Gift & Enjoy',
    description:
      'Complete the purchase and let the recipient enjoy their gift, with convenient redemption through your business.',

    theme: 'mint',

    // ADD YOUR IMAGE LINK HERE
    image: './Products/GiftCards/GiftCardFlow.webp',
    imageAlt: 'Recipient receiving a Cartinno gift card',

    previewLabel: 'Ready to enjoy',
    previewTitle: 'Gift Card',
    successMessage: 'Your gift is ready!',
    redemptionLabel: 'Present your gift card to redeem'
  }
]
