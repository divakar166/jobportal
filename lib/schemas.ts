import * as z from "zod";

export const DeveloperLoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const DeveloperRegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
});

export const RecruiterLoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RecruiterRegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
  mobile: z.string().regex(/^[0-9]{10}$/, {
    message: "Invalid mobile number. Must be 10 digits.",
  }),
});

export const AddJobSchema = z
  .object({
    job_title: z.string().min(1, { message: "Job title is required" }),
    company_name: z.string().min(1, { message: "Company name is required" }),
    job_type: z.string().min(1, { message: "Job type must be selected" }),
    job_location: z
      .string()
      .min(1, { message: "Job location must be selected" }),
    location: z.string().min(1, { message: "Location is required" }),
    start_date: z.date({ message: "Start date is required." }),
    experience: z.string().min(1, { message: "Experience is required" }),
    apply_by: z.date({ message: "Apply By date is required." }),
    about: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long." }),
    skills: z.string().min(1, { message: "Skills are required" }),
    salary: z.string().min(1, { message: "Salary is required" }),
    openings: z
      .number()
      .min(1, { message: "At least 1 opening is required" })
      .or(
        z
          .string()
          .regex(/^\d+$/, { message: "Openings must be a valid number" })
          .transform(Number)
      ),
  })
  .superRefine((data, ctx) => {
    if (data.start_date && data.apply_by && data.apply_by <= data.start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Apply By date must be after Start Date",
        path: ["apply_by"],
      });
    }
  });
