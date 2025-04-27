export type Job = {
  id: string;
  start_date: string;
  apply_by: string;
  job_id: string;
  job_title: string;
  job_type: string;
  job_location: string;
  company_name: string;
  location: string;
  experience: string;
  skills: string[];
  salary: string;
  openings: number;
  about: string;
  created_at: string;
  updated_at: string;
  recruiter: string;
};

export type JobListing = {
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

export type FilterState = {
  search: string;
  location: string;
  jobType: string;
  skills: string[];
  applyByDate: Date | null;
  experience: string;
  salary: string;
};
