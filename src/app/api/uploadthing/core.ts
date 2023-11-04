// import { currentUser } from '@/lib/auth/currentUser'

import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]/route'

import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const middleware = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || !user.id) throw new Error('Unauthorized')

  return { userId: user.id }
}
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 3 } })
    // Set permissions and file types for this FileRoute
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
