const all = [true, true, true, true]
const noNoYesYes = [false, false, true, true]

export const pricingFeatureGroups = [
  {
    title: 'PRICING',
    features: [
      {
        label: 'Yearly',
        badge: '2 months free',
        values: [100, 170, 335, 500],
        lkrValues: [50000, 75000, 100000, 150000],
        currencyValues: true,
      },
      {
        label: 'Price (Monthly)',
        values: [16.67, 18, 35, 50],
        lkrValues: [5000, 7500, 10000, 15000],
        currencyValues: true,
      },
      { label: 'Your own domain', values: all },
      { label: 'Free SSL', values: all },
      {
        label: 'Number of Products',
        values: ['50', '500', '5000', 'Unlimited'],
      },
      {
        label: 'Additional Staff accounts',
        values: ['1', '10', '15', 'Unlimited'],
      },
    ],
  },
  {
    title: 'MARKETING',
    features: [
      { label: 'List with Multivendor', values: all },
      { label: 'Receive offers via system (OTP registered)', values: all },
      { label: 'Unlimited customers', values: all },
      { label: 'Customer Grouping', values: all },
      { label: 'Marketing automation', values: [false, true, true, true] },
      { label: 'Abandoned recovery', values: all },
      { label: 'Discount Codes', values: all },
      { label: 'Gift cards', values: all },
      { label: 'Category Wise Promotions', values: all },
      { label: 'Product wise promotions', values: all },
      { label: 'Entire site promotions', values: all },
      { label: 'Schedule Promotions', values: all },
    ],
  },
  {
    title: 'SHIPPING',
    features: [
      { label: 'Custom Delivery charges', values: all },
    ],
  },
  {
    title: 'SECURITY',
    features: [
      { label: 'DDOS Protection', values: all },
      { label: 'Immunify 360 software firewall', values: all },
    ],
  },
  {
    title: 'EMAILS',
    features: [
      { label: 'Email accounts', values: ['1', '3', '5', '10'] },
      {
        label: 'Email storage',
        values: [
          '3 GB per email',
          '5 GB per email',
          '10 GB per email',
          '15 GB per email',
        ],
      },
      { label: 'Web based panel', values: all },
      { label: 'Email Clients', values: all },
      { label: 'Email with your own domains', values: all },
    ],
  },
  {
    title: 'MULTIVENDOR MARKETPLACE',
    features: [
      { label: 'List products on Multivendor marketplace', values: all },
    ],
  },
  {
    title: 'TAX',
    features: [
      { label: 'Unlimited Tax categories', values: all },
    ],
  },
  {
    title: 'B2B BUSINESS',
    features: [
      {
        label: 'B2B pricing discount % product quantity based',
        values: noNoYesYes,
      },
      {
        label: 'Wholesale pricing slabs category wise',
        values: noNoYesYes,
      },
      { label: 'Wholesale accounts', values: noNoYesYes },
      { label: 'Wholesaler Wallets', values: noNoYesYes },
    ],
  },
{
  title: 'POS',
  features: [
    {
      label: 'Local POS (Monthly)',
      values: [10, 18, 35, 50],
      lkrValues: [3000, 5000, 10000, 15000],
      currencyValues: true,
    },
    {
      label: 'Local POS (Yearly)',
      badge: '2 months free',
      values: [100, 170, 335, 500],
      lkrValues: [30000, 50000, 100000, 150000],
      currencyValues: true,
    },
  ],
},
  {
    title: 'CLOUD PBX',
    features: [
      {
        label: '1 SC Cloud PBX (3CX)',
        values: [false, false, 'Free', 'Free'],
      },
    ],
  },
]
