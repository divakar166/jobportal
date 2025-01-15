"use client"
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Push a new state to ensure the back button works properly
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      router.back();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-200 dark:from-gray-950 dark:to-gray-700">
      <div className="h-screen w-screen flex justify-center items-center">
        <CardWrapper
          headerLabel="Oops! Something went wrong!"
          backButtonLabel="Go Back"
          onBackClick={() => router.back()} // Ensure it calls the back function
        >
          <div className="w-full flex justify-center items-center flex-col">
            <ExclamationTriangleIcon height={20} width={20} className="text-destructive" />
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
