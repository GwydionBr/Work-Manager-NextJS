"use server";

import { db } from "@/db";
import { eq, inArray } from "drizzle-orm";
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface GetMonthEarningsProps {
  userId: string;
}

interface MonthEarnings {
  month: string;
  year: number;
  totalEarnings: number;
}

const monthsOrder = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

export async function getMonthEarnings({ userId }: GetMonthEarningsProps): Promise<MonthEarnings[]> {
  try {
    // Get all projects for the user
    const projects = await db.query.timerProjects.findMany({
      where: (p) => eq(p.userId, userId),
    });

    const projectIds = projects.map((project) => project.id);

    // Get all sessions for the user's projects
    const sessions = await db.query.timerSessions.findMany({
      where: (s) => inArray(s.projectId, projectIds),
    });

    // Group sessions by month and calculate total earnings
    const earningsByMonth = sessions.reduce<{ [key: string]: { month: string; year: number; totalEarnings: number } }>((acc, session) => {
      const month = format(session.sessionDate, 'MMMM', { locale: de });
      const year = format(session.sessionDate, 'yyyy', { locale: de });
      const key = `${month}-${year}`;
      if (!acc[key]) {
        acc[key] = { month, year: parseInt(year, 10), totalEarnings: 0 };
      }
      acc[key].totalEarnings += session.moneyEarned;
      return acc;
    }, {});

    // Convert the earningsByMonth object to an array of MonthEarnings
    const monthEarnings: MonthEarnings[] = Object.values(earningsByMonth);

    // Sort the monthEarnings array by month and year
    monthEarnings.sort((a, b) => {
      const yearComparison = a.year - b.year;
      if (yearComparison !== 0) {
        return yearComparison;
      }
      return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
    });

    return monthEarnings;
  } catch (err: any) {
    console.error("Error fetching month earnings:", err);
    throw new Error("Failed to fetch month earnings");
  }
}