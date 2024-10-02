"use client"

import {useEffect, useState} from "react"
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {useForm} from "react-hook-form"
import DataEntryForm from "@/components/DataEntryForm"
import TimeEntriesTable from "@/components/TimeEntriesTable"
import {Skeleton} from "@/components/ui/skeleton"
import {useToast} from "@/hooks/use-toast"

interface TimeEntry {
  id: string
  date: Date
  project: string
  startTime: string
  endTime: string
  hours: number
}

export default function TimesheetCard() {
  const {user} = useUser()
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const form = useForm<Omit<TimeEntry, 'id' | 'hours'>>()
  const {toast} = useToast()

  useEffect(() => {
    if (user) {
      fetchEntries()
    }
  }, [user])

  const fetchEntries = async () => {
    setLoading(true)
    const response = await fetch('/api/timesheet')
    if (response.ok) {
      const data = await response.json()
      setEntries(data.map((entry: TimeEntry) => ({
        ...entry,
        date: new Date(entry.date)
      })))
    }
    setLoading(false)
  }

  const onSubmit = async (data: Omit<TimeEntry, 'id' | 'hours'>) => {
    const startTime = new Date(`1970-01-01T${data.startTime}:00`)
    const endTime = new Date(`1970-01-01T${data.endTime}:00`)
    const hours = (endTime.getTime() - startTime.getTime()) / 3600000

    const response = await fetch('/api/timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        hours,
      }),
    })

    if (response.ok) {
      form.reset()
      await fetchEntries()
    }
  }

  const handleSubmitTimesheet = async () => {
    // Implement your submit logic here
    console.log("Submitting timesheet")
    // You might want to call an API to submit the timesheet
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
    toast({
      title: "Success",
      description: "Timesheet Submitted!",
      duration: 3000,
    })
  }

  const handleClearEntries = async () => {
    const response = await fetch('/api/clear-entries', {
      method: 'DELETE',
    });

    if (response.ok) {
      setEntries([]);
    } else {
      console.error('Failed to clear entries');
    }
  };

  return (
    <div>
      <SignedIn>
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader>
            {loading ? (
              <>
                <Skeleton className="h-6 w-48 rounded"/>
                <Skeleton className="h-4 w-32 rounded"/>
              </>
            ) : (
              <>
                <CardTitle>Hi {user?.firstName}, welcome to your timesheet!</CardTitle>
                <CardDescription>Your hourly wage is $23.15</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-8 w-3/4 rounded"/>
                <Skeleton className="h-8 w-1/2 rounded"/>
                <Skeleton className="h-48 w-full rounded-lg"/>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4"/>
                  <Skeleton className="h-6 w-2/3"/>
                  <Skeleton className="h-6 w-1/2"/>
                </div>
              </div>
            ) : (
              <>
                <DataEntryForm onSubmit={onSubmit}/>
                <TimeEntriesTable
                  entries={entries}
                  onSubmitTimesheet={handleSubmitTimesheet}
                  onClearEntries={handleClearEntries}
                />
              </>
            )}
          </CardContent>
        </Card>
      </SignedIn>
      <SignedOut>
        <div>Please sign in to view your timesheet.</div>
      </SignedOut>
    </div>
  )
}