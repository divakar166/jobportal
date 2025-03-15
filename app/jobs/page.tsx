"use client"
import Spinner from '@/components/spinner'
import React, { useState } from 'react'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  if (jobs.length > 0) {
    <Spinner />
  } else {
    return (
      <div className='pt-40'>Jobs</div>
    )
  }

}

export default Jobs