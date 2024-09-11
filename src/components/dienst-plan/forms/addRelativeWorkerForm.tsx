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
  workingHours: z.number().int().min(0).max(200),
});

interface AddRlativeWorkerFormState {
  errors: {
    name?: string[];
    workingHours?: string[];
    _form?: string[];
  };
}

interface CreateRelativeWorkerProps {
  dienstPlanId: number;
}

export default function AddRelativeWorkerForm(dienstPlanId: CreateRelativeWorkerProps) {
  const [name, setName] = useState('');
  const [workingHours, setWorkingHours] = useState<string>("0");

  const [formState, setFormState] = useState<AddRlativeWorkerFormState>({ errors: {} });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleWorkingHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWorkingHours(e.target.value);
  }

  async function handleSubmit() {
    const result = addFixedWorkerSchema.safeParse({
      name,
      workingHours: parseInt(workingHours),
    });

    if (!result.success) {
      setFormState({
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }
    
    try {
      const status = await actions.createRelativeWorker({
        name,
        workingHours: parseInt(workingHours),
        dienstPlanId: dienstPlanId.dienstPlanId,
      });
      if (status) { 
        togglePopover();
      } else {
        setFormState({
          errors: {
            _form: ['Failed to add relative worker']
          }
        });
      }
    } catch (err: unknown) {
      setFormState({
        errors: {
          _form: ['Failed to add relative worker']
        }
      });
    }
  }

  return (
    <Popover placement="bottom" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button size="sm" color="primary" onClick={togglePopover}><AddIcon/>Aushilfe</Button>
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
            value={workingHours}
            onChange={handleWorkingHoursChange}
            name="loggedHours"
            label="Hours per month:"
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
