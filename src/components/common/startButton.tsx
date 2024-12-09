import React from 'react';
import { Zoom, IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

interface StartButtonProps {
  timerFunction: () => void;
}

export default function StartButton({ timerFunction }: StartButtonProps) {
  return (
    <Zoom in={true}>
      <IconButton
        onClick={timerFunction}
        aria-label="start"
        color="success"
      >
        <PlayCircleIcon className="largeIcon" />
      </IconButton>
    </Zoom>
  );
}
