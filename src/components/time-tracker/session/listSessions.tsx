import { Divider } from '@nextui-org/react';
import DeleteSessionButton from '@/components/time-tracker/session/deleteSessionButton';
import EditSessionForm from "@/components/time-tracker/forms/editSessionForm";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListTotalMoneyAndTime from '@/components/time-tracker/session/listTotalMoneyAndTime';
// import type { TimerSession } from '@/types';
import { format, getWeekOfMonth } from 'date-fns';
import { de } from 'date-fns/locale';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export interface TimerSession {
  id: number;
  timeSpent: number;
  moneyEarned: number;
  sessionDate: Date;
  projectId: number;
  projectName?: string; // Added projectName as an optional property
}

interface ListSessionsProps {
  sessions: TimerSession[];
}

interface SessionsByDate {
  [date: string]: TimerSession[];
}

interface SessionsByWeek {
  [week: string]: SessionsByDate;
}

interface SessionsByMonth {
  [month: string]: SessionsByWeek;
}

export default function ListSessions({ sessions }: ListSessionsProps) {

  let totalMoney = 0;
  sessions.forEach((session) => {
    totalMoney += session.moneyEarned;
  });

  let totalTime = 0;
  sessions.forEach((session) => {
    totalTime += session.timeSpent;
  });

  // Sort sessions by date in descending order
  sessions.sort((a, b) => b.sessionDate.getTime() - a.sessionDate.getTime());

  // Group sessions by month, week, and date
  const sessionsByMonth = sessions.reduce<SessionsByMonth>((acc, session) => {
  const month = format(session.sessionDate, 'MMMM', { locale: de });
  const weekOfMonth = getWeekOfMonth(session.sessionDate, { locale: de });
  const week = `${weekOfMonth}. Woche`;
    const date = session.sessionDate.toDateString();

    if (!acc[month]) {
      acc[month] = {};
    }

    if (!acc[month][week]) {
      acc[month][week] = {};
    }

    if (!acc[month][week][date]) {
      acc[month][week][date] = [];
    }

    acc[month][week][date].push(session);
    return acc;
  }, {});

  // Render sessions grouped by month, week, and date
  const renderedSessionsByMonth = Object.entries(sessionsByMonth).map(([month, weeks]) => {
    let moneyPerMonth = 0;
    Object.values(weeks).forEach((days) => {
      Object.values(days).forEach((sessions) => {
        sessions.forEach((session) => (moneyPerMonth += session.moneyEarned));
      });
    });

    return (
      <Accordion key={month} type="multiple">
        <AccordionItem value={month}>
            <AccordionTrigger className="flex justify-around w-full bg-accOne rounded">
              <span>{month}</span>
              <span>{moneyPerMonth.toFixed(2)} $</span>
            </AccordionTrigger>
            <AccordionContent>
          {Object.entries(weeks).map(([week, days]) => {
            let moneyPerWeek = 0;
            Object.values(days).forEach((sessions) => {
              sessions.forEach((session) => (moneyPerWeek += session.moneyEarned)); 
            });

            return (
              <Accordion key={week} type="multiple">
                <AccordionItem value={week}>
                  <AccordionTrigger className="flex justify-around w-full bg-accTwo rounded">
                    <span>{week}</span>
                    <span>{moneyPerWeek.toFixed(2)} $</span>
                  </AccordionTrigger>
                  <AccordionContent>
                  {Object.entries(days).map(([date, sessions]) => {
                    let moneyPerDate = 0;
                    sessions.forEach((session) => (moneyPerDate += session.moneyEarned));

                    return (
                      <Accordion key={date} type="multiple">
                        <AccordionItem value={date}>
                          <AccordionTrigger className="flex justify-around w-full bg-accThree rounded">
                            <span>{date}</span>
                            <span>{moneyPerDate.toFixed(2)} $</span>
                          </AccordionTrigger>
                          <AccordionContent>
                          {sessions.map((session) => (
                            <div key={session.id}>
                              <div className="grid grid-cols-6 gap-5 items-center py-4">
                                <p className="text-center col-span-1">{session.moneyEarned} $</p>
                                <p className="text-center col-span-2">{session.timeSpent} Minutes</p>
                                {session.projectName ? <p className="text-center col-span-1">{session.projectName}</p> : null}
                                <EditSessionForm {...session} />
                                <DeleteSessionButton sessionId={session.id} projectId={session.projectId} />
                              </div>
                              <Divider />
                            </div>
                          ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });

  return (
      <div className="grid grid-cols-4 pb-20">
        <div className="h-24">
          <ListTotalMoneyAndTime totalMoney={Number(totalMoney.toFixed(2))} totalTime={totalTime}/>
        </div>
        <div className='flex flex-col gap-3 p-3 col-span-3'>
          {renderedSessionsByMonth}
        </div>
      </div>
  );
}
