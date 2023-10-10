'use client'

import { Store, NewStoreParams, insertStoreParams } from '@/lib/db/schema/stores'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { trpc } from '@/lib/trpc/client'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const StoreForm = ({ store, closeModal }: { store?: Store; closeModal?: () => void }) => {
  const editing = !!store?.id
  const router = useRouter()
  const utils = trpc.useContext()

  const form = useForm<z.infer<typeof insertStoreParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertStoreParams),
    defaultValues: store ?? {
      name: '',
      description: '',
    },
  })

  const onSuccess = (action: 'create' | 'update' | 'delete') => {
    utils.stores.getStores.invalidate()
    router.refresh()
    closeModal?.()
    toast.success(`Store ${action}d! successfully 🎉`)
  }

  const { mutate: createStore, isLoading: isCreating } = trpc.stores.createStore.useMutation({
    onSuccess: () => onSuccess('create'),
  })

  const { mutate: updateStore, isLoading: isUpdating } = trpc.stores.updateStore.useMutation({
    onSuccess: () => onSuccess('update'),
  })

  const { mutate: deleteStore, isLoading: isDeleting } = trpc.stores.deleteStore.useMutation({
    onSuccess: () => onSuccess('delete'),
  })

  const handleSubmit = (values: NewStoreParams) => {
    if (editing) {
      updateStore({ ...values, id: store.id })
    } else {
      createStore(values)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-8'}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='mr-1' disabled={isCreating || isUpdating}>
          {editing ? `Sav${isUpdating ? 'ing...' : 'e'}` : `Creat${isCreating ? 'ing...' : 'e'}`}
        </Button>
        {editing ? (
          <Button type='button' variant={'destructive'} onClick={() => deleteStore({ id: store.id })}>
            Delet{isDeleting ? 'ing...' : 'e'}
          </Button>
        ) : null}
      </form>
    </Form>
  )
}

export default StoreForm
