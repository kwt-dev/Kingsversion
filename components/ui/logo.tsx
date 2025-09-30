import Link from 'next/link'
import Image from 'next/image'
import KingsLogoWhite from '@/public/images/kings-logo-white.png'

export default function Logo() {
  return (
    <Link className="inline-flex" href="/" aria-label="Kings Window Tint">
      <Image 
        className="max-w-none" 
        src={KingsLogoWhite} 
        width={160} 
        height={68} 
        priority 
        alt="Kings Window Tint & Ceramic Bros" 
      />
    </Link>
  )
}