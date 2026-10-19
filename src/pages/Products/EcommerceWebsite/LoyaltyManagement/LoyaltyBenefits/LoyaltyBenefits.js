export const benefitsContent = {
  heading: 'Run a loyalty program',
  subheading: 'your customers will love.',
  photo: 'https://images.unsplash.com/photo-1705743244501-a88b02c524fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  photoAlt: 'Warm and welcoming restaurant interior'
}

/* Cards shown in the animated UI (order doesn't matter, "variant" decides position) */
export const menuCards = [
  {
    id: 'pizza',
    variant: 'back-top',
    name: 'Presto Pizza',
    description: 'Fresh pasta carbonara with sliced tender chicken and mushrooms',
    price: '$11.00',
    likes: '212',
    points: '250',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    imageAlt: 'Pizza'
  },
  {
    id: 'ravioli',
    variant: 'front',
    name: 'Chicken Ravioli',
    description: 'Fresh pasta carbonara with sliced tender chicken and...',
    price: '$13.00',
    likes: '139',
    points: '400',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=80',
    imageAlt: 'Chicken ravioli'
  },
  {
    id: 'burger',
    variant: 'back-bottom',
    name: 'Smash Burger',
    description: 'Double patty, aged cheddar and house sauce',
    price: '$8.00',
    likes: '139',
    points: '100',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    imageAlt: 'Burger'
  }
]

export const loyaltyBenefits = [
  {
    icon: 'trophy',
    title: 'Turn occasional shoppers into regulars.',
    description: 'Encourage repeat purchases with points, cashback rewards and benefits customers can look forward to.'
  },
  {
    icon: 'userPlus',
    title: 'Make joining feel effortless.',
    description: 'Build customer relationships with membership programs and connected customer profiles.'
  },
  {
    icon: 'gift',
    title: 'Give every reward a personal touch.',
    description: 'Recognize customers through birthday specials, vouchers and personalized offers.'
  }
]

/* Premium thin-stroke SVG icons (24x24, Lucide style) */
export const icons = {
  trophy:
    '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  userPlus:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  gift:
    '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  heart:
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  star:
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  sparkles:
    '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'
}