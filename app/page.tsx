import Image from 'next/image'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react'


const perks = [{
  name: 'Instant Delivery',
  Icon: ArrowDownToLine,
  description: "Get your assets delivered to your email in seconds and download them right away"
},
{
  name: 'Guranteed Quality',
  Icon: CheckCircle,
  description: "Every asset on our team is verified by an Expert"
},
{
  name: 'For thr Planet',
  Icon: Leaf,
  description: "Preservation of the planet"
}
]

export default function Home() {
  return (
    <>
  <MaxWidthWrapper>
    <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
  <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>Your marketplace for high quality{' '}
  <span className='text-blue-600'>digital assets</span>
  </h1>
  <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
    Welcome to Digital. Every asset on our platform is verified by our team.
    </p>
    <div className='flex flex-col sm:flex-row gap-4 mt-6'>
      <Link href='/products' className={buttonVariants()}>Browse Trending</Link>
      <Button variant='ghost'>Our quality promise&rarr;</Button>
    </div>
    </div>
    {/* List products */}
    <section className='border-t border-gray-200 bg-gray-50'>
      <MaxWidthWrapper className='py-20'>
        <div className='grid grid-cols-1 gap-y-12 sm:grids-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
          {
            perks.map((obj)=>(
              <div className='text-center md:flex md:items-start md:text-left lg:block lg:text-center' key={obj.name}>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16  text-center flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<obj.Icon className='w-1/3 h-1/3'></obj.Icon>}
                  </div>
                </div>
                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>{obj.name}</h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {obj.description}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </MaxWidthWrapper>
    </section>
  </MaxWidthWrapper>
  </>
  )
}
