function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  return `http://${process.env.NEXTAUTH_URL}`
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc'
}
