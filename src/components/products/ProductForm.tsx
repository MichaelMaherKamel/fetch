'use client'

import * as React from 'react'
import Image from 'next/image'

import { Icons } from '../ui/icons'

import { Product, products, productSchema } from '@/lib/db/schema/products'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { generateReactHelpers } from '@uploadthing/react/hooks'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

import { getSubcategories } from '@/lib/config/products'

import { Zoom } from '@/components/ui/zoom-image'
import { FileDialog } from '@/components/modals/file-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { trpc } from '@/lib/trpc/client'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { FileWithPreview } from '@/lib/types/index'
import { isArrayOfFile } from '@/lib/utils'

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

const ProductForm = ({ product, closeModal }: { product?: Product; closeModal: () => void }) => {
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const { data: stores } = trpc.stores.getStores.useQuery()
  const [isPending, startTransition] = React.useTransition()
  const { isUploading, startUpload } = useUploadThing('imageUploader')

  const editing = !!product?.id

  const router = useRouter()
  const utils = trpc.useContext()

  type Inputs = z.infer<typeof productSchema>

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: 'Women',
    },
  })

  const subcategories = getSubcategories(form.watch('category'))

  const onSuccess = (action: 'create' | 'update' | 'delete') => {
    utils.products.getProducts.invalidate()
    router.refresh()
    closeModal()
    toast.success(`Product ${action}d! successfully 🎉`)
  }

  const { mutate: createProduct, isLoading: isCreating } = trpc.products.createProduct.useMutation({
    onSuccess: () => onSuccess('create'),
  })

  const { mutate: updateProduct, isLoading: isUpdating } = trpc.products.updateProduct.useMutation({
    onSuccess: () => onSuccess('update'),
  })

  const { mutate: deleteProduct, isLoading: isDeleting } = trpc.products.deleteProduct.useMutation({
    onSuccess: () => onSuccess('delete'),
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const images = isArrayOfFile(data.images)
          ? await startUpload(data.images).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split('_')[1] ?? image.key,
                url: image.url,
              }))
              return formattedImages ?? null
            })
          : null

        const newValues = {
          name: data.name,
          description: data.description,
          category: data.category,
          subcategory: data.subcategory,
          price: data.price,
          inventory: data.inventory,
          storeId: 1,
          images: images,
          // images: images, // Use product.images if available, otherwise use the newly uploaded images
        }

        if (editing) {
          updateProduct({ ...newValues, id: product.id })
        } else {
          createProduct(newValues)
        }

        form.reset()
        setFiles(null)
      } catch (err) {
        console.error('Error adding product:', err)
      }
    })
  }

  return (
    <Form {...form}>
      <form className='grid w-full max-w-2xl gap-5' onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder='Type product name here.'
              {...form.register('name')}
              defaultValue={product?.name}
            />
          </FormControl>
          <UncontrolledFormMessage message={form.formState.errors.name?.message} />
        </FormItem>
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder='Type product description here.'
              {...form.register('description')}
              defaultValue={product?.description ?? ''}
            />
          </FormControl>
          <UncontrolledFormMessage message={form.formState.errors.description?.message} />
        </FormItem>
        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) => field.onChange(value)}
                    defaultValue={product?.category}
                  >
                    <SelectTrigger className='capitalize'>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(products.category.enumValues).map((option) => (
                          <SelectItem key={option} value={option} className='capitalize'>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='subcategory'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                    defaultValue={product?.subcategory?.toString()}
                  >
                    <SelectTrigger className='capitalize'>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subcategories.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormItem className='w-full'>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input placeholder='Type product price here.' {...form.register('price')} defaultValue={product?.price} />
            </FormControl>
            <UncontrolledFormMessage message={form.formState.errors.price?.message} />
          </FormItem>
          <FormItem className='w-full'>
            <FormLabel>Inventory</FormLabel>
            <FormControl>
              <Input
                type='number'
                inputMode='numeric'
                placeholder='Type product inventory here.'
                {...form.register('inventory', {
                  valueAsNumber: true,
                })}
                defaultValue={product?.inventory}
              />
            </FormControl>
            <UncontrolledFormMessage message={form.formState.errors.inventory?.message} />
          </FormItem>
        </div>
        <FormItem className='flex w-full flex-col gap-1.5'>
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <div className='flex items-center gap-2'>
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className='h-20 w-20 shrink-0 rounded-md object-cover object-center'
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name='images'
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage message={form.formState.errors.images?.message} />
        </FormItem>
        <Button
          onClick={() => void form.trigger(['name', 'description', 'price', 'inventory'])}
          className='w-fit'
          disabled={isPending}
        >
          {isPending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          Add Product
          <span className='sr-only'>Add Product</span>
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm

{
  /* <Button type='submit' className='mr-1' disabled={isCreating || isUpdating || isPending}>
{isPending ? (
  <>
    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
    Loading...
  </>
) : (
  'Submit'
)}
</Button>
{editing ? (
<Button type='button' variant={'destructive'} onClick={() => deleteStore({ id: store.id })}>
  {isDeleting ? (
    <>
      Deleting...
      <Icons.spinner className='ml-2 h-4 w-4 animate-spin' aria-hidden='true' />
    </>
  ) : (
    <>Delete</>
  )}
</Button>
) : null} */
}
