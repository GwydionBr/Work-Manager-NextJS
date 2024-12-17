
import { db } from "@/db";
import { Separator } from "@/components/ui/separator";
import { eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ListExpenses({ userId }: { userId: string }) {
  let expenses;
  try {
    expenses = await db.query.spendings.findMany({
      where: (e) => eq(e.userId, userId),
    });
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    return <div>Failed to load expenses.</div>;
  }

  const renderedExpensesMobile = expenses.map((expense) => {
    return (
      <AccordionItem
        value={`${expense.id}`}
        key={expense.id}
        className="bg-card pr-4 my-2 rounded-md"
      >
        <AccordionTrigger>
          <div className="grid grid-cols-7">
            <p className="col-span-3">{expense.title}</p>
            <p>{expense.amount} $</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="">
          <div className="grid grid-cols-2 gap-4 p-4">
            <p className="col-span-2 text-center pb-4">
              {expense.description}
            </p>
            <p className="col-span-2 text-center pb-4">
              Monthly: {expense.monthly ? "Yes" : "No"}
            </p>
            <p className="col-span-2 text-center pb-4">
              Start Date: {new Date(expense.startDate).toLocaleDateString()}
            </p>
            {expense.endDate && (
              <p className="col-span-2 text-center pb-4">
                End Date: {new Date(expense.endDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  });

  const renderedExpensesDesktop = expenses.map((expense) => {
    return (
      <Card key={expense.id} className="pr-4 my-2 rounded-md">
        <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-center pb-3">
                {expense.title}
              </CardTitle>
              <p className="border-2 p-2 border-blue-700">
                {expense.amount} $
              </p>
            </div>
            <Separator />
            <p className="pb-4">{expense.description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 p-4">
            <p className="col-span-2 text-center pb-4">
              Monthly: {expense.monthly ? "Yes" : "No"}
            </p>
            <p className="col-span-2 text-center pb-4">
              Start Date: {new Date(expense.startDate).toLocaleDateString()}
            </p>
            {expense.endDate && (
              <p className="col-span-2 text-center pb-4">
                End Date: {new Date(expense.endDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <>
      <div className="block lg:hidden">
        <Accordion type="single" collapsible className="pt-4">
          {renderedExpensesMobile}
        </Accordion>
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
        {renderedExpensesDesktop}
      </div>
    </>
  );
}