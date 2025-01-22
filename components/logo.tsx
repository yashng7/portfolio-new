import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  src: string
  alt: string
}

export default function Logo({ src, alt }: LogoProps) {
  return (
    <Link href="/" className="block">
      <div className="relative w-10 h-10 transition-transform duration-200 ease-in-out hover:scale-110">
        <Image src={src} alt={alt} fill sizes="40px" className="object-contain" priority />
      </div>
    </Link>
  )
}

