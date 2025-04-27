"use client"
import { JobCardWrapper } from "@/components/joblistings/job-card-wrapper"
import { fetchJobs } from "@/lib/apiUtils"
import { useEffect, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import Footer from "@/components/homepage/footer"
import Spinner from "@/components/spinner"
import { motion } from "framer-motion"
import { Filter, Search, MapPin, Briefcase, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FilterState, JobListing } from "@/lib/types"





const fadeInAnimationsVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
}

const experienceOptions = ["Any Experience", "Entry Level", "1-3 Years", "3-5 Years", "5+ Years", "Senior Level"]

const jobTypeOptions = ["All Types", "Full-time", "Part-time", "Contract", "Internship", "Remote"]

const salaryRanges = ["Any Salary", "0-30,000", "30,000-60,000", "60,000-90,000", "90,000-120,000", "120,000+"]

const Jobs = () => {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage, setJobsPerPage] = useState(8)
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([])
  const [uniqueSkills, setUniqueSkills] = useState<string[]>([])

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    jobType: "",
    skills: [],
    applyByDate: null,
    experience: "",
    salary: "",
  })

  useEffect(() => {
    let isMounted = true
    const fetchAllJobs = async () => {
      try {
        const response = await fetchJobs()
        if (response.error) throw new Error(response.error)
        if (response.jobs && isMounted) {
          setJobs(response.jobs)
          setFilteredJobs(response.jobs)

          // Extract unique locations
          const locations = [...new Set(response.jobs.map((job: JobListing) => job.location))]
          const stringLocations: string[] = locations.filter((item): item is string => typeof item === 'string');
          setUniqueLocations(stringLocations)

          // Extract and flatten all skills
          const allSkills: string[] = response.jobs.flatMap(
            (job: JobListing) => job.skills?.split(",").map((skill) => skill.trim()) || []
          );

          // Remove duplicates and filter out any empty strings
          setUniqueSkills([...new Set(allSkills)].filter(Boolean));
        }
      } catch (error) {
        console.error(`Failed to fetch job listings: ${error}`)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAllJobs()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const updateJobsPerPage = () => {
      const width = window.innerWidth
      if (width < 640) setJobsPerPage(4)
      else if (width < 1024) setJobsPerPage(6)
      else setJobsPerPage(12)
    }

    updateJobsPerPage()
    window.addEventListener("resize", updateJobsPerPage)
    return () => window.removeEventListener("resize", updateJobsPerPage)
  }, [])

  useEffect(() => {
    // Apply filters
    let result = [...jobs]

    // Search filter (job title, company name, description)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        (job) =>
          job.job_title?.toLowerCase().includes(searchTerm) ||
          job.company_name?.toLowerCase().includes(searchTerm) ||
          job.description?.toLowerCase().includes(searchTerm),
      )
    }

    if (filters.location) {
      result = result.filter((job) => job.location === filters.location)
    }

    // Job type filter
    if (filters.jobType && filters.jobType !== "All Types") {
      result = result.filter((job) => job.job_type === filters.jobType)
    }

    // Skills filter
    if (filters.skills.length > 0) {
      result = result.filter((job) => {
        const jobSkills =
          job.skills
            ?.toLowerCase()
            .split(",")
            .map((s) => s.trim()) || []
        return filters.skills.some((skill) => jobSkills.includes(skill.toLowerCase()))
      })
    }

    // Apply by date filter
    if (filters.applyByDate) {
      result = result.filter((job) => {
        if (!job.applyBy) return true
        const applyByDate = new Date(job.applyBy)
        if (filters.applyByDate != null) {
          return applyByDate >= filters.applyByDate
        }
      })
    }

    // Experience filter
    if (filters.experience && filters.experience !== "Any Experience") {
      result = result.filter((job) => job.experience === filters.experience)
    }

    // Salary filter
    if (filters.salary && filters.salary !== "Any Salary") {
      // This would need proper implementation based on how salary is stored
      // For now, just a simple string match
      result = result.filter((job) => job.salary?.includes(filters.salary))
    }

    setFilteredJobs(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters, jobs])

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)

  const handleSkillToggle = (skill: string) => {
    setFilters((prev) => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill]
      return { ...prev, skills: updatedSkills }
    })
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      jobType: "",
      skills: [],
      applyByDate: null,
      experience: "",
      salary: "",
    })
  }

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.location ||
      filters.jobType ||
      filters.skills.length > 0 ||
      filters.applyByDate ||
      filters.experience ||
      filters.salary
    )
  }

  return (
    <div className="text-black pt-16 md:pt-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg text-slate-500 dark:text-slate-300">Your Dream Job</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black dark:text-slate-200 font-bold">
            Explore and Find <br className="sm:hidden" /> your Job here
          </h1>
        </div>

        {/* Search and Filter Toggle */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs, companies, or keywords"
              className="pl-10"
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters() && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {
                      Object.values(filters).filter((v) =>
                        Array.isArray(v)
                          ? v.length > 0
                          : Boolean(v) && v !== "All Types" && v !== "Any Experience" && v !== "Any Salary",
                      ).length
                    }
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px]">
              <DialogHeader>
                <DialogTitle>Filter Jobs</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Job Type
                  </label>
                  <Select
                    value={filters.jobType}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, jobType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <Select
                    value={filters.experience}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map((exp) => (
                        <SelectItem key={exp} value={exp}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary Range</label>
                  <Select
                    value={filters.salary}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, salary: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select salary range" />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Apply By Date Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Apply By
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {filters.applyByDate ? (
                          format(filters.applyByDate, "PPP")
                        ) : (
                          <span className="text-muted-foreground">Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filters.applyByDate || undefined}
                        onSelect={(date) => setFilters((prev) => ({ ...prev, applyByDate: date || null }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Skills Filter */}
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <label className="text-sm font-medium">Skills</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-2 border rounded-md">
                    {uniqueSkills.slice(0, 20).map((skill) => (
                      <Badge
                        key={skill}
                        variant={filters.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters() && (
                <div className="border-t pt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-sm font-medium">Active filters:</span>
                    {filters.location && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {filters.location}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters((prev) => ({ ...prev, location: "" }))}
                        />
                      </Badge>
                    )}
                    {filters.jobType && filters.jobType !== "All Types" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {filters.jobType}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters((prev) => ({ ...prev, jobType: "" }))}
                        />
                      </Badge>
                    )}
                    {filters.experience && filters.experience !== "Any Experience" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {filters.experience}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters((prev) => ({ ...prev, experience: "" }))}
                        />
                      </Badge>
                    )}
                    {filters.salary && filters.salary !== "Any Salary" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {filters.salary}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters((prev) => ({ ...prev, salary: "" }))}
                        />
                      </Badge>
                    )}
                    {filters.applyByDate && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Apply by: {format(filters.applyByDate, "PP")}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters((prev) => ({ ...prev, applyByDate: null }))}
                        />
                      </Badge>
                    )}
                    {filters.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleSkillToggle(skill)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <DialogFooter className="flex justify-between items-center border-t pt-4">
                {hasActiveFilters() && (
                  <Button variant="ghost" onClick={clearFilters} type="button">
                    Clear all
                  </Button>
                )}
                <DialogClose asChild>
                  <Button type="submit">Apply Filters</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Filters Display (outside dialog) */}
        {hasActiveFilters() && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.location && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.location}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, location: "" }))}
                />
              </Badge>
            )}
            {filters.jobType && filters.jobType !== "All Types" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.jobType}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, jobType: "" }))}
                />
              </Badge>
            )}
            {filters.experience && filters.experience !== "Any Experience" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.experience}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, experience: "" }))}
                />
              </Badge>
            )}
            {filters.salary && filters.salary !== "Any Salary" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.salary}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters((prev) => ({ ...prev, salary: "" }))} />
              </Badge>
            )}
            {filters.applyByDate && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Apply by: {format(filters.applyByDate, "PP")}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, applyByDate: null }))}
                />
              </Badge>
            )}
            {filters.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleSkillToggle(skill)} />
              </Badge>
            ))}
            {hasActiveFilters() && (
              <Button variant="ghost" size="sm" className="h-6 px-2" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
            {hasActiveFilters() && " with current filters"}
          </p>
        </div>

        {/* Job Listings */}
        <div className={`${loading ? "min-h-[60vh]" : "min-h-[40vh]"} w-full flex justify-center items-start`}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">Try adjusting your filters or search criteria</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
              {paginatedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={fadeInAnimationsVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  className="h-full"
                >
                  <JobCardWrapper jobData={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredJobs.length > 0 && totalPages > 1 && (
          <Pagination className="mt-8 flex justify-center pb-10">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }}
                  >
                    Previous
                  </PaginationLink>
                </PaginationItem>
              )}

              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNumber

                // Logic to show pages around current page
                if (totalPages <= 5) {
                  pageNumber = idx + 1
                } else if (currentPage <= 3) {
                  pageNumber = idx + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + idx
                } else {
                  pageNumber = currentPage - 2 + idx
                }

                return (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNumber}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pageNumber)
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(totalPages)
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {!loading && <Footer />}
    </div>
  )
}

export default Jobs
