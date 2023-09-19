'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@nextui-org/react'

export default function SignIn() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  )
}
