import { DashboardHeader } from '@/components/dashboard/dashboard-Header'
import { DashboardFooter } from '@/components/dashboard/dashboard-Footer'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <DashboardHeader />
      <div className='flex-1'>{children}</div>
      <DashboardFooter />
    </div>
  )
}

export default DashboardLayout
