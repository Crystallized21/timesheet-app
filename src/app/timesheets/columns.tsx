"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Timesheet = {
  id: string
  date: Date
  project: string
  startTime: string
  endTime: string
  hours: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Timesheet>[] = [
  {
    id: "select",
    header: ({table}) => (
      <div className="flex justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({column}) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        </div>
      )
    },
    cell: ({row}) => {
      const date = row.getValue("date") as Date
      // todo: i dont like the alignment here
      return <div className="text-center">{date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</div>
    },
  },
  {
    accessorKey: "project",
    header: () => <div className="text-center">Project</div>,
    cell: ({row}) => <div className="text-center">{row.getValue("project")}</div>,
  },
  {
    accessorKey: "hours",
    header: () => <div className="text-center">Hours</div>,
    cell: ({row}) => <div className="text-center">{row.getValue("hours")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({row}) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex justify-center">
          <Badge variant={status === "Approved" ? "secondary" : status === "Pending" ? "outline" : "destructive"}>
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
      const timesheet = row.original

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(timesheet.id)}>
                Copy timesheet ID
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit timesheet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]