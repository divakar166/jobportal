import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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

// Type for only the editable fields
type PartialJobListing = Pick<JobListing, "job_title" | "company_name" | "salary" | "job_type" | "job_location">;

type EditJobModalProps = {
  jobDetails: JobListing;
  onEditSave: (updatedData: Partial<JobListing>) => Promise<void>;
};


const EditJobModal = ({ jobDetails, onEditSave }: EditJobModalProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PartialJobListing>({
    defaultValues: {
      job_title: jobDetails.job_title || "",
      company_name: jobDetails.company_name || "",
      salary: jobDetails.salary || "",
      job_type: jobDetails.job_type || "full_time",
      job_location: jobDetails.job_location || "onsite",
    },
  });

  const handleEditSave: SubmitHandler<PartialJobListing> = async (data) => {
    await onEditSave(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
          Edit Job
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg w-full">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEditSave)} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="job_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Software Developer II" className="border border-slate-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Google" className="border border-slate-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="$120,000" className="border border-slate-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="job_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="border border-slate-400">
                          <SelectValue placeholder="Full Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full_time">Full Time</SelectItem>
                          <SelectItem value="part_time">Part Time</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="job_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="border border-slate-400">
                          <SelectValue placeholder="On-site" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">On-site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
