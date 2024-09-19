"use client";

import { useState } from 'react';
import * as actions from "@/actions";
import { Button } from "@/components/ui/button"
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteProjectButtonProps {
  sessionId: number;
  projectId: number;
}

interface DeleteSessionButtonFormState {
  _form?: string;
}

export default function DeleteSessionButton({ sessionId, projectId }: DeleteProjectButtonProps) {
  const [formState, setFormState] = useState<DeleteSessionButtonFormState>({});

  async function handleSubmit() {
    const success = await actions.deleteSession({sessionId, projectId})

    if (!success) {
      setFormState({_form: "Could't delete the Session"})
    }
  }

  return (
    <div>
      <Button size="sm" variant="destructive" onClick={handleSubmit}>
            <DeleteIcon />
          </Button>
          {formState._form && formState._form.length > 0 && (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState._form}
            </div>
          )}
    </div>
          
  )
}