import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-300 dark:from-gray-950 dark:to-gray-700 text-black">
      {children}
    </div>
  )
};
