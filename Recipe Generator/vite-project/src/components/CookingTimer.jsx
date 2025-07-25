"use client";

import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, Square, Plus, Trash2, Bell } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";

const CookingTimer = () => {
  const [timers, setTimers] = useState([]);
  const [newTimerMinutes, setNewTimerMinutes] = useState(10);
  const [newTimerName, setNewTimerName] = useState("");
  const intervalRefs = useRef({});

  useEffect(() => {
    return () => {
      // Cleanup all intervals on unmount
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []);

  const addTimer = () => {
    const timer = {
      id: Date.now(),
      name: newTimerName || `Timer ${timers.length + 1}`,
      totalSeconds: newTimerMinutes * 60,
      remainingSeconds: newTimerMinutes * 60,
      isRunning: false,
      isFinished: false,
    };
    setTimers([...timers, timer]);
    setNewTimerName("");
    setNewTimerMinutes(10);
  };

  const startTimer = (id) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      )
    );

    intervalRefs.current[id] = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => {
          if (
            timer.id === id &&
            timer.isRunning &&
            timer.remainingSeconds > 0
          ) {
            const newRemaining = timer.remainingSeconds - 1;
            if (newRemaining === 0) {
              // Timer finished
              clearInterval(intervalRefs.current[id]);
              playNotification();
              return {
                ...timer,
                remainingSeconds: 0,
                isRunning: false,
                isFinished: true,
              };
            }
            return { ...timer, remainingSeconds: newRemaining };
          }
          return timer;
        })
      );
    }, 1000);
  };

  const pauseTimer = (id) => {
    clearInterval(intervalRefs.current[id]);
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const resetTimer = (id) => {
    clearInterval(intervalRefs.current[id]);
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id
          ? {
              ...timer,
              remainingSeconds: timer.totalSeconds,
              isRunning: false,
              isFinished: false,
            }
          : timer
      )
    );
  };

  const removeTimer = (id) => {
    clearInterval(intervalRefs.current[id]);
    delete intervalRefs.current[id];
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const playNotification = () => {
    // Play notification sound
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Timer Finished!", {
        body: "Your cooking timer has finished.",
        icon: "/favicon.ico",
      });
    }

    // Play audio beep
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuR2O/Eeyw"
    );
    audio.play().catch(() => {});
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgress = (timer) => {
    return (
      ((timer.totalSeconds - timer.remainingSeconds) / timer.totalSeconds) * 100
    );
  };

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Cooking Timers
          </Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="timer-name">Timer Name</Label>
              <Input
                id="timer-name"
                placeholder="e.g., Pasta, Chicken"
                value={newTimerName}
                onChange={(e) => setNewTimerName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="timer-minutes">Minutes</Label>
              <Input
                id="timer-minutes"
                type="number"
                min="1"
                max="180"
                value={newTimerMinutes}
                onChange={(e) =>
                  setNewTimerMinutes(Number.parseInt(e.target.value) || 1)
                }
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addTimer} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Timer
              </Button>
            </div>
          </div>

          {/* Quick Timer Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Quick timers:</span>
            {[1, 3, 5, 10, 15, 20, 30].map((minutes) => (
              <Button
                key={minutes}
                variant="outline"
                size="sm"
                onClick={() => {
                  setNewTimerMinutes(minutes);
                  setNewTimerName(`${minutes} min timer`);
                  addTimer();
                }}
              >
                {minutes}m
              </Button>
            ))}
          </div>
        </Card.Content>
      </Card>

      {timers.length === 0 ? (
        <Card>
          <Card.Content className="text-center py-12">
            <Timer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No active timers
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Add a timer to keep track of your cooking!
            </p>
          </Card.Content>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timers.map((timer) => (
            <Card
              key={timer.id}
              className={`${
                timer.isFinished ? "ring-2 ring-red-500 animate-pulse" : ""
              }`}
            >
              <Card.Content className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{timer.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTimer(timer.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <div
                      className={`text-4xl font-mono font-bold ${
                        timer.isFinished
                          ? "text-red-500"
                          : timer.isRunning
                          ? "text-green-500"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {formatTime(timer.remainingSeconds)}
                    </div>
                    {timer.isFinished && (
                      <div className="flex items-center justify-center gap-1 text-red-500 mt-2">
                        <Bell className="h-4 w-4" />
                        <span className="text-sm font-medium">Time's up!</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        timer.isFinished ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${getProgress(timer)}%` }}
                    />
                  </div>

                  <div className="flex gap-2">
                    {!timer.isRunning ? (
                      <Button
                        onClick={() => startTimer(timer.id)}
                        disabled={timer.remainingSeconds === 0}
                        className="flex-1"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button
                        onClick={() => pauseTimer(timer.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button
                      onClick={() => resetTimer(timer.id)}
                      variant="outline"
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CookingTimer;
