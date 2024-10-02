"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { format } from "date-fns"

interface TimeEntry {
  id: string;
  date: Date;
  project: string;
  startTime: string;
  endTime: string;
  hours: number;
}

interface TimeEntriesTableProps {
  entries: TimeEntry[];
  onSubmitTimesheet: () => void;
  onClearEntries: () => void;
}

const TimeEntriesTable: React.FC<TimeEntriesTableProps> = ({ entries, onSubmitTimesheet, onClearEntries }) => {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const wage = 23.15;
  const takeHomePay = totalHours * wage;

  const handleSubmitTimesheet = () => {
    onSubmitTimesheet();
    setIsSubmitDialogOpen(false);
  };

  const handleClearEntries = () => {
    onClearEntries();
    setIsClearDialogOpen(false);
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
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Submit Timesheet</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Timesheet</DialogTitle>
                <DialogDescription>
                  Are you sure you want to submit this timesheet for approval?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitTimesheet}>Confirm Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">Clear Entries</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear Entries</DialogTitle>
                <DialogDescription>
                  Are you sure you want to clear all entries? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsClearDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleClearEntries}>Confirm Clear</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TimeEntriesTable;