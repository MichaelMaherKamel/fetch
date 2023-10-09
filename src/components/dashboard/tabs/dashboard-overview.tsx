import { Overview } from '../overview'
import RecentSales from '../recent-sales'
import DashboardStat from '../dashboard-stat'
import DashboardCard from '../dashboard-card'
import { generateFakeSales } from '../index'

const DASHBOARD_STATS = [
  {
    id: '1',
    title: 'Total Revenue',
    stat: '$45,231.89',
    desc: '+20.1% from last month',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='h-4 w-4 text-muted-foreground'
      >
        <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Subscriptions',
    stat: '23,542',
    desc: '+22.1% from last month',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='h-4 w-4 text-muted-foreground'
      >
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Sales',
    stat: '$45,231.89',
    desc: '+48.1% from last month',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='h-4 w-4 text-muted-foreground'
      >
        <rect width='20' height='14' x='2' y='5' rx='2' />
        <path d='M2 10h20' />
      </svg>
    ),
  },
  {
    id: '4',
    title: 'Total Revenue',
    stat: '$45,231.89',
    desc: '+20.1% from last month',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='h-4 w-4 text-muted-foreground'
      >
        <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
      </svg>
    ),
  },
]

const sales = generateFakeSales(8)

export const DashboardOverView = () => {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {DASHBOARD_STATS.map(({ id, title, stat, desc, icon }) => (
          <DashboardStat key={id} title={title} stat={stat} desc={desc} icon={icon} />
        ))}
      </div>

      <div className='grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <DashboardCard title='Overview' content={<Overview />} />
        <DashboardCard
          title='Recent Sales'
          desc='You made 265 sales this month.'
          content={<RecentSales recentSales={sales} />}
        />
      </div>
    </>
  )
}
