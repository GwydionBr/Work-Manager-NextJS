"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { format, addMonths, isBefore, isEqual } from 'date-fns';
import { de } from 'date-fns/locale';

interface GetMonthExpensesProps {
  userId: string;
}

interface MonthExpenses {
  month: string;
  year: number;
  totalExpenses: number;
}

const monthsOrder = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

export async function getMonthExpenses({ userId }: GetMonthExpensesProps): Promise<MonthExpenses[]> {
  try {
    // Get all expenses for the user
    const expenses = await db.query.spendings.findMany({
      where: (e) => eq(e.userId, userId),
    });

    // Group expenses by month and calculate total expenses
    const expensesByMonth = expenses.reduce<{ [key: string]: { month: string; year: number; totalExpenses: number } }>((acc, expense) => {
      let currentDate = expense.startDate;
      const endDate = expense.endDate || new Date();

      if (!expense.monthly) {
        // If monthly is false, only add the expense to the start month
        const month = format(currentDate, 'MMMM', { locale: de });
        const year = format(currentDate, 'yyyy', { locale: de });
        const key = `${month}-${year}`;
        if (!acc[key]) {
          acc[key] = { month, year: parseInt(year, 10), totalExpenses: 0 };
        }
        acc[key].totalExpenses += expense.amount;
      } else {
        // If monthly is true, add the expense to each month between startDate and endDate
        while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
          const month = format(currentDate, 'MMMM', { locale: de });
          const year = format(currentDate, 'yyyy', { locale: de });
          const key = `${month}-${year}`;
          if (!acc[key]) {
            acc[key] = { month, year: parseInt(year, 10), totalExpenses: 0 };
          }
          acc[key].totalExpenses += expense.amount;
          currentDate = addMonths(currentDate, 1);
        }
      }

      return acc;
    }, {});

    // Convert the expensesByMonth object to an array of MonthExpenses
    const monthExpenses: MonthExpenses[] = Object.values(expensesByMonth);

    // Sort the monthExpenses array by month and year
    monthExpenses.sort((a, b) => {
      const yearComparison = a.year - b.year;
      if (yearComparison !== 0) {
        return yearComparison;
      }
      return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
    });

    return monthExpenses;
  } catch (err: any) {
    console.error("Error fetching month expenses:", err);
    throw new Error("Failed to fetch month expenses");
  }
}