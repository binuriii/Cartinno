export const journeyContent = {
  title1: 'From first call to fully connected,',
  title2: 'in four simple steps',
  description:
    'Cartinno sets up your phone system, trains your team and keeps you supported at every step.',
  /* how long each step stays open before moving to the next (ms) */
  duration: 7000
}

export const journeySteps = [
  {
    id: 'choose',
    tab: '1. Choose',
    tabText: 'Pick your numbers, extensions and plan to suit how your team takes calls.',
    tint: '#ffece2',
    accent: '#ffb08a',
    accent2: '#ffd9a0',
    title: 'Start with the setup that fits',
    description:
      'Choose local or toll-free numbers, decide how many extensions your team needs and pick the plan that suits your business.',
    panelTitle: 'Choose your setup',
    float: { tag: 'Selected', title: 'Your setup is ready', text: 'Next, connect your calls' }
  },
  {
    id: 'connect',
    tab: '2. Connect',
    tabText: 'Link 3CX with Cartinno so calls and customer records work together.',
    tint: '#fde7ee',
    accent: '#ff9fbd',
    accent2: '#c9b5ff',
    title: 'Connect calls to customers',
    description:
      'We set up 3CX with your Cartinno store so incoming calls can be matched with the customer details your business already holds.',
    panelTitle: 'Connect your phone system',
    float: { tag: 'Connected', title: 'Calls linked to customers', text: 'Details appear on every call' }
  },
  {
    id: 'launch',
    tab: '3. Train & Launch',
    tabText: 'Product training for your team, then take your first calls.',
    tint: '#e2f3e7',
    accent: '#7fd8a8',
    accent2: '#9fd4ff',
    title: 'Learn it, then launch it',
    description:
      'Training sessions help your team get comfortable with the phone system and customer details on screen. Then your line goes live.',
    panelTitle: 'Product training',
    float: { tag: 'Live', title: 'Your phone line is open', text: 'Start taking calls today' }
  },
  {
    id: 'grow',
    tab: '4. Grow',
    tabText: 'Add extensions and review call activity as your business grows.',
    tint: '#fbf1c9',
    accent: '#ffd36b',
    accent2: '#ff9f80',
    title: 'Keep growing, keep supported',
    description:
      'Add extensions and numbers whenever you need them, review call activity and get help from our team along the way.',
    panelTitle: 'This week’s calls',
    float: { tag: 'Support', title: 'Here when you need us', text: 'Talk to our team anytime' }
  }
]

export const cta = { text: 'Get Started', href: '/#demo' }

export const scenes = {
  choose: [
    { title: 'Local number', text: 'A number customers recognise' },
    { title: 'Toll-free number', text: 'Free for customers to call' },
    { title: 'Team extensions', text: 'One for each team member' }
  ],
  connect: {
    left: '3CX',
    connecting: 'Connecting…',
    connected: 'Connected',
    checks: ['Numbers added', 'Extensions created', 'Customer records linked']
  },
  launch: {
    checks: ['Answer calls', 'Transfer to a colleague', 'See customer details'],
    ready: 'Ready to go live'
  },
  grow: {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bars: [38, 54, 46, 72, 90],
    total: '248',
    totalLabel: 'calls handled',
    chip: 'Add extension'
  }
}

export const icons = {
  check: '<path d="m5 12.5 5 5L19.5 7"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>'
}
