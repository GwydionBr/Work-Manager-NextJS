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
import {TimeInput} from "@nextui-org/date-input";
import { start } from 'repl';

const addDepartmentSchema = z.object({
  departmentName: z.string().min(1),
  departmentShortName: z.string().min(1).max(4),
  startTimeSummer: z.string().date(),
  endTimeSummer: z.string().date(),
  startTimeWinter: z.string().date(),
  endTimeWinter: z.string().date(),
});

interface AddDepartmentFormState {
  errors: {
    departmentName?: string[];
    departmentShortName?: string[];
    startTimeSummer?: string[];
    endTimeSummer?: string[];
    startTimeWinter?: string[];
    endTimeWinter?: string[];
    _form?: string[];
  };
}

interface CreateDepartmentProps {
  dienstPlanId: number;
}

export default function AddDepartment(dienstPlanId: CreateDepartmentProps) {

  const [departmentName, setDepartmentName] = useState('');
  const [departmentShortName, setDepartmentShortName] = useState('');
  const [startTimeSummer, setStartTimeSummer] = useState('');
  const [endTimeSummer, setEndTimeSummer] = useState('');
  const [startTimeWinter, setStartTimeWinter] = useState('');
  const [endTimeWinter, setEndTimeWinter] = useState('');
    

  const [formState, setFormState] = useState<AddDepartmentFormState>({ errors: {} });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDepartmentName(e.target.value);
  }

  function handleShortNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDepartmentShortName(e.target.value);
  }

  function handleStartTimeSummerChange(value: string) {
    setStartTimeSummer(value);
  }

  async function handleSubmit() {
    console.log(startTimeSummer);
    const result = addDepartmentSchema.safeParse({
      departmentName,
      departmentShortName,
      startTimeSummer,
      endTimeSummer,
      startTimeWinter,
      endTimeWinter,
    });

    if (!result.success) {
      setFormState({
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }
    
    try {
      const status = await actions.createDepartment({
        departmentName,
        departmentShortName,
        startTimeSummer,
        endTimeSummer,
        startTimeWinter,
        endTimeWinter,
        dienstPlanId: dienstPlanId.dienstPlanId,
      });
      if (status) { 
        togglePopover();
      } else {
        setFormState({
          errors: {
            _form: ['Failed to create department']
          }
        });
      }
    } catch (err: unknown) {
      setFormState({
        errors: {
          _form: ['Failed to create department']
        }
      });
    }
  }

  return (
    <Popover placement="bottom" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button size="sm" color="primary" onClick={togglePopover}><AddIcon/>Abteilung</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-5">
          <Input
            value={departmentName}
            onChange={handleNameChange}
            color="success"
            name="name"
            label="Name:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.departmentName}
            errorMessage={formState?.errors.departmentName?.join(', ')}
          />
          <Input
            value={departmentShortName}
            onChange={handleShortNameChange}
            color="success"
            name="shortName"
            label="Short Name:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.departmentShortName}
            errorMessage={formState?.errors.departmentShortName?.join(', ')}
          />
          <TimeInput
            hourCycle={24}
            name="startTimeSummer"
            label="Start Time Summer:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.startTimeSummer}
            errorMessage={formState?.errors.startTimeSummer?.join(', ')}
          />
          <TimeInput
            hourCycle={24}
            name="endTimeSummer"
            label="End Time Summer:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.endTimeSummer}
            errorMessage={formState?.errors.endTimeSummer?.join(', ')}
          />
          <TimeInput
            hourCycle={24}
            name="startTimeWinter"
            label="Start Time Winter:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.startTimeWinter}
            errorMessage={formState?.errors.startTimeWinter?.join(', ')}
          />
          <TimeInput
            hourCycle={24}
            name="endTimeWinter"
            label="End Time Winter:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.endTimeWinter}
            errorMessage={formState?.errors.endTimeWinter?.join(', ')}
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
