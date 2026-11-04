export const journeyContent = {
  title1: 'From Everyday Tasks to',
  title2: 'A Smoother Business Day',
  description: 'Bring your daily workflows together with Cartinno, from the first order to the end-of-day review.',
  duration: 7000
}
export const journeySteps = [
  {
    id:'organise', tab:'1. Organise', tabText:'Bring products, people and priorities into one clear view.',
    tint:'#ffece2', accent:'#ffb08a', accent2:'#ffd9a0',
    title:'Start with a clear view of the day',
    description:'Keep the essentials organised before business gets busy. Review products, stock, team responsibilities and the tasks that need attention.',
    panelTitle:'Today’s priorities',
    float:{tag:'Organised',title:'Your day is taking shape',text:'Key tasks are in view'}
  },
  {
    id:'process', tab:'2. Process', tabText:'Handle sales, orders and payments in connected workflows.',
    tint:'#fde7ee', accent:'#ff9fbd', accent2:'#c9b5ff',
    title:'Keep every transaction moving',
    description:'Manage customer orders, process sales and keep billing activity connected. Give your team a consistent way to complete everyday transactions.',
    panelTitle:'Connected transactions',
    float:{tag:'Synced',title:'Orders and sales connected',text:'Less repeated data entry'}
  },
  {
    id:'coordinate', tab:'3. Coordinate', tabText:'Keep inventory and team activity aligned as work happens.',
    tint:'#e2f3e7', accent:'#7fd8a8', accent2:'#9fd4ff',
    title:'Keep your people and stock in sync',
    description:'Follow stock movement and coordinate team responsibilities as the day unfolds. Help staff stay informed and ready to serve customers.',
    panelTitle:'Daily operations checklist',
    float:{tag:'On track',title:'Your team is in sync',text:'Important tasks are covered'}
  },
  {
    id:'review', tab:'4. Review & Improve', tabText:'Use reports to understand performance and plan what comes next.',
    tint:'#fbf1c9', accent:'#ffd36b', accent2:'#ff9f80',
    title:'Finish the day with useful insight',
    description:'Review sales activity, operational performance and business trends. Use a clearer picture of the day to make better decisions for tomorrow.',
    panelTitle:'Daily business overview',
    float:{tag:'Insights ready',title:'See how the day performed',text:'Make your next move with clarity'}
  }
]
export const cta = { text:'Explore Cartinno', href:'/#demo' }
export const scenes = {
  organise:[
    {title:'Review today’s orders',text:'See new and pending requests'},
    {title:'Check product availability',text:'Know what is ready to sell'},
    {title:'Assign team responsibilities',text:'Keep daily tasks clear'}
  ],
  process:{
    left:'Orders', connecting:'Updating…', connected:'Synced',
    checks:['Sales and billing recorded','Order status kept updated','Customer details accessible']
  },
  coordinate:{
    checks:['Stock movement reviewed','Team tasks assigned','Customer requests followed up'],
    ready:'Daily workflow on track'
  },
  review:{
    days:['Mon','Tue','Wed','Thu','Fri'], bars:[38,54,46,72,90],
    total:'248', totalLabel:'transactions today', chip:'View report'
  }
}
export const icons = {
  check:'<path d="m5 12.5 5 5L19.5 7"/>',
  plus:'<path d="M12 5v14"/><path d="M5 12h14"/>'
}
