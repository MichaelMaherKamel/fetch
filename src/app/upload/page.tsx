// 'use client'
// import * as React from 'react'
// import { useEdgeStore } from '@/lib/edgestore'
// export default function Page() {
//   const [file, setFile] = React.useState<File>()
//   const { edgestore } = useEdgeStore()
//   return (
//     <div>
//       <input
//         type='file'
//         onChange={(e) => {
//           setFile(e.target.files?.[0])
//         }}
//       />
//       <button
//         onClick={async () => {
//           if (file) {
//             const res = await edgestore.publicFiles.upload({
//               file,
//               onProgressChange: (progress) => {
//                 // you can use this to show a progress bar
//                 console.log(progress)
//               },
//             })
//             // you can run some server action or api here
//             // to add the necessary data to your database
//             console.log(res)
//           }
//         }}
//       >
//         Upload
//       </button>
//     </div>
//   )
// }

'use client'

import { MultiFileDropzone, type FileState } from '@/components/dropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { useState } from 'react'

const MultiFileDropzoneUsage = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const { edgestore } = useEdgeStore()

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates)
      const fileState = newFileStates.find((fileState) => fileState.key === key)
      if (fileState) {
        fileState.progress = progress
      }
      return newFileStates
    })
  }

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files)
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles])
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress)
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      updateFileProgress(addedFileState.key, 'COMPLETE')
                    }
                  },
                })
                console.log(res)
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR')
              }
            })
          )
        }}
      />
    </div>
  )
}

export default MultiFileDropzoneUsage
