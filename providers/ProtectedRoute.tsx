"use client"

import { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { BarLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("developer" | "recruiter")[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userType } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userType!))) {
      if (userType == 'developer') {
        router.push('/auth/developer/login')
      } else {
        router.push('/auth/recruiter/login')
      }
    }
  }, [isAuthenticated, userType, allowedRoles, router]);

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userType!))) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <BarLoader color='#fff' />
      </div>
    );
  }

  return <>{children}</>;
};
