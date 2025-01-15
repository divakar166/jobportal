"use client"

import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  showSocial?: boolean;
  onBackClick?: () => void;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  showSocial,
  onBackClick
}: CardWrapperProps) => {
  const pathname = usePathname()
  const isRecReg = pathname === '/auth/recruiter/register'
  return (
    <Card className={`${isRecReg ? 'w-[500px]' : 'w-[400px]'} shadow-md`}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          onClick={onBackClick}
        />
      </CardFooter>
    </Card>
  )
}