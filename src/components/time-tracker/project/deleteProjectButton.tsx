"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { Button } from "@/components/ui/button"
import DeleteIcon from '@mui/icons-material/Delete';


interface DeleteProjectButtonProps {
  projectId: number;
}


export default function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const [formState, action] = useFormState(actions.deleteProject.bind(null, { projectId }), {
    errors: {
      _form: [],
    },
  });

  return (
    <form action={action}>
          <Button variant="destructive" size="icon" type="submit">
            <DeleteIcon />
          </Button>
          {formState.errors._form && formState.errors._form.length > 0 && (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState.errors._form.join(", ")}
            </div>
          )}
        </form>
  )
}