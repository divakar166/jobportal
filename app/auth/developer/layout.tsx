"use client"
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

export default function DeveloperAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated, userType, token } = useAppSelector((state) => state.auth);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userType === "developer" && token) {
      setRedirecting(true);
      router.push("/dashboard/developer");
    }
  }, [isAuthenticated, userType, token, router]);

  if (redirecting) {
    return <div className="w-screen h-screen flex justify-center items-center"><BarLoader color="white" /></div>;
  }

  return (
    <>
      {children}
    </>
  );
}
