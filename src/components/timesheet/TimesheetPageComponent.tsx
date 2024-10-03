import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import TimesheetsClient from '@/components/timesheet/TimesheetsClient'

type TimeEntry = {
  date: Date;
  createdAt: Date;
  hours: number;
  project: string;
  startTime: Date;
  id: string;
  endTime: Date;
  userId: string;
  status: string;
  updatedAt: Date;
}

async function getTimesheets(): Promise<TimeEntry[]> {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized');

  const timeEntries = await prisma.timeEntry.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });

  return timeEntries.map((entry: TimeEntry) => ({
    ...entry,
    date: new Date(entry.date),
    startTime: entry.startTime,
    endTime: entry.endTime,
    createdAt: new Date(entry.createdAt),
    updatedAt: new Date(entry.updatedAt),
  }));
}

export default async function TimesheetsPage() {
  const timesheetDTOs = await getTimesheets();

  const timesheets = timesheetDTOs.map(dto => ({
    ...dto,
    date: new Date(dto.date),
    startTime: new Date(dto.startTime).toISOString(),
    endTime: new Date(dto.endTime).toISOString(),
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  }));

  return <TimesheetsClient timesheets={timesheets} />
}