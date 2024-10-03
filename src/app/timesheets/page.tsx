import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/dashboard/CalendarDateRangePicker"
import { Button } from "@/components/ui/button"
import { PlusCircle, Clock, FileCheck, History } from "lucide-react"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export const metadata: Metadata = {
  title: "Timesheets",
  description: "Manage your timesheets",
}

const timesheets = [
  {
    id: "1",
    date: "2023-06-01",
    status: "Approved",
    totalHours: 8,
    submittedAt: "2023-06-02T09:00:00",
  },
  {
    id: "2",
    date: "2023-06-02",
    status: "Pending",
    totalHours: 7.5,
    submittedAt: "2023-06-03T08:30:00",
  },
  {
    id: "3",
    date: "2023-06-03",
    status: "Rejected",
    totalHours: 6,
    submittedAt: "2023-06-04T10:15:00",
  },
]

export default function TimesheetsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Timesheets</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Timesheets</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Timesheets
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{timesheets.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Approval
                </CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {timesheets.filter((t) => t.status === "Pending").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Hours
                </CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {timesheets.reduce((sum, t) => sum + t.totalHours, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quick Actions
                </CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Link href="/timesheets/create" passHref>
                    <Button className="w-full">New Timesheet</Button>
                  </Link>
                  <Link href="/timesheets/pending" passHref>
                    <Button variant="outline" className="w-full">View Pending</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Timesheets</CardTitle>
              <CardDescription>
                A list of your recent timesheet submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={timesheets} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}