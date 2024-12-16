import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import paths from "@/paths";
import EditProjectForm from "@/components/time-tracker/forms/editProjectForm";
import NewTimerForm from "@/components/time-tracker/forms/newTimerForm";
import { eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function ListPlans({ userId }: { userId: string }) {
  let plans;
  try {
    plans = await db.query.dienstPlan.findMany({
      where: (p) => eq(p.userId, userId),
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    // Handle the error appropriately in your application context
    return <div>Failed to load plans.</div>;
  }

  const renderedProjects = plans.map((plan) => {
    return (
      <AccordionItem
        value={`${plan.id}`}
        key={plan.id}
        className="bg-card pr-4 my-2 rounded-md"
      >
        <AccordionTrigger>
          <div className="grid grid-cols-7">
            <p className="col-span-3">{plan.name}</p>
            <div className="col-span-3">
              <Button size="sm" asChild>
                <Link href={paths.dienstPlan.showPlan(plan.id)}>View</Link>
              </Button>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="">
          <div className="grid grid-cols-2 gap-4 p-4">
            <p className="col-span-2 text-center pb-4">{plan.description}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <Accordion type="single" collapsible className="pt-4">
      {renderedProjects}
    </Accordion>
  );
}
