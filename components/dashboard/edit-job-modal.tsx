import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";

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
  jobId: string
  jobDetails: JobListing
  onEditSave: (id: string) => Promise<void>
};

const EditJobModal = ({ jobId, jobDetails, onEditSave }: EditJobModalProps) => {
  // const [formData, setFormData] = useState(jobId);
  const [open, setOpen] = useState(false);
  console.log(jobDetails)

  const handleEditSave = async () => {
    await onEditSave(jobId); // Call delete function
    setOpen(false); // Close the dialog after deletion
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
          Edit Job
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* <Input name="job_title" value={formData.job_title} onChange={handleChange} placeholder="Job Title" />
          <Input name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company Name" />
          <Input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" /> */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
