"use client"
import Footer from "@/components/homepage/footer";
import Hero from "@/components/homepage/hero";
import HeroCards from "@/components/homepage/hero-cards";
import JobSection from "@/components/homepage/job-section";
import Navbar from "@/components/homepage/navbar";
import SubscribeSection from "@/components/homepage/subscribe-section";
import ViewAll from "@/components/homepage/view-all";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, userType } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (userType === "recruiter") {
        router.replace("/dashboard/recruiter");
        return;
      }
    }
  }, [isAuthenticated, userType, router]);

  return (
    <main className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-200 dark:from-gray-950 dark:to-gray-700">
      <Navbar />
      <Hero />
      <HeroCards />
      <JobSection />
      <ViewAll />
      <SubscribeSection />
      <Footer />
    </main>
  );
}