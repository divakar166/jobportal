"use client";

import { formatDistanceToNow, format, parseISO } from "date-fns";
import { BookmarkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "../ui/card";

interface Company {
  name: string;
}

interface JobData {
  posted_on: string;
  company: Company;
  title: string;
  job_type: string;
  perks: string[];
  salary_or_stipend: string;
  location: string;
}

interface JobCardWrapperProps {
  jobData: JobData;
}

const formatPostedOn = (postedDate: string): string => {
  const date: Date = parseISO(postedDate);
  const now: Date = new Date();
  const daysAgo: number = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysAgo <= 3) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, "d MMMM yyyy");
  }
};

export const JobCardWrapper = ({
  jobData
}: JobCardWrapperProps) => {
  return (
    <Card className="flex flex-col justify-between shadow-md w-[300px] h-full">
      <CardHeader className="pb-0">
        <div className="flex justify-between">
          <div>{formatPostedOn(jobData.posted_on)}</div>
          <div className="w-7 h-7 flex justify-center items-center cursor-pointer hover:scale-110">
            <BookmarkIcon className="w-5 h-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div>
          <div className="text-lg text-purple-500">{jobData.company.name}</div>
          <div className="text-2xl">{jobData.title}</div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="text-gray-700 dark:text-slate-300 rounded-full flex justify-center items-center px-2 h-full text-sm outline outline-1 outline-slate-400">
            {jobData.job_type}
          </span>
          {jobData.perks.map((perk, index) => (
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
            <div className="text-slate-600 dark:text-slate-300">{jobData.salary_or_stipend} LPA</div>
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
