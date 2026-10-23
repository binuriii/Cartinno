export const campaignBenefitsContent = {
  headingFirst: 'Good ideas. Beautiful campaigns.',
  headingSecond: 'All coming together.',
  description:
    'Build your offer, find your audience and see what connects. Bring more clarity to every campaign with Cartinno.'
}

export const campaignBenefits = [
  {
    id: 'offers',
    number: '01',
    title: 'Offers worth opening',
    description: 'Create seasonal promotions, flash sales and vouchers that put your products in the spotlight.'
  },
  {
    id: 'audience',
    number: '02',
    title: 'A more personal approach',
    description: 'Use customer groups to make your campaign more relevant to the people receiving it.'
  },
  {
    id: 'channels',
    number: '03',
    title: 'Keep the conversation going',
    description: 'Reach customers with email and SMS updates about launches, offers and moments that matter.'
  },
  {
    id: 'schedule',
    number: '04',
    title: 'Ready for the right moment',
    description: 'Plan ahead for your next launch or seasonal event with campaign scheduling options.'
  },
  {
    id: 'insights',
    number: '05',
    title: 'A clearer view of what works',
    description: 'Review engagement and voucher redemptions to inform your next promotion.'
  }
]

// Illustrative UI content only. No real campaign or customer records.
export const campaignDemo = {
  name: 'Weekend favourites',
  code: 'WEEKEND10',
  discount: '10%',
  emailSubject: 'Your weekend starts here.',
  emailCopy: 'A few favourites. A little inspiration. Find something you love.',
  smsCopy: 'Your weekend favourites are here. Explore the collection and find your next favourite.',
  calendarMonth: 'December 2026',
  weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  calendarCells: [null, ...Array.from({ length: 31 }, (_, i) => i + 1)],
  scheduleDate: 18,
  scheduleLabel: 'Fri, 18 Dec',
  scheduleTime: '9:00 AM',
  chartDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
}

export const demoAudiences = [
  { initials: 'RC', name: 'Returning customers', count: 240, tone: 'rose' },
  { initials: 'NS', name: 'New subscribers', count: 180, tone: 'sand' },
  { initials: 'VC', name: 'VIP customers', count: 86, tone: 'sage' }
]

// Each phase is a frame in the automatic demonstration.
export const campaignDemoFrames = [
  {
    label: 'Prepare',
    offer: 'Draft',
    audience: 'Choose groups',
    channel: 'Compose',
    schedule: 'Choose a date',
    insight: 'Review activity',
    emailEngagement: '18%',
    clicks: '54',
    redemptions: '12',
    selectedCount: 240,
    bars: [19, 25, 22, 34, 29, 42, 48]
  },
  {
    label: 'Preview',
    offer: 'Preview',
    audience: 'Audience ready',
    channel: 'Preview',
    schedule: 'Set the time',
    insight: 'Explore engagement',
    emailEngagement: '31%',
    clicks: '96',
    redemptions: '24',
    selectedCount: 420,
    bars: [24, 36, 31, 52, 44, 63, 72]
  },
  {
    label: 'Ready',
    offer: 'Ready',
    audience: 'Selection saved',
    channel: 'Ready to share',
    schedule: 'Scheduled',
    insight: 'See the results',
    emailEngagement: '42%',
    clicks: '128',
    redemptions: '36',
    selectedCount: 506,
    bars: [28, 43, 37, 63, 54, 78, 92]
  }
]

export const campaignDemoTiming = { phaseDuration: 2400 }