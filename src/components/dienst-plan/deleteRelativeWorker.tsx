"use client";

import { useState } from 'react';
import * as actions from "@/actions";
import { Button } from "@nextui-org/react";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteRelativeWorkerButtonProps {
  workerId: number;
  dienstPlanId: number;
}


interface DeleteRelativeWorkerButtonFormState {
  _form?: string;
}

export default function DeleteRelativeWorkerButton( {workerId, dienstPlanId}: DeleteRelativeWorkerButtonProps) {
  const [formState, setFormState] = useState<DeleteRelativeWorkerButtonFormState>({});

  async function handleSubmit() {
    const success = await actions.deleteRelativeWorker({workerId, dienstPlanId});

    if (!success) {
      setFormState({_form: "Could't delete the relative worker"});
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