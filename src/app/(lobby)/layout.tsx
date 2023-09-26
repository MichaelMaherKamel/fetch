import { SiteFooter } from '@/components/ui/siteFooter'
import SiteHeader from '@/components/ui/siteHeader'

interface LobbyLayoutProps {
  children: React.ReactNode
}

const LobbyLayout = ({ children }: LobbyLayoutProps) => {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}

export default LobbyLayout
