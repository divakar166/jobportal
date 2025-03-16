"use client";

import { BookmarkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "../ui/card";


interface JobData {
  applyBy: Date | null;
  company_name: string;
  description: string;
  experience: string;
  id: string;
  job_location: string;
  job_type: string;
  location: string;
  openings: number;
  recruiterId: string;
  salary: string;
  skills: string | string[];
  startDate: Date | null;
  job_title: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface JobCardWrapperProps {
  jobData: JobData;
}

export const JobCardWrapper = ({
  jobData
}: JobCardWrapperProps) => {
  return (
    <Card className="flex flex-col justify-between shadow-md w-[300px] h-full">
      <CardHeader className="pb-0">
        <div className="flex justify-between">
          {/* <div>{formatPostedOn(jobData.createdAt)}</div> */}
          <div className="w-7 h-7 flex justify-center items-center cursor-pointer hover:scale-110">
            <BookmarkIcon className="w-5 h-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div>
          <div className="text-lg text-purple-500">{jobData.company_name}</div>
          <div className="text-2xl">{jobData.job_title}</div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="text-gray-700 dark:text-slate-300 rounded-full flex justify-center items-center px-2 h-full text-sm outline outline-1 outline-slate-400">
            {jobData.job_type}
          </span>
          {/* {jobData.skills.map((perk, index) => (
            <span
              key={index}
              className="text-gray-700 dark:text-slate-300 rounded-full flex justify-center items-center px-2 h-full text-sm outline outline-1 outline-slate-400"
            >
              {perk}
            </span>
          ))} */}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex text-sm justify-between items-center w-full">
          <div>
            <div className="text-slate-600 dark:text-slate-300">{jobData.salary}</div>
            <div className="text-slate-600 dark:text-slate-300">{jobData.location}</div>
          </div>
          <div>
            <Link
              href="/job/192"
              className="bg-black dark:bg-slate-200 dark:text-black dark:hover:bg-slate-200/90 hover:bg-black/90 rounded-full text-white px-4 py-2"
            >
              Details
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
