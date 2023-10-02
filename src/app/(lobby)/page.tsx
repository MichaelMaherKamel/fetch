import Image from 'next/image'
import Link from 'next/link'

import { Balancer } from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/config/site'
import { productCategories } from '@/lib/config/products'

import { Shell } from '@/components/ui/shell'
import { buttonVariants } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import AspectRatioWrapper from '@/components/ui/aspect-ratio-wrapper'

const Lobby = () => {
  return (
    <Shell as='div' className='gap-12 snap-y snap-proximity'>
      <section id='store' aria-labelledby='store-heading' className='snap-center space-y-6 py-6 md:pt-10 lg:pt-0'>
        <div className='group relative overflow-hidden rounded-md'>
          <AspectRatioWrapper>
            <div className='absolute inset-0 z-10 bg-black/40 transition-colors group-hover:bg-black/50' />
            <Image
              src={siteConfig.ogImage}
              alt={siteConfig.description}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              fill
              className='object-cover transition-transform group-hover:scale-105'
              priority
            />
          </AspectRatioWrapper>
          <div className='absolute inset-0 z-20 flex flex-col items-center justify-center'>
            <h3 className='text-center sm:text-2xl font-medium capitalize text-slate-100'>{siteConfig.description}</h3>
            <h3 className='text-center sm:text-2xl font-medium text-slate-100 mx-2 mt-2'>{siteConfig.goal}</h3>
            <div className='flex flex-wrap items-center justify-center gap-4 mt-10'>
              <Link
                href='#categories'
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'sm',
                  })
                )}
              >
                Buy Now
              </Link>
              <Link
                href='#categories'
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'sm',
                  })
                )}
              >
                Sell Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id='categories'
        aria-labelledby='categories-heading'
        className='snap-center space-y-6 py-6 md:pt-10 lg:pt-0'
      >
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>Categories</h2>
          <Balancer className='max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            Choose a category and find the best products for you
          </Balancer>
        </div>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
          {productCategories.map((category) => (
            <Link aria-label={`Go to ${category.title}`} key={category.title} href={`/shopping/${category.slug}`}>
              <div className='group relative overflow-hidden rounded-md'>
                <AspectRatio ratio={4 / 5}>
                  <div className='absolute inset-0 z-10 bg-black/40 transition-colors group-hover:bg-black/50' />
                  <Image
                    src={category.image}
                    alt={category.title}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                    priority
                  />
                </AspectRatio>
                <div className='absolute inset-0 z-20 flex items-center justify-center'>
                  <h3 className='text-3xl font-medium capitalize text-slate-100 md:text-2xl'>{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}

export default Lobby
