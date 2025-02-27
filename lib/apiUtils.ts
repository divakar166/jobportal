import axios from "axios";

export const fetchJobsByRecruiter = async (token: string) => {
  try {
    console.log("Sending request to fetch jobs");
    const response = await axios.get(
      "http://localhost:8000/api/jobs/recruiter",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Jobs fetched successfully");
    return { jobs: response.data };
  } catch (error) {
    console.error("Error fetching jobs", error);
    return { error: "Failed to fetch jobs." };
  }
};
