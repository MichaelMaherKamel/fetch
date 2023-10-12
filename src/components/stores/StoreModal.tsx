'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import StoreForm from './StoreForm'
import { Store } from '@/lib/db/schema/stores'

export default function StoreModal({ store, emptyState }: { store?: Store; emptyState?: boolean }) {
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const editing = !!store?.id
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-1'
            >
              <path d='M5 12h14' />
              <path d='M12 5v14' />
            </svg>
            New Store
          </Button>
        ) : (
          <Button
            className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
            variant={editing ? 'ghost' : 'outline'}
            size={editing ? 'sm' : 'sm'}
          >
            {editing ? 'Edit' : 'Create Store'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='px-5 pt-5'>
          <DialogTitle>{editing ? 'Edit' : 'Create'} Store</DialogTitle>
        </DialogHeader>
        <div className='px-5 pb-5'>
          <StoreForm closeModal={closeModal} store={store} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
