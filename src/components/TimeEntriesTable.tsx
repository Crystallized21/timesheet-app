"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { format } from "date-fns"

interface TimeEntry {
  id: string
  date: Date
  project: string
  startTime: string
  endTime: string
  hours: number
}

interface TimeEntriesTableProps {
  entries: TimeEntry[]
  onSubmitTimesheet: () => void
  onClearEntries: () => void
}

const TimeEntriesTable: React.FC<TimeEntriesTableProps> = ({ entries, onSubmitTimesheet, onClearEntries }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)
  const wage = 23.15
  const takeHomePay = totalHours * wage

  const handleSubmitTimesheet = () => {
    onSubmitTimesheet()
    setIsDialogOpen(false)
  }

  return (
    <div>
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{format(entry.date, "PPP")}</TableCell>
              <TableCell>{entry.project}</TableCell>
              <TableCell>{entry.startTime}</TableCell>
              <TableCell>{entry.endTime}</TableCell>
              <TableCell>{entry.hours.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex flex-col items-start">
        <p className="text-lg font-semibold">Total Hours: {totalHours.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Take Home Pay: ${takeHomePay.toFixed(2)}</p>
        <div className="flex space-x-2 mt-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Submit Timesheet</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Timesheet</DialogTitle>
                <DialogDescription>
                  Are you sure you want to submit this timesheet? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitTimesheet}>Confirm Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="secondary" onClick={onClearEntries}>Clear Entries</Button>
        </div>
      </div>
    </div>
  )
}

export default TimeEntriesTable