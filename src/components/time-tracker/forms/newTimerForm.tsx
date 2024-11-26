"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { Button } from "@/components/ui/button";
import * as actions from "@/actions";
import FloatingTimer from "@/components/time-tracker/floatingTimer"; 
import StableTimer from "@/components/time-tracker/stableTimer";

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

  // New Variables
  const now = Date.now();
  const [startTime, setStartTime] = useState(now) ;


  // Timer Logik
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = (now - startTime) / 1000;
        setTime(diff);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    setRoundedTime(Math.ceil(time / 60));
  }, [time]);

  // Timer Funktionen
  const startTimer = () => {
    setStartTime(Date.now());
    setIsTimerRunning(true);
  };
  const pauseTimer = () => {
    setIsTimerRunning(false);
  };
  const continueTimer = () => {
    setStartTime(Date.now() - time * 1000);
    setIsTimerRunning(true);
  }
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
            <StableTimer
              projectSalary={projectSalary}
              isTimerRunning={isTimerRunning}
              time={time}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              stopTimer={stopTimer}
              formState={formState}
              toggleFloatingWindow={toggleFloatingWindow}
              togglePopover={togglePopover}
            />
        </PopoverContent>
      </Popover>
      {isFloatingWindowOpen && (
        <FloatingTimer 
            onClose={toggleFloatingWindow}
            projectSalary={projectSalary}
            isTimerRunning={isTimerRunning}
            time={time}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            stopTimer={stopTimer}
            formState={formState}
        />
      )}
    </>
  );
}