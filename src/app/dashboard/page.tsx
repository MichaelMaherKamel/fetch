import { Metadata } from 'next'
import Dashboard from '@/components/dashboard/dashboard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard to Check Stores, Products and Stats',
}

type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

const DashboardPage = (props: Props) => {
  const searchParams = props.searchParams
  const selectedStore = searchParams.store
  // console.log(selectedStore)
  return <Dashboard searchParams={searchParams} />
}

export default DashboardPage
