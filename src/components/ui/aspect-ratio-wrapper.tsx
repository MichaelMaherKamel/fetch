'use client'

import { AspectRatio } from './aspect-ratio'
import React, { useState, useEffect } from 'react'

function AspectRatioWrapper({ children }: { children: React.ReactNode }) {
  const [aspectRatio, setAspectRatio] = useState(20 / 9)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setAspectRatio(4 / 5)
      } else {
        setAspectRatio(20 / 9)
      }
    }

    // Add an event listener to handle window resize
    window.addEventListener('resize', handleResize)

    // Initial aspect ratio setup
    handleResize()

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <AspectRatio ratio={aspectRatio}>{children}</AspectRatio>
}

export default AspectRatioWrapper
