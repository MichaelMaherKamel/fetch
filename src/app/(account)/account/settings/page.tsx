import Account from '@/components/account/Account'
import { Shell } from '@/components/ui/shell'
import { PageHeader } from '@/components/ui/page-header'
import { Separator } from '@/components/ui/separator'

const AccountSettings = () => {
  return (
    <Shell variant='sidebar'>
      <PageHeader title='Account' description='Manage your account settings.' size='sm' />
      <Separator />
      <div className='w-full overflow-hidden'>
        <Account />
      </div>
    </Shell>
  )
}

export default AccountSettings
