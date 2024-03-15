import { ModeToggle } from "@/components/mode-toggle"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Navigation = () => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image
          src={'/assets/rdrdc-logo.png'}
          width={200}
          height={200}
          alt="plur logo"
        />
        <span className="text-xl font-bold"></span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={'#'}>Get Started</Link>
          <Link href={'#'}>Properties</Link>
          <Link href={'#'}>About Us</Link>
          <Link href={'#'}>Contact Us</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={'/login'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <ModeToggle />
      </aside>
    </div>
  )
}

export default Navigation
