import { HeartFilledIcon } from '@radix-ui/react-icons'
import { Shell } from '@/components/ui/shell'

export const DashboardFooter = () => {
  return (
    <footer className='sticky bottom-0 z-40 w-full border-t bg-background'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='flex text-sm leading-loose text-muted-foreground'>
            <p className='flex items-center'>
              Crafted with <HeartFilledIcon className='m-1' /> by{' '}
            </p>
            <a
              href='https://github.com/MichaelMaherKamel'
              target='_blank'
              rel='noreferrer'
              className='font-semibold transition-colors hover:text-foreground m-1'
            >
              Michael
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
