
import { ModeToggle } from "@/components/mode-toggle"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default async function Home() {


  return (
    <>
      <div className="w-full flex justify-center items-center mt-8">
          <nav className="md:block">
         <ul className="flex items-center justify-center gap-12">
         <Link href={'#'}>Get Started</Link>
         <Link href={'#'}>Properties</Link>
         <Link href={'#'}>About Us</Link>
         <Link href={'#'}>Contact Us</Link>
           </ul>
          </nav>
      </div>
<div className="w-full flex justify-end items-center mt-1 pr-16">
  <aside className="flex gap-2 items-center ml-10">
    <Link
      href={'/login'}
      className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
    >
      Login
    </Link>
    <ModeToggle />
  </aside>
</div>
    <span className="text-xl font-bold"></span>
  <p className="text-center"></p>
  <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
    <h1 className="text-9xl font-bold text-center md:text-[55px]">
      RD REALTY DEVELOPMENT CORPORATION
    </h1>
  </div>
  <div className="flex justify-center items-center relative md:mt-[-70px]">
    <Image
      src={'/assets/rdrdc-logo.png'}
      alt="banner image"
      height={1200}
      width={1200}
      className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
    />
    <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
  </div>
    </>
  )
}
