import { env } from '../env.mjs'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  return `http://${env.NEXTAUTH_URL}`
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc'
}
