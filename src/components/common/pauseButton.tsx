import React from 'react';
import { Zoom } from '@mui/material';
import { Button } from '@/components/ui/button';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

interface PauseButtonProps {
  timerFunction: () => void;
}

export default function PauseButton({ timerFunction }: PauseButtonProps) {
  return(
    <Zoom in={true}>
      <Button className="timerFab" onClick={timerFunction}>
        <PauseCircleIcon fontSize="large"/>
      </Button>
    </Zoom>
  )
}