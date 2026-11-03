export const posGridContent = {
  heading: {
    main: 'How Cartinno connects',
    muted: 'with your existing POS'
  },

  cards: {
    top: {
      label: 'Works with your POS',
      title:
        'Online orders go straight to your POS. Nothing changes on your end.',

      items: [
        {
          name: 'Ramen',
          price: '$89.99',
          src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=60'
        },
        {
          name: 'Chicken Curry',
          price: '$14.99',
          src: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=900&auto=format&fit=crop&q=60'
        },
        {
          name: 'Sushi Set',
          price: '$16.99',
          src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=900&auto=format&fit=crop&q=60'
        }
      ]
    },

    bottomLeft: {
      label: 'No extra hardware',
      title:
        'Keep your printers, your screens, and your kitchen setup.',

      image: {
        src: '/Cartinno/medium-shot-woman-holding-glass.jpg',
        alt: 'Restaurant kitchen setup'
      }
    },

    bottomRight: {
      label: 'Supported systems',
      title:
        'Toast, Square, Clover, Lightspeed and more.',

      // Order matches the positions .pig-t1 to .pig-t6
      tiles: [
        {
          src: './Products/POSIntegrations/side-view-baked-sea-bass-served-with-fresh-herbs-sauces-table.webp',
          add: true
        },
        {
          src: './Products/POSIntegrations/side-view-mini-meat-burgers-with-olives.webp'
        },
        {
          src: './Products/POSIntegrations/pasta.webp',
          add: true
        },
        {
          src: './Products/POSIntegrations/top-view-chicken-sac-with-fried-potatoes-tomato-lavash-smoke.webp',
          add: true
        },
        {
          src: './Products/POSIntegrations/delicious-food-prepared-jewish-hanukkah-celebration.webp'
        },
        {
          src: './Products/POSIntegrations/top-view-traditional-caucasian-cuisine-saj-kebab-with-chicken-eggplans-tomatoes-potatoes-peppers.webp',
          badge: 'Limited'
        }
      ]
    }
  }
}
