import React from 'react';
import { Fab, Zoom } from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

interface PauseButtonProps {
  timerFunction: () => void;
}

export default function PauseButton({ timerFunction }: PauseButtonProps) {
  return(
    <Zoom in={true}>
      <Fab className="timerFab" onClick={timerFunction}>
        <PauseCircleIcon fontSize="large"/>
      </Fab>
    </Zoom>
  )
}