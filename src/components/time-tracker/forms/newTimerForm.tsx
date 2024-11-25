"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { Button } from "@/components/ui/button";
import StartButton from "@/components/common/startButton";
import PauseButton from "@/components/common/pauseButton";
import StopButton from "@/components/common/stopButton";
import { displayTime } from "@/assets/logicFunctions";
import * as actions from "@/actions";
import FloatingWindow from "@/components/time-tracker/floatingWindow"; 

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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFloatingWindowOpen, setIsFloatingWindowOpen] = useState(false); // State für das Floating Window

  // State für den Timer
  const [time, setTime] = useState(0);
  const [roundedTime, setRoundedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer Logik
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    setRoundedTime(Math.ceil(time / 60));
  }, [time]);

  // Timer Funktionen
  const startTimer = () => {
    setIsTimerRunning(true);
  };
  const pauseTimer = () => {
    setIsTimerRunning(false);
  };
  const cancelTimer = () => {
    setTime(0);
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
    }
  }

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
    cancelTimer();
  }

  function toggleFloatingWindow() {
    setIsFloatingWindowOpen(!isFloatingWindowOpen);
    setIsPopoverOpen(!isPopoverOpen);
  }

  return (
    <>
      <Popover placement="left" backdrop="blur" isOpen={isPopoverOpen}>
        <PopoverTrigger>
          <Button color="secondary" onClick={togglePopover}>New Timer</Button>
        </PopoverTrigger>
        <PopoverContent >
          <div className="p-8">
            <div className="py-4 bg-sky-400">
              <p className="text-center text-2xl font-bold">Timer</p>
            </div>
            <div className="text-center py-7">
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
              <div className="pt-8">
                <Button onClick={toggleFloatingWindow}>Open Floating Timer</Button>
                <Button variant="destructive" onClick={togglePopover}>Cancel</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {isFloatingWindowOpen && (
        <FloatingWindow onClose={toggleFloatingWindow}>
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
        </FloatingWindow>
      )}
    </>
  );
}