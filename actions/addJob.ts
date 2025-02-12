"use server";

import { AddJobSchema } from "@/lib/schemas";
import axios from "axios";
import { z } from "zod";

export const addJob = async (
  values: z.infer<typeof AddJobSchema>,
  token: string
) => {
  const validatedFields = AddJobSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const {
    job_title,
    job_type,
    job_location,
    company_name,
    location,
    experience,
    skills,
    salary,
    start_date,
    apply_by,
    openings,
    about,
  } = validatedFields.data;

  try {
    const response = await axios.post(
      "http://localhost:8000/api/jobs/add-job/",
      {
        job_title,
        job_type,
        job_location,
        company_name,
        location,
        experience,
        skills,
        salary,
        start_date,
        apply_by,
        openings,
        about,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(token);
    if (response.status === 201) {
      return { success: response.data.message };
    } else {
      return { error: response.data.error || "Unknown error occurred." };
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error);
      return { error: error.response.data.error || "Failed to add job." };
    }
    return { error: "Something went wrong! Please try again." };
  }
};
