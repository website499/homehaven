import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="HomeHaven Logo"
        width={48}
        height={48}
        priority
        className="w-12 h-12 md:w-16 md:h-16"
      />
      <span className="text-2xl md:text-3xl font-bold fancy-text text-white hidden sm:inline-block">HomeHaven</span>
    </Link>
  )
}

