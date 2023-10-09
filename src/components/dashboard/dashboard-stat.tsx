import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface DashboardStatProps {
  title: string
  stat: string
  desc: string
  icon: JSX.Element
}

const DashboardStat: React.FC<DashboardStatProps> = ({ title, stat, desc, icon }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <div className='text-muted'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{stat}</div>
        <p className='text-xs text-muted-foreground'>{desc}</p>
      </CardContent>
    </Card>
  )
}

export default DashboardStat
