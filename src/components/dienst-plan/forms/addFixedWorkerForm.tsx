'use client';

import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { useState } from 'react';
import * as actions from '@/actions';
import { z } from 'zod';
import AddIcon from '@mui/icons-material/Add';

const addFixedWorkerSchema = z.object({
  name: z.string().min(1),
  holiday: z.number().int().min(0).max(365),
  workingHours: z.number().int().min(0).max(168),
});

interface AddFixedWorkerFormState {
  errors: {
    name?: string[];
    holiday?: string[];
    workingHours?: string[];
    _form?: string[];
  };
}

interface CreateFixedWorkerProps {
  dienstPlanId: number;
}

export default function AddFixedWorkerForm(dienstPlanId: CreateFixedWorkerProps) {
  const [name, setName] = useState('');
  const [holiday, setHoliday] = useState<string>("0");
  const [workingHours, setWorkingHours] = useState<string>("0");

  const [formState, setFormState] = useState<AddFixedWorkerFormState>({ errors: {} });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleHolidayChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHoliday(e.target.value);
  }

  function handleWorkingHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWorkingHours(e.target.value);
  }

  async function handleSubmit() {
    const result = addFixedWorkerSchema.safeParse({
      name,
      holiday: parseInt(holiday),
      workingHours: parseInt(workingHours),
    });

    if (!result.success) {
      setFormState({
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }
    
    try {
      const status = await actions.createFixedWorker({
        name,
        holiday: parseInt(holiday),
        workingHours: parseInt(workingHours),
        dienstPlanId: dienstPlanId.dienstPlanId,
      });
      if (status) {
        togglePopover();
      } else {
        setFormState({
          errors: {
            _form: ['Failed to add fixed worker']
          }
        });
      }
    } catch (err: unknown) {
      setFormState({
        errors: {
          _form: ['Failed to add fixed worker']
        }
      });
    }
  }

  return (
    <Popover placement="bottom" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button size="sm" color="primary" onClick={togglePopover}><AddIcon/>Festen Arbeiter</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-5">
          <Input
            value={name}
            onChange={handleNameChange}
            color="success"
            name="name"
            label="Name:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.name}
            errorMessage={formState?.errors.name?.join(', ')}
          />
          <Input
            value={holiday}
            onChange={handleHolidayChange}
            name="holiday"
            label="How many days Holiday:"
            labelPlacement="outside"
            type="number"
            placeholder="0"
            isInvalid={!!formState?.errors.holiday}
            errorMessage={formState?.errors.holiday?.join(', ')}
          />
          <Input
            value={workingHours}
            onChange={handleWorkingHoursChange}
            name="loggedHours"
            label="Hours:"
            labelPlacement="outside"
            type="number"
            placeholder="0"
            isInvalid={!!formState?.errors.workingHours}
            errorMessage={formState?.errors.workingHours?.join(', ')}
          />
          {formState?.errors._form ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState?.errors._form?.join(', ')}
            </div>
          ) : null}

          <Button onClick={handleSubmit} color="secondary">Add</Button>
          <Button color="danger" onClick={togglePopover}>Cancel</Button>
      </PopoverContent>
    </Popover>
  );
}
