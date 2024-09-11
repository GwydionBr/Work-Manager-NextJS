import React from 'react';
import { Fab, Zoom } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


interface StartButtonProps {
  timerFunction: () => void;
}


export default function StartButton({timerFunction}: StartButtonProps){
  return(
    <Zoom in={true}>
      <Fab className="timerFab" onClick={timerFunction}>
        <PlayCircleIcon fontSize="large"/>
      </Fab>
    </Zoom>
  )
}