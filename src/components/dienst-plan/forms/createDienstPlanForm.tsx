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

const createDienstPlanSchema = z.object({
  dienst_name: z.string().min(1),
});

interface EditSessionFormState {
  errors: {
    dienst_name?: string[];
    _form?: string[];
  };
}

export default function CreateDienstPlanForm() {
  const [dienstName, setDienstName] = useState('');

  const [formState, setFormState] = useState<EditSessionFormState>({ errors: {} });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDienstName(e.target.value);
  }

  async function handleSubmit() {

    const result = createDienstPlanSchema.safeParse({
      dienst_name: dienstName,
    });

    if (!result.success) {
      setFormState({
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }
    
    try {
      const status = await actions.createDienstPlan(dienstName);
      if (status) {
        togglePopover();
      } else {
        setFormState({
          errors: {
            _form: ['Failed to create dienst plan']
          }
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setFormState({
        errors: {
          _form: ['Failed to create dienst plan']
        }
      });
    }
  }

  return (
    <Popover placement="bottom" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button size="sm" color="primary" onClick={togglePopover}><AddIcon/>Neuer Dienst Plan</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-5">
          <Input
            value={dienstName}
            onChange={handleNameChange}
            color="success"
            name="dienstName"
            label="Name:"
            labelPlacement="outside"
            isInvalid={!!formState?.errors.dienst_name}
            errorMessage={formState?.errors.dienst_name?.join(', ')}
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
