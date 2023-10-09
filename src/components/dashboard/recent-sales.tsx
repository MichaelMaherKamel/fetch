import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Sale = {
  id: string
  name: string
  email: string
  amount: string
}

interface RecentSalesProps {
  recentSales: Sale[]
}

const RecentSales: React.FC<RecentSalesProps> = ({ recentSales }) => {
  return (
    <div className='space-y-8'>
      {recentSales.map(({ id, name, email, amount }) => (
        // Flex-Wrap fixed the issue for responssive design
        <div key={id} className='flex flex-wrap sm:flex-row items-center'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>

          <div className='ml-2 space-y-1'>
            <p className='font-medium leading-none text-sm'>{name}</p>
            <p className='text-sm'>{email}</p>
          </div>
          <div className='ml-auto font-medium text-sm'>{`+${amount}`}</div>
        </div>
      ))}
    </div>
  )
}

export default RecentSales
