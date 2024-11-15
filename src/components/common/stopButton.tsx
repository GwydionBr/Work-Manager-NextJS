import React from 'react';
import { Zoom } from '@mui/material';
import { Button } from '@/components/ui/button';
import StopCircleIcon from '@mui/icons-material/StopCircle';

interface StopButtonProps {
  timerFunction: () => void;
}

export default function StopButton({ timerFunction }: StopButtonProps){
  return(
    <Zoom in={true}>
      <Button onClick={timerFunction} >
        <StopCircleIcon fontSize="large"/>
      </Button>
    </Zoom>
  )
}