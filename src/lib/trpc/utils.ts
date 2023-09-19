import { env } from '@/lib/env.mjs'
function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  return `http://${env.NEXT_PUBLIC_APP_URL}`
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc'
}
