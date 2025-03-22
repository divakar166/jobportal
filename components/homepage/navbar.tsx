"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
const inter = Inter({ subsets: ['latin'] })
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import UserNav from "./user-nav";
// import GradientText from "./GradientText";

export default function Navbar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  })

  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const linkClass = (href: string) =>
    pathname === href ? "h-full dark:text-white border-b-purple-500 border-b-2" : "menu__link dark:text-white text-black h-full"

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  }

  return (
    <motion.nav
      variants={variants}
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 w-full  backdrop-blur-md border-b border-slate-300 dark:border-neutral-500 z-50"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-start">
            <div className="flex flex-shrink-0 items-center mr-4 logo-container group">
              <Link href='/' className="rounded-full bg-transparent flex justify-center items-center relative">
                <div className="w-8 h-8 flex items-center justify-center" >
                  <Logo />
                </div>
                <span className="font-bold text-xl ml-2 text-black dark:text-white">
                  Connect
                </span>
              </Link>
            </div>
            <div className="md:ml-auto md:flex items-center hidden">
              <div className={`flex space-x-4 text-black items-center ${inter.className}`}>
                <Link href="/jobs" className={linkClass('/jobs')}>
                  Find a Job
                </Link>
                <Link href="/companies" className={linkClass('/companies')}>
                  Companies
                </Link>
                <Link href="/about" className={linkClass('/about')}>
                  Why Connect?
                </Link>
                <Link href="/contact" className={linkClass('/contact')}>
                  Contact
                </Link>
              </div>
            </div>
            <div className="md:ml-auto">
              {isAuthenticated ? <UserNav /> : (
                <div className="flex space-x-2">
                  <Link href='/auth/developer/login'>
                    <Button>
                      Find Job
                    </Button>
                  </Link>
                  <Link href='/auth/recruiter/login'>
                    <Button className="bg-purple-600 hover:bg-purple-500 text-white">
                      Hire Talent
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}