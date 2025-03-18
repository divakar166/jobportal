"use client"
import { JobCardWrapper } from '@/components/joblistings/job-card-wrapper';
import { fetchJobs } from '@/lib/apiUtils';
import React, { useEffect, useState } from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Footer from '@/components/homepage/footer';
import Spinner from '@/components/spinner';
import { motion } from 'framer-motion';

type JobListing = {
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
};

const fadeInAnimationsVariants = {
  initial: {
    opacity: 0,
    y: 100
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index
    }
  })
}


const Jobs = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(8);

  useEffect(() => {
    let isMounted = true;
    const fetchAllJobs = async () => {
      try {
        const response = await fetchJobs();
        if (response.error) throw new Error(response.error);
        if (response.jobs && isMounted) {
          setJobs(response.jobs);
          console.log(response.jobs)
        }
      } catch (error) {
        console.error(`Failed to fetch job listings: ${error}`);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const updateJobsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setJobsPerPage(4);
      else if (width < 1024) setJobsPerPage(6);
      else setJobsPerPage(16);
    };

    updateJobsPerPage();
    window.addEventListener("resize", updateJobsPerPage);
    return () => window.removeEventListener("resize", updateJobsPerPage);
  }, []);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const paginatedJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div className='text-black pt-24'>
      <>
        <h2 className="text-lg text-slate-500 dark:text-slate-300 text-center">
          Your Dream Job
        </h2>
        <h1 className="text-5xl text-center text-black dark:text-slate-200 mb-4">
          Explore and Find <br /> your Job here
        </h1>
      </>
      <div className={`${loading ? 'h-screen' : 'h-full'} w-full flex justify-center items-center`}>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 slg:grid-cols-3 xl:grid-cols-4 gap-2">
            {paginatedJobs.map((job, index) => (
              <motion.div
                key={index}
                variants={fadeInAnimationsVariants}
                initial="initial"
                animate="animate"
                custom={index}
              >
                <JobCardWrapper key={job.id} jobData={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-6 flex justify-center text-white pb-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? "#" : undefined}
                onClick={currentPage > 1 ? () => setCurrentPage((prev) => prev - 1) : undefined}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
            <PaginationItem>
              <PaginationNext
                href={currentPage < totalPages ? "#" : undefined}
                onClick={currentPage < totalPages ? () => setCurrentPage((prev) => prev + 1) : undefined}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {!loading && (
        <Footer />
      )}
    </div>
  );
};

export default Jobs;