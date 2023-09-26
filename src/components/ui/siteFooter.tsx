import Link from 'next/link'

import { siteConfig } from '@/lib/config/site'
import { SubscribeToNewsletterForm } from '@/components/forms/newsletter'
import { Icons } from '@/components/ui/icons'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { Shell } from './shell'

export function SiteFooter() {
  return (
    <footer className='w-full border-t bg-background'>
      <Shell as='div'>
        <section
          id='footer-content'
          aria-labelledby='footer-content-heading'
          className='flex flex-col gap-10 lg:flex-row lg:gap-20'
        >
          <section id='footer-branding' aria-labelledby='footer-branding-heading'>
            <Link aria-label='Home' href='/' className='flex items-center space-x-2'>
              <Icons.logo className='h-6 w-6' aria-hidden='true' />
              <span className='font-bold'>{siteConfig.name.toUpperCase()}</span>
            </Link>
          </section>
          <section
            id='footer-links'
            aria-labelledby='footer-links-heading'
            className='grid flex-1 grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4'
          >
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className='space-y-3'>
                <h4 className='text-base font-medium'>{item.title}</h4>
                <ul className='space-y-3'>
                  {item.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        target={item ? '_blank' : undefined}
                        rel={item ? 'noreferrer' : undefined}
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                      >
                        {item.title}
                        <span className='sr-only'>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id='Social&NewsLetter' aria-labelledby='Social&NewsLetter' className='space-y-10'>
            <div className='space-y-2'>
              <h2 className='text-base font-medium'>FOLLOW US</h2>
              <div>
                {siteConfig.footerNaVSocail.map((section) => (
                  <div key={section.title} className='flex space-x-1'>
                    {section.items.map((item) => {
                      const Icon = Icons[item.icon]
                      return (
                        <Link key={item.title} href={item.href}>
                          <Icon key={item.title} aria-hidden='true' />
                        </Link>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className='text-base font-medium'>GET UPDATES</h2>
              <SubscribeToNewsletterForm />
            </div>
          </section>
        </section>
        <section
          id='footer-bottom'
          aria-labelledby='footer-bottom-heading'
          className='flex flex-nowrap space-x-4 items-center'
        >
          <div className='text-sm leading-loose text-muted-foreground'>
            Crafted by{' '}
            <a
              href='https://github.com/MichaelMaherKamel'
              target='_blank'
              rel='noreferrer'
              className='font-semibold transition-colors hover:text-foreground'
            >
              Michael
            </a>
          </div>
        </section>
      </Shell>
    </footer>
  )
}
