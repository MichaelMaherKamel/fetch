import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface DashboardCardProps {
  title: string
  desc?: string
  content: JSX.Element
  className?: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, desc, content, className }) => {
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

export default DashboardCard
