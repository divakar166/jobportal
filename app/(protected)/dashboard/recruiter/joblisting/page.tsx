"use client"

import { JobsListingRecruiter } from "@/components/dashboard/joblisting-recruiter"
import { useAppSelector } from "@/lib/hooks"

const JobListing = () => {
  const token = useAppSelector((state) => state.auth.token)
  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 px-8 pt-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight dark:text-white">Job Listings</h2>
          </div>
          <div>
            <JobsListingRecruiter token={token || ""} />
          </div>
        </div>
      </div>
    </>
  )
}

export default JobListing