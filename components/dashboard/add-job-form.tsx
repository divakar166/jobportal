"use client"
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { BeatLoader } from "react-spinners";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { AddJobSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { addJob } from "@/actions/addJob";
import { useAppSelector } from "@/lib/hooks";

const AddJobForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { token } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof AddJobSchema>>({
    resolver: zodResolver(AddJobSchema),
    defaultValues: {
      job_title: "",
      job_type: "full_time",
      job_location: "onsite",
      company_name: "",
      location: "",
      experience: "",
      skills: "",
      salary: "",
      openings: 1,
      about: ""
    },
  });
  const onSubmit = (values: z.infer<typeof AddJobSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      addJob(values, token || "")
        .then((data) => {
          if (data?.success) {
            setSuccess(data?.success)
          } else {
            setError(data?.error)
          }
        })
    })
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-x-2 grid-cols-3 grid dark:text-white">
            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Software Developer II"
                      type="text"
                      className="border border-slate-400"
                    />
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "full_time"}
                      disabled={isPending}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "onsite"}
                      disabled={isPending}
                    >
                      <SelectTrigger
                        className="border border-slate-400"
                      >
                        <SelectValue placeholder="On-Site" />
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
          <div className="space-x-2 grid-cols-3 grid dark:text-white">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Tech Explica Pvt Ltd"
                      type="text"
                      className="border border-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="New Delhi"
                      type="text"
                      className="border border-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Fresher"
                      type="text"
                      className="border border-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="dark:text-white grid-cols-2 grid space-x-2">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills Required</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ReactJS, Python"
                      type="text"
                      className="border border-slate-400"
                    />
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
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="6 LPA"
                      type="text"
                      className="border border-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-2 grid-cols-3 grid dark:text-white">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="flex flex-col">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 font-normal border-slate-400 dark:border-input flex justify-around",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select start Date</span>
                          )}
                          <CalendarIcon className="ml-auto relative -top-7 h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apply_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apply By</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="flex flex-col">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 font-normal border-slate-400 dark:border-input flex justify-around",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto relative -top-7 h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. of Openings</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="3"
                      type="text"
                      value={field.value ?? ''}
                      className="border border-slate-400"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="dark:text-white">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Job Description" className="border border-slate-400 dark:border-slate-400" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >{isPending ? <BeatLoader /> : "Add Job"}</Button>
        </form>
      </Form>
    </div>
  )
}

export default AddJobForm