"use client"

import AddJobForm from "@/components/dashboard/add-job-form"

const AddJobListing = () => {

  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight dark:text-white">Add New Job Listing</h2>
          </div>
          <div>
            <AddJobForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddJobListing