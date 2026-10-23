export const kitchenFAQs = [
  {
    id: 1,
    question: "Do I need to buy specific hardware or tablets?",
    answer: "No, Cartinno runs in the cloud and works in any web browser on your existing desktop, tablet, or phone. Hardware like thermal printers and cash drawers can be integrated, but the software itself requires nothing to install."
  },
  {
    id: 2,
    question: "How does it handle my online orders?",
    answer: "Every account includes a customer-facing ordering website on your own domain with 0% commission. Online orders sync directly with the POS and fire to the kitchen automatically."
  },
  {
    id: 3,
    question: "Will it track my ingredients and stock?",
    answer: "Yes, the inventory module provides real-time stock tracking. You can map a recipe once, and ingredients are automatically deducted as products sell, complete with low-stock alerts."
  }
];

export const kitchenHero = {
  fixedLine: "Kitchen Tablet,",

  rotatingWords: [
    "Runs Every Order.",
    "Fully Connected.",
    "Zero Hardware Lock-in.",
    "Live Stock Sync."
  ],

  description:
    "One platform for your online store, your counter, your phone line, and your stock room all working from a single set of data, online and offline. We don't just take orders; we run the whole service.",

  backgroundImage:
    "https://images.unsplash.com/photo-1775534778375-3f235c466c58?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",

  overlayOpacity: 0.6,

  backgroundPosition: "center center",

  primaryButton: {
    text: "Get Started Today",
    link: "/#contact",
  },

  secondaryButton: {
    text: "Request a Demo",
    link: "/#demo",
  },

  interval: 3500,
};