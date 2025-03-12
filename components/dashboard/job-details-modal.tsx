import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Label } from "../ui/label";

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
  skills: string | string[];
  startDate: Date | null;
  job_title: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type EditJobModalProps = {
  jobDetails: JobListing;
};

const mapJobType = (value: string) => {
  const jobTypes: { [key: string]: string } = {
    full_time: "Full Time",
    part_time: "Part Time",
    internship: "Internship",
  };
  return jobTypes[value] || value; // If no match, return the original value
};

const mapJobLocation = (value: string) => {
  const jobLocations: { [key: string]: string } = {
    onsite: "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
  };
  return jobLocations[value] || value; // If no match, return the original value
};

const JobDetailModal = ({ jobDetails }: EditJobModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
          Job Details
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg w-full">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="form-item">
              <Label className="text-purple-500">Job Title</Label>
              <div>{jobDetails.job_title || "Not available"}</div>
            </div>

            <div className="form-item">
              <Label className="text-purple-500">Company Name</Label>
              <div>{jobDetails.company_name || "Not available"}</div>
            </div>

            <div className="form-item">
              <Label className="text-purple-500">Salary</Label>
              <div>{jobDetails.salary || "Not available"}</div>
            </div>

            <div className="form-item">
              <Label className="text-purple-500">Job Type</Label>
              <div>{mapJobType(jobDetails.job_type) || "Not available"}</div>
            </div>

            <div className="form-item">
              <Label className="text-purple-500">Job Location</Label>
              <div>{mapJobLocation(jobDetails.job_location) || "Not available"}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
