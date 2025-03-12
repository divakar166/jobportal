"use client";

import React, { useEffect, useState } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchJobsByRecruiter } from "@/lib/apiUtils";
import { DeleteJobAlert } from "./deletejobdialog";
import { toast } from "sonner";
import Spinner from "../spinner";
import EditJobModal from "./edit-job-modal";
import JobDetailModal from "./job-details-modal";

type JobListing = {
  applyBy: Date | null;
  company_name: string;
  description: string;
  experience: string;
  id: string;
  job_location: string;
  job_type: string;
  location: string;
  openings: number;
  recruiterId: string;
  salary: string;
  skills: string | string[];
  startDate: Date | null;
  job_title: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

const handleEditJob = async (
  id: string,
  updatedData: Partial<JobListing>,
  token: string,
  setJobs: React.Dispatch<React.SetStateAction<JobListing[]>>
) => {
  try {
    const res = await fetch(`http://localhost:8000/api/jobs/${id}/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update job");
    }

    const updatedJob = await res.json();

    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job))
    );

    toast.success("Job updated successfully!");
  } catch (error) {
    console.error("Error updating job:", error);
    toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
  }
};

const handleDeleteJob = async (id: string, token: string, setJobs: React.Dispatch<React.SetStateAction<JobListing[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const res = await fetch(`http://localhost:8000/api/jobs/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete job");
    }

    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    toast.success("Job deleted successfully!");
  } catch (error) {
    console.error("Error deleting job:", error);
    toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
  } finally {
    setLoading(false);
  }
};


const getColumns = (token: string, setJobs: React.Dispatch<React.SetStateAction<JobListing[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>): ColumnDef<JobListing>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("job_title")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "apply_by",
    header: "Apply By",
    cell: ({ row }) => {
      const dateValue = row.getValue("apply_by") as string;
      const formattedDate = new Date(dateValue).toLocaleDateString('en-GB', {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("company_name")}</div>,
  },
  {
    accessorKey: "salary",
    header: () => (<div className="text-right">Salary</div>),
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("salary")}</div>;
    },
  },
  {
    id: "status",
    header: () => (<div className="text-right">Status</div>),
    cell: ({ row }) => {
      const applyBy = row.getValue("apply_by") as string;
      const isExpired = new Date(applyBy) < new Date();

      return (
        <div className={`text-right font-medium ${isExpired ? "text-red-500" : "text-green-500"}`}>
          {isExpired ? "Expired" : "Active"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const job = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <EditJobModal
              jobDetails={job}
              onEditSave={(updatedData) => handleEditJob(job.id, updatedData, token, setJobs)}
            />
            <DeleteJobAlert jobId={job.id} onDelete={() => handleDeleteJob(job.id, token, setJobs, setLoading)} />
            <JobDetailModal
              jobDetails={job}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function JobsListingRecruiter({ token }: { token: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      try {
        const response = await fetchJobsByRecruiter(token);
        if (response.error) throw new Error(response.error);
        if (response.jobs && isMounted) {
          setJobs(response.jobs);
        }
      } catch (error) {
        console.error(`Failed to fetch job listings: ${error}`);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const columns = getColumns(token, setJobs, setLoading)
  const table = useReactTable({
    data: jobs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedJobIds = Object.keys(rowSelection).map((key) => key);
  console.log(selectedJobIds)

  return (
    <div className="w-full mb-10">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter jobs..."
          value={(table.getColumn("job_title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("job_title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm dark:border-slate-200 border-gray-800"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto dark:text-white dark:border-slate-200 border-gray-800 dark:hover:bg-gray-900">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-900">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize dark:hover:bg-gray-950"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="border-gray-800">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="dark:hover:bg-gray-900">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="dark:text-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="dark:hover:bg-gray-900 dark:data-[state='selected']:bg-gray-950"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {
                    loading ? <Spinner /> : "No Results"
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex-1 space-x-2 text-center dark:text-white">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="dark:border-slate-200 border-gray-800"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="dark:border-slate-200 border-gray-800"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
