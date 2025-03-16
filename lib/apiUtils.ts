import axios from "axios";

export const fetchJobsByRecruiter = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/jobs/recruiter",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { jobs: response.data };
  } catch (error) {
    console.error("Error fetching jobs", error);
    return { error: "Failed to fetch jobs." };
  }
};

export const fetchJobs = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/jobs");
    console.log(response.data);
    return { jobs: response.data };
  } catch (error) {
    console.error("Error fetching jobs", error);
    return { error: "Failed to fetch jobs." };
  }
};

export const fetchJobListingCount = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/jobs/recruiter/count",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      total: response.data.total,
      active: response.data.active,
      expired: response.data.expired,
    };
  } catch (error) {
    console.error("Error fetching job listing counts:", error);
    return { error: "Failed to fetch job listing counts." };
  }
};
