import { Metadata } from 'next'
import Dashboard from '@/components/dashboard/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard to Check Stores, Products and Stats',
}

const DashboardPage = () => {
  return <Dashboard />
}

export default DashboardPage
