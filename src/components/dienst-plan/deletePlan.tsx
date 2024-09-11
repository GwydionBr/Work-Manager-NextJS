"use client";

import { useState } from 'react';
import * as actions from "@/actions";
import { Button } from "@nextui-org/react";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeletePlanButtonProps {
  dienstPlanId: number;
  
}

interface DeleteSessionButtonFormState {
  _form?: string;
}

export default function DeleteSessionButton({ sessionId, projectId }: DeletePlanButtonProps) {
  const [formState, setFormState] = useState<DeleteSessionButtonFormState>({});

  async function handleSubmit() {
    const success = await actions.deleteSession({sessionId, projectId})

    if (!success) {
      setFormState({_form: "Could't delete the Session"})
    }
  }

  return (
    <div>
      <Button size="sm" color="danger" onClick={handleSubmit}>
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