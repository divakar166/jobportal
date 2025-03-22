"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { useLoader } from "@/providers/LoaderContext";
import { BarLoader } from "react-spinners";

const DeveloperDashboard = () => {
  const { isAuthenticated, name } = useAppSelector((state) => state.auth);
  const { loading } = useLoader();
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
          <BarLoader color="#fff" />
        </div>
      )}
      <section>
        <div className="dark:text-white text-center pt-5">
          <div className="text-3xl font-bold flex justify-center items-center">Hi, &nbsp;
            {isAuthenticated ? name : (
              <div className="animate-pulse space-x-4">
                <div className="rounded-xl bg-slate-700 h-8 w-40"></div>
              </div>
            )}!</div>
          <p className="dark:text-slate-400">Your next big opportunity is just a search away.</p>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="my-5">
            <h3 className="text-2xl dark:text-slate-50">Recommended Jobs</h3>
          </div>
          <div className="grid grid-cols-3 gap-5">

          </div>
        </div>
        <div className="text-center my-5">
          <Button className="bg-purple-600 hover:bg-purple-500 dark:text-white">Explore more</Button>
        </div>
      </section>
    </>
  );
};

export default DeveloperDashboard;
