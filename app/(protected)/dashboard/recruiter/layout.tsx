"use client"
import { RecruiterNavbar } from "@/components/dashboard/recruiter-navbar";
import Loader from "@/components/loader";
import { useLoader } from "@/providers/LoaderContext";
import { Toaster } from "@/components/ui/sonner"

export default function DeveloperLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useLoader()
  return (
    <main className="h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-300 dark:from-gray-950 dark:to-gray-700 text-black">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-75 z-50">
          <Loader />
        </div>
      )}
      <RecruiterNavbar />
      {children}
      <Toaster />
    </main>
  );
}
