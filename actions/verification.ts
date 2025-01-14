"use server";

import axios from "axios";

export const verifyToken = async (token: string, type: string) => {
  try {
    console.log("Called");
    const response = await axios.post(
      `http://localhost:8000/api/${type}/verify-token/`,
      { token }
    );

    if (response.data.success) {
      return { success: "Email verified!" };
    } else {
      return { error: response.data.error || "Verification failed!" };
    }
  } catch (error: any) {
    console.error("Error during token verification:", error);
    return {
      error:
        error.response?.data?.error || "An error occurred during verification.",
    };
  }
};
