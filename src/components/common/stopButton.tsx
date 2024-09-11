import React from 'react';
import { Fab, Zoom } from '@mui/material';
import StopCircleIcon from '@mui/icons-material/StopCircle';

interface StopButtonProps {
  timerFunction: () => void;
}

export default function StopButton({timerFunction}: StopButtonProps){
  return(
    <Zoom in={true}>
      <Fab className="timerFab" onClick={timerFunction} type="submit">
        <StopCircleIcon fontSize="large"/>
      </Fab>
    </Zoom>
  )
}