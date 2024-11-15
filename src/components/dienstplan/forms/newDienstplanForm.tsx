'use client';

import { useFormState } from 'react-dom';
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { Button } from "@/components/ui/button"
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import AddIcon from '@mui/icons-material/Add';

export default function NewDienstplanForm() {
  const [formState, action] = useFormState(actions.createDienstplan, {
    errors: {},
  });
  

  return(
    <Popover placement="left" backdrop="blur">
      <PopoverTrigger>
        <Button className="bg-accent text-ccent-foreground"><AddIcon/></Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-3 p-3">
            <Input
              name="dienstplanName"
              label="Dienstplan Name:"
              labelPlacement="outside"
              placeholder="Enter dienstplan name"
              isInvalid={!!formState?.errors.dienstplanName}
              errorMessage={formState?.errors.dienstplanDescription?.join(', ')}
            />
            <Input 
              name="dienstplanDescription"
              label="Dienstplan Description:"
              labelPlacement="outside"
              placeholder="Enter dienstplan description"
              isInvalid={!!formState?.errors.dienstplanName}
              errorMessage={formState?.errors.dienstplanDescription?.join(', ')}
            />
              {formState?.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState?.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>Create Dienstplan</FormButton>
          </div>
        </form>
        
        
      </PopoverContent>

</Popover>
  )
}