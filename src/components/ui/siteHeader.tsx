import HeaderSelector from '@/components/ui/responsiveHeader-selector'

const SiteHeader = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <HeaderSelector />
    </header>
  )
}

export default SiteHeader
