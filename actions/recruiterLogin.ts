"use server";

import * as z from "zod";
import { RecruiterLoginSchema } from "@/lib/schemas";
import axios from "axios";

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
      "http://localhost:8000/api/recruiter/login/",
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      const { message, token, name } = response.data;
      return { success: message, token, name };
    } else {
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
