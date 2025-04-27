import { notFound } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, MapPinIcon, BriefcaseIcon, ClockIcon, BuildingIcon, CoinsIcon, UsersIcon, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { fetchJobById } from "@/lib/apiUtils"
import Link from "next/link"

export default async function JobDetailsPage({ params }: { params: { jobId: string } }) {
  const job = await fetchJobById(params.jobId)
  const jobData = job?.jobData

  if (!job) {
    notFound()
  }

  const jobTypeLabels: Record<string, string> = {
    full_time: 'Full Time',
    part_time: 'Part Time',
    internship: 'Internship',
  };

  const jobLocationLabels: Record<string, string> = {
    onsite: "On-Site",
    remote: "Remote",
    hybrid: "Hybrid"
  }

  return (
    <div className="container max-w-7xl pt-24 h-screen">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent hover:text-foreground"
          asChild
        >
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </Button>
      </div>
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">{jobData.job_title}</h1>
        <div className="flex items-center mt-2 text-muted-foreground">
          <BuildingIcon className="w-4 h-4 mr-2" />
          <span>{jobData.company_name}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <BriefcaseIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Job Type</p>
                    <p className="font-medium">{jobTypeLabels[jobData.job_type] || jobData.job_type}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">
                      {jobLocationLabels[jobData.job_location] || jobData.job_location} • {jobData.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">{jobData.experience}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CoinsIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p className="font-medium">{jobData.salary}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{format(jobData.start_date, "MMM dd, yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Openings</p>
                    <p className="font-medium">
                      {jobData.openings} position{jobData.openings > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{jobData.about}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {jobData.skills.split(",").map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Apply By</p>
                <p className="font-medium flex items-center mt-1">
                  <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                  {format(jobData.apply_by, "MMM dd, yyyy")}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Time Remaining</p>
                {new Date() < new Date(jobData.apply_by) ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Closed
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {new Date() < new Date(jobData.apply_by) ? (
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
              ) : (
                <Button className="w-full" size="lg" disabled>
                  Application Closed
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
