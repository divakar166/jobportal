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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

export const columns: ColumnDef<JobListing>[] = [
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(job.id)}
            >
              Copy Job ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View job details</DropdownMenuItem>
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetchJobsByRecruiter(token);

        if (response.error) {
          throw new Error(response.error);
        }
        if (response?.jobs) {
          console.log(response?.jobs);
          setJobs(response.jobs); // Set jobs
        }
      } catch (err) {
        setError("Failed to fetch job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs()
  }, [token]);

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

  if (loading) return <div className="text-center text-2xl font-bold text-gray-500 dark:text-white">Loading jobs...</div>;
  // if (error) return <div className="text-center text-2xl font-bold text-red-500 dark:text-white">{error}</div>;

  return (
    <div className="w-full mb-10">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter jobs..."
          value={(table.getColumn("company_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("company_name")?.setFilterValue(event.target.value)
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
                  No results.
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
