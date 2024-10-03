import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

export async function getTimesheets() {
  return prisma.timeEntry.findMany();
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma