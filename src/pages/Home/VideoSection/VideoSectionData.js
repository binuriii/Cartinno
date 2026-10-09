/*
  IMAGE PATHS
  Files inside the Vite "public" folder are served from the site root,
  so do NOT write "public/" in the path.
    public/Meeting scheduler on a silver laptop.png
    ->  'Meeting scheduler on a silver laptop.png'
  Spaces in file names are encoded automatically by the component.

  TIP: for the section to read clearly, give every item its own pair of
  images (desktop + mobile) instead of reusing the same picture.
*/

export const showcase = {
  eyebrow: 'Built Around Your Business',

  title: 'Connected solutions. More ways to grow.',

  ctaText: 'Let’s Talk About Your Business',

  ctaHref: '/contact',

  items: [
    {
      id: 'ecommerce',
      title: 'E-Commerce Websites',
      accent: '#f07880',
      description:
        'Bring your products online with a storefront built around your brand. Connect product browsing, checkout, orders and inventory in one clear shopping experience.',
      linkText: 'Explore E-Commerce',
      href: '/products/e-commerce',
      images: [
        {
          src: 'Meeting scheduler on a silver laptop.png',
          alt: 'E-commerce website on a desktop display',
          background: '#f0e5e2',
          position: 'center'
        },
        {
          src: 'Meeting scheduler on a silver laptop.jpg',
          alt: 'Mobile shopping and product browsing',
          background: '#f3e8e9',
          position: 'center'
        }
      ]
    },

    {
      id: 'food',
      title: 'Food Ordering Websites',
      accent: '#f5a65b',
      description:
        'Give customers a simple way to discover your menu and place an order. Bring online ordering, pickup and delivery into a connected experience for your restaurant.',
      linkText: 'Explore Food Ordering',
      href: '/products/food-website',
      images: [
        {
          src: 'Meeting scheduler on a silver laptop.jpg',
          alt: 'Restaurant website and digital menu',
          background: '#f7e5d7',
          position: 'center'
        },
        {
          src: 'Nexora CRM Dashboard on Tablet.png',
          alt: 'Food ordering experience on a smartphone',
          background: '#f6edce',
          position: 'center'
        }
      ]
    },

    {
      id: 'pos',
      title: 'Cloud POS',
      accent: '#6fcfa5',
      description:
        'Keep in-store selling organised with connected products, payments and inventory. Bring your counter and online store together so everyday sales are easier to manage.',
      linkText: 'Explore Cloud POS',
      href: '/products/cloud-pos',
      images: [
        {
          src: 'Meeting scheduler on a silver laptop.png',
          alt: 'Cloud POS product selection and checkout',
          background: '#e3ece8',
          position: 'center'
        },
        {
          src: 'Meeting scheduler on a silver laptop.jpg',
          alt: 'Cloud POS orders and inventory dashboard',
          background: '#e6edf3',
          position: 'center'
        }
      ]
    },

    {
      id: 'marketplace',
      title: 'Multi-Vendor Marketplaces',
      accent: '#8fb4f2',
      description:
        'Bring multiple sellers together in one marketplace. Create a shared shopping destination with tools to organise sellers, products and orders as your business grows.',
      linkText: 'Explore Corporate Solutions',
      href: '/corporate-solutions',
      images: [
        {
          src: 'Lime Green Banking Card o.png',
          alt: 'Multi-vendor marketplace storefront',
          background: '#ede7e1',
          position: 'center'
        },
        {
          src: 'Lime Green Banking Card on Titanium Phone.png',
          alt: 'Marketplace shopping on a mobile device',
          background: '#f1e5e8',
          position: 'center'
        }
      ]
    }
  ]
}