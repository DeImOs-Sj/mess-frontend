import * as React from "react";
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
import { formatDate } from "../../lib/utils";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useAtom } from "jotai";
import { loginAtom } from "../../atoms/autAtom";
import { useNavigate } from "react-router-dom";
import { getComplaints } from "../../apis/complaint";
// import { MessInfo } from "../../interfaces";

const data: MessInfo[] = [
  {
    id: "1",
    mess: "SIT Vadgaon Mess",
    campus: "Ambegaon",
    meal_time: "BREAKFAST",
    date: "23-07-2024",
    category: "Cleanliness",
    timestamp: "20-03-2024",
  },
  {
    id: "2",
    mess: "SIT Vadgaon Mess",
    campus: "Ambegaon",
    meal_time: "BREAKFAST",
    date: "24-07-2024",
    category: "Cleanliness",
    timestamp: "20-03-2024",
  },
  {
    id: "3",
    mess: "SIT Vadgaon Mess",
    campus: "Ambegaon",
    meal_time: "BREAKFAST",
    date: "25-07-2024",
    category: "Cleanliness",
    timestamp: "20-03-2024",
  },
  {
    id: "4",
    mess: "SIT Vadgaon Mess",
    campus: "Ambegaon",
    meal_time: "BREAKFAST",
    date: "26-07-2024",
    category: "Cleanliness",
    timestamp: "20-03-2024",
  },
];

export type MessInfo = {
  id: string;
  mess: string;
  campus: string;
  meal_time: string;
  date: string;
  category: string;
  timestamp: string;
};

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
    cell: ({ row }) => <div className="lowercase">{row.getValue("mess")}</div>,
  },
  {
    accessorKey: "campus",
    header: () => <div className="text-justify">Campus</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("campus")}</div>
    ),
  },
  {
    accessorKey: "meal_time",
    header: () => <div className="text-justify">Meal Time</div>,
    cell: ({ row }) => <div>{row.getValue("meal_time")}</div>,
  },
  {
    accessorKey: "date",
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
      <div className="lowercase pl-[28px]">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-justify">Category</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: () => <div className="text-justify">Timestamp</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("timestamp")}</div>
    ),
  },
];

export default function PendingQueries() {
  //resolved queries code uncomment when implemented

  // const [queriesSolved, setQueriesSolved] = React.useState<MessInfo[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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

  //resolved queries code uncomment when implemented

  // const fetchData = async () => {
  //   const token = localStorage.getItem("access");
  //   let mess_data = await getComplaints(token!, 1);
  //   setQueriesSolved(mess_data);
  //   console.log(mess_data);
  // };

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login-student");
    }

    //resolved queries code uncomment when implemented

    // fetchData();
  }, [isLoggedIn]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-[#6b46c1] text-2xl font-bold mb-10">
        Resolved Queries
      </p>
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
