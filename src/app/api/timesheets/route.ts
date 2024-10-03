import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { date, project, startTime, endTime, hours } = await req.json()

    // Ensure date is in YYYY-MM-DD format
    const formattedDate = new Date(date).toISOString().split('T')[0]

    // Combine date with startTime and endTime to create ISO-8601 DateTime strings
    const startDateTime = new Date(`${formattedDate}T${startTime}:00.000Z`)
    const endDateTime = new Date(`${formattedDate}T${endTime}:00.000Z`)

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      throw new Error('Invalid Date')
    }

    const timeEntry = await prisma.timeEntry.create({
      data: {
        userId,
        date: new Date(date),
        project,
        startTime: startDateTime,
        endTime: endDateTime,
        hours,
        status: 'Pending',
      },
    })

    return NextResponse.json(timeEntry)
  } catch (error) {
    console.error('Error creating time entry:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const timeEntries = await prisma.timeEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(timeEntries)
  } catch (error) {
    console.error('Error fetching time entries:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.timeEntry.deleteMany({
      where: { userId },
    })

    return NextResponse.json({ message: 'Entries cleared successfully' })
  } catch (error) {
    console.error('Error clearing time entries:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}