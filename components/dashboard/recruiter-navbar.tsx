"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Logo from "../homepage/logo"
import { usePathname } from "next/navigation";
import UserNav from "../homepage/user-nav";
import { useAppSelector } from "@/lib/hooks";

export function RecruiterNavbar() {
  const pathname = usePathname();
  const linkClass = (href: string) =>
    pathname === href ? "text-primary" : "text-md font-medium text-muted-foreground transition-colors hover:text-primary";

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}
        >
          <div className="flex flex-shrink-0 items-center mr-4 logo-container group">
            <Link href='/dashboard/recruiter' className="rounded-full bg-transparent  flex justify-center items-center relative">
              <div className="w-8 h-8 flex items-center justify-center" >
                <Logo />
              </div>
              <span className="font-bold text-lg ml-2 text-gray-950 dark:text-slate-300">
                Connect
              </span>
            </Link>
          </div>
          <Link
            href="/dashboard/recruiter"
            className={`${linkClass('/dashboard/recruiter')}`}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/recruiter/applications"
            className={`${linkClass('/dashboard/recruiter/applications')}`}
          >
            Applications
          </Link>
          <Link
            href="/dashboard/recruiter/joblisting"
            className={`${linkClass('/dashboard/recruiter/joblisting')}`}
          >
            Job Listings
          </Link>
          <Link
            href="/dashboard/recruiter/add-job"
            className={`${linkClass('/dashboard/recruiter/add-job')}`}
          >
            Add Job
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated && (
            <UserNav />
          )}
        </div>
      </div>
    </div>
  )
}