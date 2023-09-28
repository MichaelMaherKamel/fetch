import { Shell } from '@/components/ui/shell'
import { PageHeader } from '@/components/ui/page-header'
import { Separator } from '@/components/ui/separator'

const PaymentMethod = () => {
  return (
    <Shell variant='sidebar'>
      <PageHeader title='Payment Method' description=' Setup your Payment Method.' size='sm' />
      <Separator />
    </Shell>
  )
}

export default PaymentMethod
