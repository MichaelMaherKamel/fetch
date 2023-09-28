'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Account() {
  const { data: session } = useSession()
  const router = useRouter
  const [userAgent, setUserAgent] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [ipAddress, setIpAddress] = useState('')

  useEffect(() => {
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (typeof window !== 'undefined' && window.innerWidth <= 768)

    const isWindows = /Win/i.test(navigator.platform)
    const isMac = /Mac/i.test(navigator.platform)

    const deviceType = isMobile ? (/iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'iPhone' : 'Android') : 'Computer'

    setUserAgent(navigator.userAgent)
    setDeviceType(isWindows ? 'Windows' : isMac ? 'macOS' : deviceType)

    // Fetch the user's public IP address using an IP detection service
    axios
      .get('https://api64.ipify.org?format=json')
      .then((response) => {
        setIpAddress(response.data.ip)
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error)
      })
  }, [])

  return (
    <div>
      <h1 className='text-3xl font-semibold mb-4'>{session ? `Welcome, ${session.user.name}!` : 'Welcome to FETCH'}</h1>
      {session ? <div>Signed In</div> : <div>You are not signed in</div>}
      <p className='mt-4'>Device Type: {deviceType}</p>
      <p>IP Address: {ipAddress}</p>
    </div>
  )
}
