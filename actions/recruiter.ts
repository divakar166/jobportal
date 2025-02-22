"use server";
import { RecruiterLoginSchema, RecruiterRegisterSchema } from "@/lib/schemas";
import axios from "axios";
import { z } from "zod";

export const recruiterLogin = async (
  values: z.infer<typeof RecruiterLoginSchema>
) => {
  const validatedFields = RecruiterLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/recruiter/login/`,
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      const { message, token, name } = response.data;
      return { success: message, token, name };
    } else {
      console.log(response);
      return { error: response.data.error || "Unknown error occurred." };
    }
  } catch (error: any) {
    if (error.response) {
      const { data, status } = error.response;
      if (status === 404) {
        return { error: "User doesn't exist!" };
      }
      if (status === 403) {
        return {
          error: "Email not verified. Please verify your email to continue.",
        };
      }
      if (status === 401) {
        return { error: "Incorrect password!" };
      }
      return { error: data.error || "Login failed! Please try again." };
    }
    console.log(error);
    return { error: "Login failed! Please try again." };
  }
};

export const recruiterRegister = async (
  values: z.infer<typeof RecruiterRegisterSchema>
) => {
  const validatedFields = RecruiterRegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password, mobile } = validatedFields.data;

  try {
    const response = await axios.post(
      "http://localhost:8000/api/recruiter/register/",
      {
        name,
        email,
        password,
        mobile,
      }
    );

    if (response.status === 201) {
      const { message } = response.data;
      return { success: message };
    } else {
      return { error: response.data.error || "Unknown error occurred." };
    }
  } catch (error: any) {
    if (error.response) {
      const { data, status } = error.response;

      if (status === 400) {
        return { error: "Invalid data. Please check your input." };
      }
      if (status === 409) {
        return { error: "Email is already in use." };
      }
      return { error: data.error || "Registration failed. Please try again." };
    }

    console.error(error);
    return {
      error: "Network error. Please check your connection and try again.",
    };
  }
};

export const fetchJobsByRecruiter = async (token: string) => {
  try {
    const jobs = await axios.get("http://localhost:8000/api/jobs/recruiter", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { jobs };
  } catch (error) {
    console.error("Error fetching jobs", error);
    return { error: "Failed to fetch jobs." };
  }
};

export const fetchJobsCountByRecruiter = async (token: string) => {
  try {
    const count = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/recruiter/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { count };
  } catch (error) {
    console.error("Error fetching job count", error);
    return { error: "Failed to fetch job count." };
  }
};
