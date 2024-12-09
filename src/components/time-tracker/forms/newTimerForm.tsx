"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as actions from "@/actions";
import FloatingTimer from "@/components/time-tracker/floatingTimer"; 
import StartButton from "@/components/common/startButton";
import PauseButton from "@/components/common/pauseButton";
import StopButton from "@/components/common/stopButton";
import { displayTime } from "@/assets/logicFunctions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";

interface NewTimerProps {
  projectId: number;
  projectSalary: number;
  redirectStatus: boolean;
}

interface NewTimerFormState {
  errors: {
    _form?: string[];
  };
}

export default function NewTimerForm({ projectId, projectSalary, redirectStatus }: NewTimerProps) {
  const [formState, setFormState] = useState<NewTimerFormState>({ errors: {} });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFloatingWindowOpen, setIsFloatingWindowOpen] = useState(false); // State für das Floating Window

  // State für den Timer
  const [newTime, setNewTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [roundedTime, setRoundedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // New Variables
  const [startTime, setStartTime] = useState(Date.now());

  // Timer Logik
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        setNewTime(diff);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    setRoundedTime(Math.ceil((newTime + totalTime) / 60));
  }, [newTime, totalTime]);

  // Timer Funktionen
  const startTimer = () => {
    setStartTime(Date.now());
    setIsTimerRunning(true);
  };
  const pauseTimer = () => {
    setIsTimerRunning(false);
    setTotalTime((prevTotalTime) => prevTotalTime + newTime);
    setNewTime(0);
  };

  const cancelTimer = () => {
    setNewTime(0);
    setTotalTime(0);
    setIsTimerRunning(false);
  };
  async function stopTimer() {
    pauseTimer();
    const newSession = {
      time_spent: roundedTime,
      money_earned: Number((projectSalary * roundedTime / 60).toFixed(2)),
      project_id: projectId,
      redirectStatus,
    };

    const created = await actions.createTimerSession(newSession);

    if (!created) {
      setFormState({
        errors: {
          _form: ["Something went wrong. Please try again."],
        },
      });
    } else {
      cancelTimer();
      setIsDialogOpen(false);
      setIsFloatingWindowOpen(false);
    }
  }

  function toggleDialog() {
    setIsDialogOpen(!isDialogOpen);
    cancelTimer();
  }

  function toggleFloatingWindow() {
    setIsFloatingWindowOpen(!isFloatingWindowOpen);
    setIsDialogOpen(false);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <Button color="secondary" onClick={toggleDialog}>
            New Timer
          </Button>
        </DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <div className="py-4 flex flex-col items-center">
            <p className="text-center text-2xl font-bold">Timer</p>
            <div className="text-center py-7 text-foreground">
              <p>{(projectSalary * (newTime + totalTime) / 3600).toFixed(2)} $</p>
              <h1 className="text-2xl p-4">{displayTime(newTime + totalTime)}</h1>
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
              {/* <Button onClick={toggleFloatingWindow}>Open Floating Timer</Button> */}
              <Button variant="destructive" onClick={toggleDialog}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {isFloatingWindowOpen && (
        <FloatingTimer
          onClose={toggleFloatingWindow}
          projectSalary={projectSalary}
          isTimerRunning={isTimerRunning}
          time={newTime + totalTime}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          stopTimer={stopTimer}
          formState={formState}
        />
      )}
    </>
  );
}