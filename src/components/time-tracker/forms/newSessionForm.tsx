"use client";

import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { DatePicker } from "@nextui-org/date-picker";
import * as actions from '@/actions/time_tracker/createSession';
import { CalendarDate } from '@internationalized/date';
import { z } from 'zod';

const createSessionSchema = z.object({
  loggedDate: z.string().min(10),
  loggedHours: z.number().int().min(0),
  loggedMinutes: z.number().int().min(0).max(59)
});

interface NewSessionFormProps {
  projectId: number;
}

interface NewSessionFormState {
  errors: {
    loggedDate?: string[];
    loggedHours?: string[];
    loggedMinutes?: string[];
    _form?: string[];
  };
}

export default function NewSessionForm({ projectId }: NewSessionFormProps) {
  const today = new Date();
  const todayValue = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
 
  const [loggedDate, setLoggedDate] = useState<CalendarDate>(todayValue);
  const [loggedHours, setLoggedHours] = useState<string>("0");
  const [loggedMinutes, setLoggedMinutes] = useState<string>("0");
  const [formState, setFormState] = useState<NewSessionFormState>({ errors: {} });
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

  async function handleSubmit(e: any) {
    e.preventDefault(); // Form-Submit-Verhalten verhindern

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
        projectId: projectId,
        loggedDate: new Date(loggedDate.toString()),
        loggedHours: Number(loggedHours),
        loggedMinutes: Number(loggedMinutes),
      }

      const status = await actions.createSession(newSession);

      if (status) {
        setLoggedDate(todayValue);
        setLoggedHours("0");
        setLoggedMinutes("0");
        setFormState({ errors: {} });
        togglePopover();
      } else {
        setFormState({
          errors: {
            _form: ['Failed to create session']
          }
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setFormState({
        errors: {
          _form: ['Failed to create session']
        }
      });
    }
  }

  return(
    <Popover placement="bottom" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button variant="default" onClick={togglePopover}>New Session</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4 p-4">
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
            name="loggedHours" 
            value={loggedHours}
            onChange={handleHourChange}
            label="Hours:" 
            labelPlacement="outside" 
            type="number" 
            placeholder='0' 
            isInvalid={!!formState?.errors.loggedHours}
            errorMessage={formState?.errors.loggedHours?.join(', ')}
          />
          <Input 
            name="loggedMinutes" 
            value={loggedMinutes}
            onChange={handleMinuteChange}
            label="Minutes:" 
            labelPlacement="outside" 
            type="number" 
            placeholder='0' 
            isInvalid={!!formState?.errors.loggedMinutes}
            errorMessage={formState?.errors.loggedMinutes?.join(', ')}
          />
          {formState?.errors._form ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState?.errors._form?.join(', ')}
            </div>
          ) : null}
          <Button onClick={handleSubmit} className="mt-8">Create Session</Button>
          <Button variant="destructive" onClick={togglePopover}>Cancel</Button>
        </div>
          
      </PopoverContent>
    </Popover>
  )
}
