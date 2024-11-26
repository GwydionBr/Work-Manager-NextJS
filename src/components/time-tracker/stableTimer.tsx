import StartButton from "../common/startButton";
import PauseButton from "../common/pauseButton";
import StopButton from "../common/stopButton";
import { displayTime } from "../../assets/logicFunctions";
import { Button } from "@/components/ui/button";

interface TimerProps {
  projectSalary: number;
  isTimerRunning: boolean;
  time: number;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  formState?: any;
  toggleFloatingWindow: () => void;
  togglePopover: () => void;
}

export default function StableTimer( { projectSalary, isTimerRunning, time, startTimer, pauseTimer, stopTimer, formState, togglePopover, toggleFloatingWindow }: TimerProps) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-background border-4 border-foreground">
      <div className="py-4">
        <p className="text-center text-2xl font-bold">Timer</p>
        <div className="text-center py-7 text-foreground">
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
        <div className="pt-8">
          <Button onClick={toggleFloatingWindow}>Open Floating Timer</Button>
          <Button variant="destructive" onClick={togglePopover}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}