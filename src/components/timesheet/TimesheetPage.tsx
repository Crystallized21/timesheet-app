import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import TimesheetsClient from '@/components/timesheet/TimesheetsClient'

type TimesheetDTO = {
  userId: string;
  id: string;
  date: string;
  project: string;
  startTime: string;
  endTime: string;
  hours: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

async function getTimesheets(): Promise<TimesheetDTO[]> {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized');

  const timeEntries = await prisma.timeEntry.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });

  return timeEntries.map(entry => ({
    ...entry,
    date: entry.date.toISOString(),
    startTime: entry.startTime.toISOString(),
    endTime: entry.endTime.toISOString(),
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
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