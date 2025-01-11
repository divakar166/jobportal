"use server";

import axios from "axios";

export const verifyToken = async (token: string, type: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/developer/verify-token/",
      {
        token,
        type,
      }
    );

    if (response.data.success) {
      return { success: "Email verified!" };
    } else {
      return { error: response.data.error || "Verification failed!" };
    }
  } catch (error) {
    if (error) {
      return {
        error: error || "An error occurred during verification.",
      };
    } else {
      return { error: "Network error or server not reachable." };
    }
  }
};
