'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Input } from '@nextui-org/react';
import { Button } from "@/components/ui/button"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as actions from '@/actions';
import { z } from 'zod';
import DeleteProjectButton from '../project/deleteProjectButton';

import { TimerProject } from '@/types';

interface EditProjectSheetProps {
  project: TimerProject;
}

interface EditProjectFormState {
  errors: {
    projectName?: string[];
    projectDescription?: string[];
    projectSalary?: string[];
    _form?: string[];
    status?: boolean;
  };
}

const createProjectSchema = z.object({
  projectName: z.string().min(1).max(255),
  projectDescription: z.string().min(1).max(255),
  projectSalary: z.number().min(0),
});

export default function EditProjectSheet({ project }: EditProjectSheetProps) {

  const [formState, setFormState] = useState<EditProjectFormState>({ errors: {} });
  const [projectName, setProjectName] = useState(project.projectName);
  const [projectDescription, setProjectDescription] = useState(project.projectDescription);
  const [projectSalary, setProjectSalary] = useState(project.projectSalary.toString());

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
      projectId: project.id,
      projectName,
      projectDescription,
      projectSalary: Number(projectSalary),
    });

    if (success) {
      // togglePopover();
    } else {
      setFormState({
        errors: {
          _form: ['Failed to edit project.'],
        },
      });
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <MoreHorizIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-8">
              Project: "{project.projectName}" 
              <DeleteProjectButton projectId={project.id}/>
            </div>
          </SheetTitle>
          <SheetDescription>
            Edit project details. Or delete the project.
          </SheetDescription>
        </SheetHeader>
          <div className="flex flex-col items-center gap-5 p-3">
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
            <SheetClose>
              <Button color="danger">Cancel</Button>
            </SheetClose>
            <Separator className="mt-10"/>
        </div>
      </SheetContent>
    </Sheet>

  );
}
