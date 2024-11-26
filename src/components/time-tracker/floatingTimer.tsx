import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import StartButton from "../common/startButton";
import PauseButton from "../common/pauseButton";
import StopButton from "../common/stopButton";
import { displayTime } from "../../assets/logicFunctions";

interface FloatingWindowProps {
  projectSalary: number;
  isTimerRunning: boolean;
  time: number;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  formState?: any;
  onClose: () => void;
}

export default function FloatingTimer ({ projectSalary, isTimerRunning, time, startTimer, pauseTimer, stopTimer, formState, onClose }: FloatingWindowProps) {
  // Erstellt einen Ref für das Draggable-Element
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className="fixed bottom-1/4 right-40 z-50">
        <button onClick={onClose} className="absolute top-2 right-2">X</button>
        <div className="text-center py-7 border-4 text-foreground border-foreground bg-background">
            <p>{(projectSalary * time / 3600).toFixed(2)} $</p>
            <h1 className="text-2xl p-4">{displayTime(time)}</h1>
            {!isTimerRunning ? (
              <div className="flex gap-5 justify-center">
                <StartButton timerFunction={startTimer} />
              </div>
            ) : (
              <div className="flex gap-5 justify-center">
                <PauseButton timerFunction={pauseTimer} />
                <StopButton timerFunction={stopTimer} />
              </div>
            )}
            {formState?.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState?.errors._form?.join(', ')}
              </div>
            ) : null}
          </div>
      </div>
    </Draggable>
  );
};

