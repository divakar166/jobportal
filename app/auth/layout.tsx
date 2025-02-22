"use client"
import Loader from "@/components/loader";
import { useLoader } from "@/providers/LoaderContext";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading } = useLoader()
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-300 dark:from-gray-950 dark:to-gray-700 text-black">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-75 z-50">
          <Loader />
        </div>
      )}
      {children}
    </div>
  )
};
