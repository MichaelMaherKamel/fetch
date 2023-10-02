import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from '@/components/forms/apperance'
import { PageHeader } from '@/components/ui/page-header'
import { Shell } from '@/components/ui/shell'

export default function AppearanceSeetingsPage() {
  return (
    <Shell variant='sidebar'>
      <PageHeader
        title='Appearance'
        description=' Customize the appearance of the app. Automatically switch between day and night themes.'
        size='sm'
      />
      <Separator />
      <div className='w-full overflow-hidden'>
        <AppearanceForm />
      </div>
    </Shell>
  )
}
