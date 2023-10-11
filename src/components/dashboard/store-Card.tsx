import Link from 'next/link'

import { cn } from '@/lib/utils'
import { type IsActiveStore } from '@/lib/db/schema/stores'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface StoreCardProps {
  store?: IsActiveStore
  cardTitle?: string
  cardDescription?: string
  route: string
  buttonText?: string
}

export function StoreCard({ cardTitle, cardDescription, store, route }: StoreCardProps) {
  return (
    <Card>
      <Link aria-label={store?.name} href={route}>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='line-clamp-1'>{cardTitle ?? store?.name}</CardTitle>
          {store?.active ? <Badge variant='active'>Active</Badge> : <Badge variant='destructive'>Inactive</Badge>}
        </CardHeader>
        <CardContent className='line-clamp-2'>{store?.description}</CardContent>
      </Link>
    </Card>
  )
}

{
  /* <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <div className='text-muted'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{stat}</div>
        <p className='text-xs text-muted-foreground'>{desc}</p>
      </CardContent>
    </Card> */
}
