import React from 'react';
import { Button } from '@/components/ui/button';
import { Zoom, IconButton } from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

interface PauseButtonProps {
  timerFunction: () => void;
}

export default function PauseButton({ timerFunction }: PauseButtonProps) {
  return(
    <Zoom in={true}>
      <IconButton
        onClick={timerFunction}
        aria-label="start"
        color="info"
      >
        <PauseCircleIcon className="largeIcon" />
      </IconButton>
    </Zoom>
  )
}