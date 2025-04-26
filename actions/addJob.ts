/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AddJobSchema } from "@/lib/schemas";
import { Job } from "@/lib/types";
import axios from "axios";
import { z } from "zod";

export type FetchJobByIdResponse = { job: Job } | { error: string };

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
      "http://localhost:8000/api/jobs/add-job",
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
    if (response.status === 201) {
      return { success: response.data.message };
    } else {
      return { error: response.data.error || "Unknown error occurred." };
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      return { error: error.response.data.error || "Failed to add job." };
    }
    return { error: "Something went wrong! Please try again." };
  }
};

export const fetchJobById = async (
  jobId: string
): Promise<FetchJobByIdResponse> => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/jobs/job-id/${jobId}`
    );

    if (response.status === 200) {
      const jobData = response.data;

      const job: Job = {
        ...jobData,
        skills: jobData.skills
          ? jobData.skills.split(",").map((skill: string) => skill.trim())
          : [],
      };

      return { job };
    } else {
      return { error: response.data.error || "Unknown error occurred." };
    }
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      return { error: error.response.data.error || "Failed to fetch job." };
    }
    return { error: "Something went wrong! Please try again." };
  }
};
