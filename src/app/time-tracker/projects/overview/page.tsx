import ListSessions from "@/components/time-tracker/session/listSessions";
import { Button, Link } from "@nextui-org/react";
import paths from "@/paths";
import type { TimerSession } from '@prisma/client';
import OverviewHeader from "@/components/time-tracker/headers/overviewHeader";
import { db } from '@/db';

export default async function OverviewPage() {
  let sessions: TimerSession[];
  try {
    sessions = await db.timerSession.findMany({});
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    sessions = [];
  }

  return (
    <div>
      <OverviewHeader />
      <div className="grid grid-cols-12">
        <div className="justify-self-center pb-5 pt-5">
          <Link href={paths.timeTracker.timeTracker()}>
            <Button>Back</Button>
          </Link>
        </div>
        <div className="row-start-2 col-start-2 col-span-10">
          <ListSessions sessions={sessions} />
        </div>
      </div>
    </div>
  );
}