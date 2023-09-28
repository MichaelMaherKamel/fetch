import { httpBatchLink } from '@trpc/client'

import { appRouter } from '../server/routers/_app'
import { getUrl } from './utils'

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
})
