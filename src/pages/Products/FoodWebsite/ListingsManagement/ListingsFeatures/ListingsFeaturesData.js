
export const listingsFeaturesContent = {
  title1: 'Accurate Listings. Better Visibility.',
  title2: 'More Customers.'
}

export const listingsFeatures = [
  {
    id: 1,
    number: '01',
    title: 'Keep Your Business Information Consistent',
    description:
      'Keep your restaurant details accurate and consistent across online platforms to build a reliable presence.'
  },
  {
    id: 2,
    number: '02',
    title: 'Make Every Detail Count for Local SEO',
    description:
      'Improve local search visibility with accurate business details that help nearby customers find your restaurant.'
  },
  {
    id: 3,
    number: '03',
    title: 'Build Trust Across Every Platform',
    description:
      'Build customer confidence with clear, up-to-date restaurant information across Google and online directories.'
  }
]

// Illustrative listing information for the mockup.

export const listingsPreview = {
  restaurant: 'The Good Table',
  category: 'Restaurant · Dine-in · Takeaway',
  searchQuery: 'restaurants near me',

  image:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=950&auto=format&fit=crop&q=85',

  imageAlt: 'Warm restaurant interior',

  details: [
    {
      id: 'address',
      icon: 'fa-solid fa-location-dot',
      label: 'Address',
      value: '25 Main Street, City Centre'
    },
    {
      id: 'hours',
      icon: 'fa-regular fa-clock',
      label: 'Business hours',
      value: 'Open daily · 10 AM – 10 PM'
    },
    {
      id: 'website',
      icon: 'fa-solid fa-globe',
      label: 'Website',
      value: 'thegoodtable.example'
    }
  ],

  platforms: [
    {
      id: 1,
      name: 'Google',
      icon: 'fa-brands fa-google',
      status: 'Details consistent'
    },
    {
      id: 2,
      name: 'Online directories',
      icon: 'fa-solid fa-list',
      status: 'Details consistent'
    },
    {
      id: 3,
      name: 'Restaurant website',
      icon: 'fa-solid fa-globe',
      status: 'Details consistent'
    }
  ]
}
