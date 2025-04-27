'use client';

import { fetchLatestJobs } from '@/lib/apiUtils';
import React, { useEffect, useState } from 'react';
import { JobCardWrapper } from '../joblistings/job-card-wrapper';
import { BeatLoader } from 'react-spinners';

type JobListing = {
  applyBy: Date | null;
  company_name: string;
  description: string;
  experience: string;
  id: string;
  job_id: string;
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
};

const JobSection = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { jobData, error } = await fetchLatestJobs();
        if (error) {
          setError('Failed to load jobs.');
        } else if (jobData) {
          setJobs(jobData);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="text-black mt-5">
      <>
        <h2 className="text-lg text-slate-500 dark:text-slate-300 text-center">
          Your Dream Job
        </h2>
        <h1 className="text-5xl text-center text-black dark:text-slate-200 mb-4">
          Explore and Find <br /> your Job here
        </h1>
      </>

      {loading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="white" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-red-500">
          {error}
        </div>
      ) : !jobs.length ? (
        <div className="flex justify-center items-center text-white">
          No jobs found!
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {jobs.map((job: JobListing) => (
            <JobCardWrapper key={job.id} jobData={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSection;
