export const posGridContent = {
  heading: {
    main: "How Owner connects",
    muted: "with your existing POS"
  },

  cards: {
    top: {
      label: "Works with your POS",
      title: "Online orders go straight to your POS. Nothing changes on your end.",
      items: [
        { name: "Ramen",         price: "$89.99", src: "/Cartinno/ramen.webp" },
        { name: "Sushi Set",     price: "$16.99", src: "/Cartinno/sushiSet.webp" },
        { name: "Chicken Curry", price: "$14.99", src: "/Cartinno/curry.webp" }
      ]
    },
    bottomLeft: {
      label: "No extra hardware",
      title: "Keep your printers, your screens, and your kitchen setup.",
      image: {
        src: "/Cartinno/medium-shot-woman-holding-glass.jpg",
        alt: "Restaurant kitchen setup"
      }
    },
    bottomRight: {
      label: "Supported systems",
      title: "Toast, Square, Clover, Lightspeed and more.",
      // Order matches the positions .pig-t1 ... .pig-t6 in the CSS
      tiles: [
        { src: "/Cartinno/side-view-baked-sea-bass-served-with-fresh-herbs-sauces-table.webp", add: true },
        { src: "/Cartinno/side-view-mini-meat-burgers-with-olives.webp" },
        { src: "/Cartinno/pasta.webp", add: true },
        { src: "/Cartinno/top-view-chicken-sac-with-fried-potatoes-tomato-lavash-smoke.webp", add: true },
        { src: "/Cartinno/delicious-food-prepared-jewish-hanukkah-celebration.webp" },
        { src: "/Cartinno/top-view-traditional-caucasian-cuisine-saj-kebab-with-chicken-eggplans-tomatoes-potatoes-peppers.webp", badge: "Limited" }
      ]
    }
  }
};