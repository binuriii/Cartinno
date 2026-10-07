export const logoImage = 'cartinno-logo.webp'

export const products = [
  {
    id: 'food',
    title: 'Food Website',
    label: 'FOOD',
    href: '#food',
    image: 'foodwebsite.jpeg',
    imageTitle: 'Build a better digital experience for your restaurant.',
    groups: [
      {
        title: 'Grow online discovery',
        items: [
          { label: 'Restaurant Website', href: '#restaurant-website', icon: 'fa-solid fa-globe' },
          { label: 'Restaurant SEO', href: '#seo', icon: 'fa-solid fa-magnifying-glass' },
          { label: 'Online Menu', href: '#online-menu', icon: 'fa-solid fa-list' },
          { label: 'Reviews Engine', href: '#reviews-engine', icon: 'fa-regular fa-star', badge: 'Waitlist' },
          { label: 'Listings Management', href: '#listings-management', icon: 'fa-solid fa-location-dot' }
        ]
      },
      {
        title: 'Grow repeat orders',
        items: [
          { label: 'Point of Sale', href: '#point-of-sale', icon: 'fa-solid fa-laptop' },
          { label: 'Branded Restaurant App', href: '#restaurant-app', icon: 'fa-solid fa-mobile-screen-button', badge: 'Waitlist' },
          { label: 'Marketing Campaigns', href: '#marketing-campaigns', icon: 'fa-solid fa-bullhorn' },
          { label: 'Push Notifications Marketing', href: '#push-notifications', icon: 'fa-regular fa-bell' },
          { label: 'Loyalty & Rewards', href: '#loyalty', icon: 'fa-solid fa-award' }
        ]
      },
      {
        title: 'Grow online sales',
        items: [
          { label: 'Online Ordering', href: '#online-ordering', icon: 'fa-solid fa-bag-shopping' },
          { label: 'Smart Upsells', href: '#smart-upsells', icon: 'fa-solid fa-chart-line' },
          { label: 'Delivery', href: '#delivery', icon: 'fa-solid fa-truck-fast' },
          { label: 'Catering', href: '#catering', icon: 'fa-solid fa-mug-hot' },
          { label: 'AI Phone Ordering', href: '#ai-phone-ordering', icon: 'fa-solid fa-phone', badge: 'Waitlist' }
        ]
      },
      {
        title: 'Run your restaurant',
        items: [
          { label: 'Owner App', href: '#owner-app', icon: 'fa-solid fa-laptop' },
          { label: 'Reporting & Analytics', href: '#reporting-analytics', icon: 'fa-solid fa-chart-pie' },
          { label: 'Kitchen Tablet', href: '#kitchen-tablet', icon: 'fa-solid fa-tablet-screen-button' },
          { label: 'POS Integrations', href: '#pos-integrations', icon: 'fa-regular fa-credit-card' }
        ]
      }
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Website',
    label: 'E-COMMERCE',
    href: '#ecommerce',
    image: 'e-commerce.jpg',
    imageTitle: 'Create a modern online store built to convert.',
    groups: [
      {
        title: 'Build your store',
        items: [
          { label: 'Modern Storefront', href: '#ecommerce', icon: 'fa-solid fa-store' },
          { label: 'Product Catalogue', href: '#ecommerce', icon: 'fa-solid fa-box-open' },
          { label: 'Mobile Commerce', href: '#ecommerce', icon: 'fa-solid fa-mobile-screen' }
        ]
      },
      {
        title: 'Improve shopping',
        items: [
          { label: 'Product Discovery', href: '#ecommerce', icon: 'fa-solid fa-magnifying-glass' },
          { label: 'Easy Navigation', href: '#ecommerce', icon: 'fa-solid fa-compass' }
        ]
      },
      {
        title: 'Grow online sales',
        items: [
          { label: 'Online Selling', href: '#ecommerce', icon: 'fa-solid fa-cart-shopping' },
          { label: 'Conversion Focused', href: '#ecommerce', icon: 'fa-solid fa-arrow-trend-up' }
        ]
      },
      {
        title: 'Manage your store',
        items: [
          { label: 'Store Management', href: '#ecommerce', icon: 'fa-solid fa-sliders' }
        ]
      }
    ]
  },
  {
    id: 'pos',
    title: 'Cloud POS',
    label: 'CLOUD POS',
    href: '#pos',
    image: 'customer-business.jpg',
    imageTitle: 'Keep sales and everyday operations connected.',
    groups: [
      {
        title: 'Manage sales',
        items: [
          { label: 'Point of Sale', href: '#pos', icon: 'fa-solid fa-desktop' },
          { label: 'Sales Management', href: '#pos', icon: 'fa-solid fa-chart-column' }
        ]
      },
      {
        title: 'Manage products',
        items: [
          { label: 'Product Management', href: '#pos', icon: 'fa-solid fa-boxes-stacked' },
          { label: 'Inventory', href: '#pos', icon: 'fa-solid fa-warehouse' }
        ]
      },
      {
        title: 'Run your business',
        items: [
          { label: 'Cloud Access', href: '#pos', icon: 'fa-solid fa-cloud' },
          { label: 'Daily Operations', href: '#pos', icon: 'fa-solid fa-gears' }
        ]
      },
      {
        title: 'Grow with Cartinno',
        items: [
          { label: 'Scalable POS', href: '#pos', icon: 'fa-solid fa-arrow-trend-up' }
        ]
      }
    ]
  }
]

export const MV_ECOMMERCE_URL = 'https://cartinno.com/multivendor-ecommerce-portal/'
export const MV_FOOD_URL = 'https://cartinno.com/multivendor-food-portal/'

// Corporate Solutions: hovering an item changes BOTH cards.
// colors = [top, bottom] of the gradient card. image = photo card.
export const corporateSolutions = [
  {
    id: 'marketplace',
    colors: ['#5d5d5fff', '#0a0a0aff'],
    title: 'Multivendor E-Commerce Portal',
    href: MV_ECOMMERCE_URL,
    icon: 'fa-solid fa-store',
    label: 'E-COMMERCE MARKETPLACE',
    designTitle: 'Bring every vendor together.',
    description: 'Create one marketplace where customers can discover products from multiple sellers.',
    photoTitle: 'One marketplace. More possibilities.',
    image: 'e-commerce.jpg',
    alt: 'E-commerce marketplace',
    imagePosition: 'center',
    related: 'multivendor-pos',
    relatedTitle: 'Connected POS'
  },
  {
    id: 'multivendor-pos',
    colors: ['#f83232ff', '#060606ff'],
    title: 'Multivendor E-Commerce POS',
    href: MV_ECOMMERCE_URL,
    icon: 'fa-solid fa-desktop',
    label: 'MULTIVENDOR E-COMMERCE POS',
    designTitle: 'Connect vendors and sales.',
    description: 'Support vendor sales and everyday operations across your marketplace.',
    photoTitle: 'A connected view of vendor operations.',
    image: 'food-delivery.jpg',
    alt: 'Multivendor point of sale',
    imagePosition: '75% center',
    related: 'marketplace',
    relatedTitle: 'Connected portal'
  },
  {
    id: 'food-portal',
    colors: ['#5d5d5fff', '#0a0a0aff'],
    title: 'Multivendor Food Portal',
    href: MV_FOOD_URL,
    icon: 'fa-solid fa-store',
    label: 'FOOD MARKETPLACE',
    designTitle: 'Many restaurants. One destination.',
    description: 'Connect restaurants and customers through a shared online ordering experience.',
    photoTitle: 'Make every restaurant easier to discover.',
    image: 'food.jpg',
    alt: 'Restaurant food marketplace',
    imagePosition: 'center',
    related: 'food-pos',
    relatedTitle: 'Connected POS'
  },
  {
    id: 'food-pos',
    colors: ['#f83232ff', '#060606ff'],
    title: 'Multivendor Food POS',
    href: MV_FOOD_URL,
    icon: 'fa-solid fa-desktop',
    label: 'FOOD POS',
    designTitle: 'Keep restaurant sales connected.',
    description: 'Bring restaurant orders and point-of-sale workflows into one connected experience.',
    photoTitle: 'Support every restaurant, every day.',
    image: 'customer-business.jpg',
    alt: 'Restaurant point of sale',
    imagePosition: '25% center',
    related: 'food-portal',
    relatedTitle: 'Connected portal'
  }
]

export const links = [
  { label: 'Home', href: '/' },
  { label: 'Products', menu: 'products' },
  { label: 'Corporate Solutions', menu: 'corporate' },
  { label: 'Clients', href: '#clients' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' }
]