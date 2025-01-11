"use client";
import { JobCardWrapper } from "@/components/joblistings/job-card-wrapper";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { useLoader } from "@/providers/LoaderContext";
import { BarLoader } from "react-spinners";

const devJobs = [
  {
    id: "1",
    title: "Software Engineer",
    company: {
      id: "1",
      name: "SoftPro Tech",
      email: "careers@software.tech",
      website: "softpro.tech",
      description: "Leading software development company.",
      registration_date: "2024-06-30T12:00:00Z",
      job_opportunities_posted: 1,
      candidates_hired: 30,
    },
    posted_on: "2024-07-01T12:00:00Z",
    work_type: "Work From Office",
    location: "New York, NY",
    description: "Software development.",
    job_type: "Full Time",
    start_date: "2024-07-05T12:00:00Z",
    salary_or_stipend: "30",
    apply_by: "2024-07-04T12:00:00Z",
    applicants_count: 302,
    skills_required: ["Python", "ReactJS", "Java"],
    openings: 3,
    perks: ["Flexible work hour"],
  },
  {
    id: "2",
    title: "Backend Developer",
    company: {
      id: "2",
      name: "TechSoft Solutions",
      email: "careers@techsoft.com",
      website: "techsoft.com",
      description: "Innovative tech solutions provider.",
      registration_date: "2023-12-01T12:00:00Z",
      job_opportunities_posted: 10,
      candidates_hired: 100,
    },
    posted_on: "2024-06-25T12:00:00Z",
    work_type: "Remote",
    location: "San Francisco, CA",
    description: "Building scalable backend systems.",
    job_type: "Full Time",
    start_date: "2024-07-10T12:00:00Z",
    salary_or_stipend: "4.8",
    apply_by: "2024-07-05T12:00:00Z",
    applicants_count: 200,
    skills_required: ["Node.js", "Express", "MongoDB"],
    openings: 2,
    perks: ["Remote work", "Health insurance"],
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: {
      id: "3",
      name: "WebCorp",
      email: "careers@webcorp.com",
      website: "webcorp.com",
      description: "Creating stunning web experiences.",
      registration_date: "2024-01-15T12:00:00Z",
      job_opportunities_posted: 7,
      candidates_hired: 45,
    },
    posted_on: "2024-06-28T12:00:00Z",
    work_type: "Hybrid",
    location: "Austin, TX",
    description: "Developing dynamic user interfaces.",
    job_type: "Full Time",
    start_date: "2024-07-15T12:00:00Z",
    salary_or_stipend: "6",
    apply_by: "2024-07-10T12:00:00Z",
    applicants_count: 150,
    skills_required: ["React", "Redux", "CSS"],
    openings: 4,
    perks: ["Hybrid work", "Stock options"],
  },
];

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
            {devJobs.map((job) => (
              <JobCardWrapper key={job.id} jobData={job} />
            ))}
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
