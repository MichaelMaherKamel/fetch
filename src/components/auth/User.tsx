'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { getInitials } from '@/lib/config/utils'

export default function User() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>

  if (session) {
    const initials = getInitials(session.user?.name ?? '')
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={session.user.image ?? ''} alt={session.user.name ?? ''} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>{session.user.name}</p>
              <p className='text-xs leading-none text-muted-foreground'>{session.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/dashboard/account'>
                <Icons.user className='mr-2 h-4 w-4' aria-hidden='true' />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/dashboard/stores'>
                <Icons.terminal className='mr-2 h-4 w-4' aria-hidden='true' />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href='/dashboard/settings'>
                <Icons.settings className='mr-2 h-4 w-4' aria-hidden='true' />
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='' onClick={() => signOut()}>
              <Icons.logout className='mr-2 h-4 w-4' aria-hidden='true' />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <Button variant='ghost' size='icon' onClick={() => signIn()}>
      <Icons.user className='h-4 w-4' />
    </Button>
  )
}
