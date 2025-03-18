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
  skills: string;
  start_date: string | null;
  job_title: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface JobCardWrapperProps {
  jobData: JobData;
}

const jobTypeMapping: Record<string, string> = {
  "full_time": "Full-Time",
  "part_time": "Part-Time",
  "internship": "Internship",
};

const timeAgo = (startDate: string | null): string => {
  console.log(startDate)
  if (!startDate) {
    return '1'
  }
  const start = new Date(startDate);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${diffInDays < 14 ? "" : "s"} ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${diffInDays < 60 ? "" : "s"} ago`;

  return `${Math.floor(diffInDays / 365)} year${diffInDays < 730 ? "" : "s"} ago`;
}

export const JobCardWrapper = ({
  jobData
}: JobCardWrapperProps) => {
  return (
    <Card className="flex flex-col justify-between shadow-md w-[300px] h-full">
      <CardHeader className="pb-0">
        <div className="flex justify-between">
          <div>{timeAgo(jobData.start_date)}</div>
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
            {jobTypeMapping[jobData.job_type] || "Unknown"}
          </span>
          {jobData.skills.split(",").map((perk, index) => (
            <span
              key={index}
              className="text-gray-700 dark:text-slate-300 rounded-full flex justify-center items-center px-2 h-full text-sm outline outline-1 outline-slate-400"
            >
              {perk}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex text-sm justify-between items-center w-full">
          <div>
            <div className="text-slate-600 dark:text-purple-500">{jobData.salary}</div>
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
