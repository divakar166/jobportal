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

export const fetchJobById = async (jobId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/jobs/job-id/${jobId}`
    );

    if (response.status === 200) {
      const jobData = response.data;
      return { jobData };
    } else {
      return { error: response.data.error || "Unknown error occurred." };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Failed to fetch job details." };
  }
};

export const fetchLatestJobs = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/jobs/latest`);

    if (response.status === 200) {
      const jobData = response.data;
      return { jobData };
    } else {
      return { error: response.data.error || "Unknown error occurred." };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Failed to fetch job details." };
  }
};
