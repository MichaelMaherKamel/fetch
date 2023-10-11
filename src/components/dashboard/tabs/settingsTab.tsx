import { type Store } from '@/lib/db/schema/stores'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

import StoreForm from '@/components/stores/StoreForm'

export const StoreSettings = ({ store }: { store?: Store }) => {
  return (
    <div className='space-y-6'>
      <Card id='store-settings' aria-labelledby='store-settings-heading'>
        <CardHeader className='space-y-1'>
          <div className='mb-5'>
            <CardTitle className='text-2xl'>Update your Store</CardTitle>
            <CardDescription>Update your store information, or delete your store.</CardDescription>
          </div>
          <CardContent>
            <StoreForm store={store} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
