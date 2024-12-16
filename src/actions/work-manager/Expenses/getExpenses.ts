import { db, spendings } from "drizzle/schema";
import { eq } from "drizzle-orm";

export async function getExpenses(userId: string) {
  try {
    const expenses = await db
      .select()
      .from(spendings)
      .where(eq(spendings.userId, userId));

    return {
      success: true,
      data: expenses,
    };
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return {
      success: false,
      error: "Failed to fetch expenses",
    };
  }
}