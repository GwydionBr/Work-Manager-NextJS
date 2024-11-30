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
  const [newTime, setNewTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [roundedTime, setRoundedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // New Variables
  const [startTime, setStartTime] = useState(Date.now()) ;


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
    setTotalTime(prevTotalTime => prevTotalTime + newTime);
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
      setIsPopoverOpen(false);
      setIsFloatingWindowOpen(false);
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
              time={newTime + totalTime}
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