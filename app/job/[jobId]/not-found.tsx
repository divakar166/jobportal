import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function JobNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Job Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The job listing you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/jobs">Browse All Jobs</Link>
      </Button>
    </div>
  )
}
