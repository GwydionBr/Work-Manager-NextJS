import React from 'react';
import { Button } from '@/components/ui/button';
import { Zoom, IconButton } from '@mui/material';
import StopCircleIcon from '@mui/icons-material/StopCircle';

interface StopButtonProps {
  timerFunction: () => void;
}

export default function StopButton({ timerFunction }: StopButtonProps){
  return(
    <Zoom in={true}>
      <IconButton
        onClick={timerFunction}
        aria-label="start"
        color="warning"
      >
        <StopCircleIcon className="largeIcon" />
      </IconButton>
    </Zoom>
  )
}