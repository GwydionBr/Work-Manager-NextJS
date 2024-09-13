'use client';

import { useState } from 'react';
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import EditIcon from '@mui/icons-material/Edit';
import * as actions from '@/actions';
import type { TimerProject } from '@prisma/client';
import { z } from 'zod';

const createProjectSchema = z.object({
  projectName: z.string().min(1).max(255),
  projectDescription: z.string().min(1).max(255),
  projectSalary: z.number().min(1),
});

interface EditProjectFormState {
  errors: {
    projectName?: string[];
    projectDescription?: string[];
    projectSalary?: string[];
    _form?: string[];
    status?: boolean;
  };
}

interface EditProjectFormProps {
  projectId: number;
  project: TimerProject;
}

export default function EditProjectForm({ projectId, project }: EditProjectFormProps) {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false); 
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen); 
  const [formState, setFormState] = useState<EditProjectFormState>({ errors: {} });
  const [projectName, setProjectName] = useState(project.project_name);
  const [projectDescription, setProjectDescription] = useState(project.project_description);
  const [projectSalary, setProjectSalary] = useState(project.project_salary.toString());

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProjectName(event.target.value);
  }
  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProjectDescription(event.target.value);
  }
  function handleSalaryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProjectSalary(event.target.value);
  }

  async function handleSubmit() {

    const projectData = {
      projectName,
      projectDescription,
      projectSalary: Number(projectSalary),
    };

    const result = createProjectSchema.safeParse(projectData);

    if (!result.success) {
      setFormState({
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    const success = await actions.editProject({
      projectId,
      projectName,
      projectDescription,
      projectSalary: Number(projectSalary),
    });

    if (success) {
      togglePopover();
    } else {
      setFormState({
        errors: {
          _form: ['Failed to edit project.'],
        },
      });
    }
  }


  return(
    <Popover placement="left" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button color="primary" onClick={togglePopover}><EditIcon></EditIcon></Button>
      </PopoverTrigger>
      <PopoverContent>
          <div className="flex flex-col gap-3 p-3">
            <Input
              value={projectName}
              onChange={handleNameChange}
              name="projectName"
              label="Project Name:"
              labelPlacement="outside"
              placeholder="Enter project name"
              isInvalid={!!formState?.errors.projectName}
              errorMessage={formState?.errors.projectName?.join(', ')}
            />
            <Input 
              value={projectDescription}
              onChange={handleDescriptionChange}
              name="projectDescription"
              label="Project Description:"
              labelPlacement="outside"
              placeholder="Enter project description"
              isInvalid={!!formState?.errors.projectDescription}
              errorMessage={formState?.errors.projectDescription?.join(', ')}
            />
            <Input
              value={projectSalary}
              onChange={handleSalaryChange}
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

            <Button color="primary" onClick={handleSubmit}>Edit Project</Button>
            <Button color="danger" onClick={togglePopover}>Cancel</Button>
          </div>
      </PopoverContent>

</Popover>
  )
}