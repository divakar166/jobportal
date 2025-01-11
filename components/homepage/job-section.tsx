import React from 'react'
import { JobCardWrapper } from '../joblistings/job-card-wrapper'

const sampleJobs = [
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
]

const JobSection = () => {
  return (
    <div className='text-black mt-5'>
      <>
        <h2 className="text-lg text-slate-500 dark:text-slate-300 text-center">
          Your Dream Job
        </h2>
        <h1 className="text-5xl text-center text-black dark:text-slate-200 mb-4">
          Explore and Find <br /> your Job here
        </h1>
      </>
      <div>
        <div className="grid grid-cols-3 gap-5">
          {sampleJobs.map((job)=>(
            <JobCardWrapper key={job.id} jobData={job}></JobCardWrapper>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobSection