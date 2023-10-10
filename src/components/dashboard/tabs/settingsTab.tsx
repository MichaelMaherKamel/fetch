'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { trpc } from '@/lib/trpc/client'
import { Store, NewStoreParams, insertStoreParams } from '@/lib/db/schema/stores'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants, Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/ui/loading-button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import StoreForm from '@/components/stores/StoreForm'

export const StoreSettings = ({ store }: { store?: Store }) => {
  return (
    <div className='space-y-6'>
      <Card id='store-settings' aria-labelledby='store-settings-heading'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Update your Store</CardTitle>
          <CardDescription>Update your store information, or delete your store.</CardDescription>
          <CardContent>
            <StoreForm store={store} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

/* <Form {...form}>
<form className='grid w-full max-w-xl gap-5'>
  <fieldset className='grid gap-2.5'>
    <Label htmlFor='name'>Name</Label>
    <Input
      id='UpdateStoreName'
      aria-describedby='UpdateStoreName'
      name='name'
      required
      minLength={3}
      maxLength={50}
      placeholder='Store Name'
      defaultValue={store?.name}
    />
  </fieldset>
  <fieldset className='grid gap-2.5'>
    <Label htmlFor='description'>Description</Label>
    <Input
      id='UpdateStoreDescription'
      aria-describedby='UpdateStoreDescription'
      name='description'
      required
      minLength={3}
      maxLength={50}
      placeholder='Store Description'
      defaultValue={store?.description ?? ''}
    />
  </fieldset>
  <div className='flex space-x-2'>
    <Button onClick={() => updateStore({ id: store?.id })}>
      Update Store
      <span className='sr-only'>Update store</span>
    </Button>
    <Button
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      // formAction={deleteStore}
      onClick={() => deleteStore({ id: store?.id })}
      variant='destructive'
    >
      Delete Store
      <span className='sr-only'>Delete store</span>
    </Button>
  </div>
</form>
</Form> */
