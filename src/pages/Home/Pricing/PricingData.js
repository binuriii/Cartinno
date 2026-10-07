export const badge = { text: 'First month free · No setup fee' }

export const headline = { pre: 'Switch and Save ', highlight: ' 40% less.', post: 'Get far more.' }

export const columns = {
  us: 'Cartinno',
  them: 'Others'
}

/*
  them: 'yes'     -> check
        'no'      -> cross
        'partial' -> dash
*/
export const rows = [
  {
    label: 'The lowest pricing',
    text: 'Plans from $15/month, with your first month free and no setup fee.',
    them: 'no'
  },
  {
    label: 'Platform transaction fees',
    value: '0% ',
    text: 'platform transaction fees. You keep every sale you make.',
    them: 'no'
  },
  {
    label: 'Ecommerce website & POS',
    text: 'Online store plus Cartinno POS, included free with the Growth plan.',
    them: 'partial'
  },
  {
    label: 'Marketing tools built in',
    text: 'SMS notifications, loyalty programs, lead manager and WhatsApp Business API.',
    them: 'partial'
  },
  {
    label: 'Free business phone system',
    text: 'Free {logo} integration with a number, so calls and orders live in one place.', // {logo} = where the image appears
    logo: 'pbx-logo.png', // file placed in /public (official 3CX logo)
    them: 'no'
  },
  {
    label: 'Open REST API',
    text: 'Connect Cartinno to your own tools with our REST API.',
    them: 'yes'
  },
  {
    label: '100% local support',
    text: 'Your own dedicated account manager, happy to help.',
    them: 'partial'
  }
]

export const cta = 'Get Started'

export const footnote = '100% local support — your own dedicated account manager.'