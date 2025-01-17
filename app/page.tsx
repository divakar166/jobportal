"use client"
import Footer from "@/components/homepage/footer";
import Hero from "@/components/homepage/hero";
import HeroCards from "@/components/homepage/hero-cards";
import JobSection from "@/components/homepage/job-section";
import Navbar from "@/components/homepage/navbar";
import SubscribeSection from "@/components/homepage/subscribe-section";
import ViewAll from "@/components/homepage/view-all";
import Loader from "@/components/loader";
import Spinner from "@/components/spinner";
import { useLoader } from "@/providers/LoaderContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingState(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingState]);

  if (loadingState) {
    return <Loader />;
  }
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