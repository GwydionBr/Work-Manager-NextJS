'use client';

import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { Button } from "@/components/ui/button"

import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import * as actions from '@/actions';
import { DatePicker } from "@nextui-org/date-picker";
import { z } from 'zod';
import { CalendarDate } from '@internationalized/date';
import { TimerSession } from '@/types';

const createSessionSchema = z.object({
  loggedDate: z.string().min(10),
  loggedHours: z.number().int().min(0),
  loggedMinutes: z.number().int().min(0).max(59)
});

interface EditSessionFormState {
  errors: {
    loggedDate?: string[];
    loggedHours?: string[];
    loggedMinutes?: string[];
    _form?: string[];
  };
}

export default function EditSessionForm(session: TimerSession) {
  const { id, timeSpent, moneyEarned, sessionDate, projectId } = session;

  const hours = (Math.floor(session.timeSpent / 60)).toString();
  const minutes = (session.timeSpent % 60).toString();

  // Convert session.session_date to CalendarDate
  const date = new Date(session.sessionDate);
  const dateValue = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

  const [loggedDate, setLoggedDate] = useState<CalendarDate>(dateValue);
  const [loggedHours, setLoggedHours] = useState<string>(hours);
  const [loggedMinutes, setLoggedMinutes] = useState<string>(minutes);
  const [formState, setFormState] = useState<EditSessionFormState>({ errors: {} });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleMinuteChange(e: any) {
    setLoggedMinutes(e.target.value);
  }
  function handleHourChange(e: any) {
    setLoggedHours(e.target.value);
  }
  function handleDateChange(date: CalendarDate) {
    setLoggedDate(date);
  }

  async function handleSubmit() {

    const result = createSessionSchema.safeParse({
      loggedDate: loggedDate.toString(),
      loggedHours: Number(loggedHours),
      loggedMinutes: Number(loggedMinutes),
    });


    if (!result.success) {
      setFormState({
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }
    
    try {
      const newSession = {
        sessionId: id,
        projectId: projectId,
        loggedDate: new Date(loggedDate.toString()),
        loggedHours: Number(loggedHours),
        loggedMinutes: Number(loggedMinutes),
      }

      const status = await actions.editSession(newSession);

      if (status) {
        togglePopover();
      } else {
        setFormState({
          errors: {
            _form: ['Failed to edit session']
          }
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setFormState({
        errors: {
          _form: ['Failed to edit session']
        }
      });
    }
  }

  return (
    <Popover placement="bottom" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button size="sm" className="bg-info text-info-foreground" onClick={togglePopover}><EditIcon/></Button>
      </PopoverTrigger>
      <PopoverContent>
          <DatePicker
            value={loggedDate}
            onChange={handleDateChange}
            name="loggedDate"
            label="Date of Work"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.loggedDate}
            errorMessage={formState?.errors.loggedDate?.join(', ')}
          />
          <Input
            value={loggedHours}
            onChange={handleHourChange}
            name="loggedHours"
            label="Hours:"
            labelPlacement="outside"
            type="number"
            placeholder="0"
            isInvalid={!!formState?.errors.loggedHours}
            errorMessage={formState?.errors.loggedHours?.join(', ')}
          />
          <Input
            value={loggedMinutes}
            onChange={handleMinuteChange}
            name="loggedMinutes"
            label="Minutes:"
            labelPlacement="outside"
            type="number"
            placeholder="0"
            isInvalid={!!formState?.errors.loggedMinutes}
            errorMessage={formState?.errors.loggedMinutes?.join(', ')}
          />

          {formState?.errors._form ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState?.errors._form?.join(', ')}
            </div>
          ) : null}

          <Button onClick={handleSubmit} color="secondary">Edit</Button>
          <Button color="danger" onClick={togglePopover}>Cancel</Button>
      </PopoverContent>
    </Popover>
  );
}
