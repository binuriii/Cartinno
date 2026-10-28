export const contactHeading = {
  title: 'Contact Our Offices',
  description:
    'Reach our team at the office closest to you, or call one of our local support lines.'
}

/*
  FLAG IMAGES
  Files are in /public/Products/Contact/
*/
const flags = 'Products/Contact/'

export const offices = [
  {
    id: 'usa',
    flag: `${flags}united-states-1.svg`,
    name: 'Sepova LLC',
    address: ['Bethlehem, PA', '18020', 'USA'],
    lines: [
      {
        label: 'Toll-Free Number',
        value: '8446 SEPOVA (737682)',
        tel: '+18446737682'
      },
      {
        value: '8446 737 682',
        tel: '+18446737682'
      },
      {
        label: 'International Line',
        value: '+1 (484) 456-4446',
        tel: '+14844564446'
      }
    ],
    email: 'support@sepova.com'
  },
  {
    id: 'sri-lanka',
    flag: `${flags}sri-lanka.svg`,
    name: 'Sepova PVT Ltd',
    address: ['207/09 Dharmapala Mawatha', 'Colombo 7', 'Sri Lanka'],
    lines: [
      {
        label: 'Local Line',
        value: '0112 000 551',
        tel: '+94112000551'
      }
    ],
    email: 'info@sepova.com'
  }
]

export const countries = [
  { id: 'australia', flag: `${flags}australia.svg`, name: 'Australia', phone: '61 (2) 888 00 333' },
  { id: 'argentina', flag: `${flags}argentina.svg`, name: 'Argentina', phone: '54 11 535 28 633' },
  { id: 'belgium', flag: `${flags}belgium.svg`, name: 'Belgium', phone: '32 (48) 0206233' },
  { id: 'brazil', flag: `${flags}brazil.svg`, name: 'Brazil', phone: '55 (21) 204 222 60' },
  { id: 'canada', flag: `${flags}canada.svg`, name: 'Canada', phone: '1 403 8000 111' },
  { id: 'denmark', flag: `${flags}denmark.svg`, name: 'Denmark', phone: '45 32 33 0471' },
  { id: 'finland', flag: `${flags}finland.svg`, name: 'Finland', phone: '358 (9) 21114' },
  { id: 'israel', flag: `${flags}il.png`, name: 'Israel', phone: '972 (3) 376 06 60' },
  { id: 'kenya', flag: `${flags}kenya.svg`, name: 'Kenya', phone: '254 20 878 0 777' },
  { id: 'mexico', flag: `${flags}mexico.svg`, name: 'Mexico', phone: '52 55 981 61 222' },
  { id: 'netherlands', flag: `${flags}netherlands.svg`, name: 'Netherlands', phone: '3197010285411' },
  { id: 'new-zealand', flag: `${flags}new-zealand.svg`, name: 'New Zealand', phone: '64 (9) 9518222' },
  { id: 'peru', flag: `${flags}peru.svg`, name: 'Peru', phone: '51 (17) 009 559' },
  { id: 'poland', flag: `${flags}poland.svg`, name: 'Poland', phone: '48 732 082 666' },
  { id: 'singapore', flag: `${flags}singapore.svg`, name: 'Singapore', phone: '65 (3) 125 88 33' },
  { id: 'south-africa', flag: `${flags}south-africa.svg`, name: 'South Africa', phone: '27 (21) 300 37 33' },
  { id: 'sweden', flag: `${flags}sweden.svg`, name: 'Sweden', phone: '46 (10) 3371414' },
  { id: 'switzerland', flag: `${flags}switzerland.svg`, name: 'Switzerland', phone: '41 44 707 83 88' },
  { id: 'uk', flag: `${flags}united-kingdom.svg`, name: 'UK', phone: '44 (203) 80 75 999' },
  { id: 'ukraine', flag: `${flags}ukraine.svg`, name: 'Ukraine', phone: '380 94 711 24 22' }
]