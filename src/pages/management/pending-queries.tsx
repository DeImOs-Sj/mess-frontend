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

import { ArrowUpDown, ChevronDown } from "lucide-react";
import { userDetailsAtom } from "../../atoms/autAtom.ts";

import { Button } from "../../components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { loginAtom } from "../../atoms/autAtom";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../lib/utils";
import { MessInfo } from "../../interfaces";
import { getComplaints } from "../../apis/complaint";
import Component from "../../components/ModalComponent";
import ResolveModal from "../../components/ResolveModal";
import ManagerResolverModal from "../../components/ManagerResolveModal";

export const columns: ColumnDef<MessInfo>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "mess",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mess
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("mess")}</div>,
  },
  {
    accessorKey: "campus",
    header: () => <div className="text-justify">Campus</div>,
    cell: ({ row }) => <div>{row.getValue("campus")}</div>,
  },
  {
    accessorKey: "meal_time",
    header: () => <div className="text-justify">Meal Time</div>,
    cell: ({ row }) => <div>{row.getValue("meal_time")}</div>,
  },
  {
    accessorKey: "date_of_happening",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Happened On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-[28px]">
        {formatDate(row.getValue("date_of_happening"))}
      </div>
    ),
  },
  {
    accessorKey: "See Issue",
    header: () => <div className="text-justify">See Issue</div>,
    cell: ({ row }) => <Component complaintId={row.getValue("id")} />,
  },
  {
    accessorKey: "Resolve",
    header: () => <div className="text-justify">Resolve</div>,
    cell: () => <ResolveModal />,
  },
];

const managerColumns: ColumnDef<MessInfo>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "mess",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mess
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("mess")}</div>,
  },
  {
    accessorKey: "campus",
    header: () => <div className="text-justify">Campus</div>,
    cell: ({ row }) => <div>{row.getValue("campus")}</div>,
  },
  {
    accessorKey: "meal_time",
    header: () => <div className="text-justify">Meal Time</div>,
    cell: ({ row }) => <div>{row.getValue("meal_time")}</div>,
  },
  {
    accessorKey: "date_of_happening",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Happened On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="lowercase pl-[28px]">
        {formatDate(row.getValue("date_of_happening"))}
      </div>
    ),
  },
  {
    accessorKey: "complaint_category",
    header: () => <div className="text-justify">Category</div>,
    cell: ({ row }) => <div>{row.getValue("complaint_category")}</div>,
  },
  {
    accessorKey: "See Issue",
    header: () => <div className="text-justify">See Issue</div>,
    cell: ({ row }) => <Component complaintId={row.getValue("id")} />,
  },
  {
    accessorKey: "Resolve",
    header: () => <div className="text-justify">Resolve</div>,
    cell: () => <ResolveModal />,
  },
];

const supervisorColumns: ColumnDef<MessInfo>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "mess",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mess
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("mess")}</div>,
  },
  {
    accessorKey: "campus",
    header: () => <div className="text-justify">Campus</div>,
    cell: ({ row }) => <div>{row.getValue("campus")}</div>,
  },
  {
    accessorKey: "meal_time",
    header: () => <div className="text-justify">Meal Time</div>,
    cell: ({ row }) => <div>{row.getValue("meal_time")}</div>,
  },
  {
    accessorKey: "date_of_happening",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Happened On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-[28px]">
        {formatDate(row.getValue("date_of_happening"))}
      </div>
    ),
  },
  {
    accessorKey: "complaint_category",
    header: () => <div className="text-justify">Category</div>,
    cell: ({ row }) => <div>{row.getValue("complaint_category")}</div>,
  },
  {
    accessorKey: "See Issue",
    header: () => <div className="text-justify">See Issue</div>,
    cell: ({ row }) => <Component complaintId={row.getValue("id")} />,
  },
  {
    accessorKey: "Manager Resolvements",
    header: () => <div className="text-justify">Manager Resolvements</div>,
    cell: () => <ManagerResolverModal />,
  },
  {
    accessorKey: "Resolve",
    header: () => <div className="text-justify">Resolve</div>,
    cell: () => <Button className="bg-[#6D52C1]">Resolve</Button>,
  },
];

const commonColumns: ColumnDef<MessInfo>[] = [...managerColumns];

const residentOfficerColumns: ColumnDef<MessInfo>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "mess",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mess
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("mess")}</div>,
  },
  {
    accessorKey: "campus",
    header: () => <div className="text-justify">Campus</div>,
    cell: ({ row }) => <div>{row.getValue("campus")}</div>,
  },
  {
    accessorKey: "meal_time",
    header: () => <div className="text-justify">Meal Time</div>,
    cell: ({ row }) => <div>{row.getValue("meal_time")}</div>,
  },
  {
    accessorKey: "date_of_happening",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Happened On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-[28px]">
        {formatDate(row.getValue("date_of_happening"))}
      </div>
    ),
  },
  {
    accessorKey: "complaint_category",
    header: () => <div className="text-justify">Category</div>,
    cell: ({ row }) => <div>{row.getValue("complaint_category")}</div>,
  },
];

export default function PendingQueries() {
  const [userDetail] = useAtom(userDetailsAtom);
  const userRole = userDetail ? userDetail.role : null;

  const [data, setData] = React.useState<MessInfo[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const fetchData = async () => {
    const token = localStorage.getItem("access");
    let mess_data = await getComplaints(token!, 0);
    setData(mess_data);
  };

  console.log(userDetail);

  // Determine the columns based on user role
  const columns = React.useMemo(() => {
    if (userRole === "MANAGER") {
      return [...managerColumns];
    } else if (userRole === "SUPERVISOR") {
      return [...supervisorColumns];
    } else if (userRole === "RESIDENT_OFFICER") {
      return residentOfficerColumns;
    } else if (userRole === "CAMPUS_DIRECTOR") {
      return residentOfficerColumns;
    } else if (userRole === "COMMITTEE") {
      return residentOfficerColumns;
    } else {
      return commonColumns;
    }
  }, [userRole]);

  const table = useReactTable({
    data,
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

  const [isLoggedIn] = useAtom(loginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login-student");
    }

    fetchData();
  }, [isLoggedIn]);

  return (
    <div className="w-full min-h-screen pt-[100px] flex flex-col justify-evenly items-center">
      <p className="text-[#6b46c1] text-2xl font-bold">Pending Queries</p>
      <div className="w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] p-5 sm:p-8 md:p-10 bg-white m-5 sm:m-8 md:m-10 rounded-lg shadow-lg">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
