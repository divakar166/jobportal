"use server";
import axios from "axios";

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
