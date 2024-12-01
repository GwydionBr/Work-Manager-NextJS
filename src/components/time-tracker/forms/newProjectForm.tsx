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

export default function NewProjectForm() {
  const [formState, action] = useFormState(actions.createProject, {
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
              name="projectName"
              label="Project Name:"
              labelPlacement="outside"
              placeholder="Enter project name"
              isInvalid={!!formState?.errors.projectName}
              errorMessage={formState?.errors.projectName?.join(', ')}
            />
            <Input 
              name="projectDescription"
              label="Project Description:"
              labelPlacement="outside"
              placeholder="Enter project description"
              isInvalid={!!formState?.errors.projectDescription}
              errorMessage={formState?.errors.projectDescription?.join(', ')}
            />
            <Input
              type="number"
              name="projectSalary"
              label="Project Salary:"
              labelPlacement="outside"
              placeholder="0.00"
              isInvalid={!!formState?.errors.projectSalary}
              errorMessage={formState?.errors.projectSalary?.join(', ')}
            />

              {formState?.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState?.errors._form?.join(', ')}
              </div>
            ) : null}
            <div className="mt-8">
              <FormButton>Create Project</FormButton>
            </div>
          </div>
        </form>
        
        
      </PopoverContent>

</Popover>
  )
}