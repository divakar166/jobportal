"use client"
import { usePathname } from 'next/navigation';
import Logo from '../homepage/logo';
import Link from 'next/link';

interface HeaderProps {
  label:string;
}

export const Header = ({
  label
}:HeaderProps) => {
  const pathname = usePathname();
  const isRecruiter = pathname.includes('recruiter');
  return (
    <div className='w-full flex flex-col gap-y-1 items-center justify-center'>
      <div className={`${isRecruiter && 'mt-4'} flex flex-shrink-0 items-center mr-4 logo-container group`}>
        <Link href='/' className="rounded-full bg-transparent  flex justify-center items-center relative">
          <div className="w-8 h-8 flex items-center justify-center" >
            <Logo />
          </div>
          <span className="font-bold text-3xl ml-2 text-black dark:text-white">
            Connect
          </span>
          {isRecruiter && (
            <span className='p-1 bg-purple-500 absolute text-xs rounded-sm text-white top-[-17.5px] right-[-30px]'>Business</span>
          )}
        </Link>
      </div>
      <div className='text-muted-foreground text-sm'>{label}</div>
    </div>
  )
}