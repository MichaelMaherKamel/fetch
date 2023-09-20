import HeaderNav from '@/components/navbar/HeaderNav'

interface LobbyLayoutProps {
  children: React.ReactNode
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  return (
    <div className='relative felx min-h-screen flex-col'>
      <HeaderNav />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
