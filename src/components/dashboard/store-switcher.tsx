'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { CaretSortIcon, CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { trpc } from '@/lib/trpc/client'
import StoreForm from '@/components/stores/StoreForm'
import { CompleteStore, type Store } from '@/lib/db/schema/stores'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcher extends PopoverTriggerProps {}

const StoreSwitcher = function StoreSwitcher({
  className,
  store,
  initialStores,
}: {
  className?: string
  store?: Store
  initialStores?: CompleteStore
}) {
  const [open, setOpen] = React.useState(false)
  const [showNewStoreDialog, setShowNewStoreDialog] = React.useState(false)
  const [selectedStore, setSelectedStore] = React.useState<Store | null>(null)

  const closeModal = () => setShowNewStoreDialog(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedSearchedStore = searchParams.get('store')

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store)
    setOpen(false)
    // router.push(`?store=${store.name}`, { scroll: false })
    router.push(`?${new URLSearchParams({ store: store.name }).toString()}`, {
      scroll: false,
    })
  }

  const getStores = trpc.stores.getStores.useQuery(undefined, {
    initialData: initialStores,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const SearchedStore = getStores.data?.stores.find((store) => store.name === selectedSearchedStore)

  return (
    <Dialog open={showNewStoreDialog} onOpenChange={setShowNewStoreDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a store'
            className={cn('justify-between', className)}
          >
            {(selectedStore?.name || SearchedStore?.name) ?? 'Stores '}
            <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              <CommandInput placeholder='Search stores...' />
              <CommandEmpty>No team found.</CommandEmpty>
              {getStores.data?.stores.map((store) => (
                <CommandGroup key={store.id}>
                  <CommandItem
                    key={store.id}
                    onSelect={() => handleSelectStore(store)} // Set the selected team when clicked
                    className='text-sm'
                  >
                    {store.name}

                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedStore?.id === store.id ? 'opacity-100' : 'opacity-0' // Check if selectedTeam matches the current store
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewStoreDialog(true)
                    }}
                  >
                    <PlusCircledIcon className='mr-2 h-5 w-5' />
                    Create Store
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader className='px-5 pt-5'>
          <DialogTitle>Create Store</DialogTitle>
        </DialogHeader>
        <div className='px-5 pb-5'>
          <StoreForm closeModal={closeModal} store={store} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StoreSwitcher
