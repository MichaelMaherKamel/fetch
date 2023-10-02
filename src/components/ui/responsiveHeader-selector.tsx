'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { siteConfig } from '@/lib/config/site'
import { dashboardConfig } from '@/lib/config/dashboard'

import { MobileNav } from '@/components/ui/mobile-nav'
import { MainNav } from '@/components/ui/main-nav'

function HeaderSelector() {
  const router = useRouter
  const [isMobile, setIsMobile] = useState(false)

  // Function to check if the screen size is mobile
  const checkIsMobile = () => {
    if (window.innerWidth <= 768) {
      // Adjust this threshold as needed
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    // Check the initial screen size
    checkIsMobile()

    // Add a listener to check the screen size when it changes
    window.addEventListener('resize', checkIsMobile)

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Render the appropriate navigation component based on screen size
  return (
    <div>
      {isMobile ? (
        <MobileNav mainNavItems={siteConfig.mainNav} sidebarNavItems={dashboardConfig.sidebarNav} />
      ) : (
        <MainNav items={siteConfig.mainNav} />
      )}
    </div>
  )
}

export default HeaderSelector
