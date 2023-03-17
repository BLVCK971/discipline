// src/App.tsx
import { Component, createEffect, createSignal } from "solid-js";
import { sendNotification } from "@tauri-apps/api/notification";
import { ask } from "@tauri-apps/api/dialog";
import { appWindow } from '@tauri-apps/api/window'
import "./Pomo.css";

const Pomo: Component = () => {
  const [time, setTime] = createSignal(0);
  const [timerStart, setTimerStart] = createSignal(false);
  const [pause, setPause] = createSignal(false);
  const [hideTimers, setHideTimers] = createSignal(false);
  const buttons = [
    {
      value: 300,
      display: "5 minutes",
    },
    {
      value: 900,
      display: "15 minutes",
    },
    {
      value: 1800,
      display: "30 minutes",
    },
    {
      value: 3600,
      display: "1 heure",
    },
    {
      value: 5400,
      display: "1 h 30",
    },
    {
      value: 7200,
      display: "2 heures",
    },
  ];
  const toggleTimer = () => {
    setTimerStart(!timerStart());
    setPause(!pause());
    setHideTimers(true);
    appWindow.startDragging();
  };
  const triggerResetDialog = async () => {
      let shouldReset = await ask("Annuler le Chrono ?", {
        title: "Discipline",
        type: "warning",
      });
      if (shouldReset) {
        setTime(0);
        setTimerStart(false);
        setHideTimers(false);
        setPause(false);
      }
    };
  createEffect(() => {
    const interval = setInterval(() => {
      if (timerStart()) {
        if (time() > 0) {
          setTime(time() - 1);
        } else if (time() === 0) {
          sendNotification({
                     title: `Time's up!`,
                     body: `Congrats on completing a session!🎉`,
                   });
          clearInterval(interval);
          setHideTimers(false);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div class="Pomo" style={{ height: "100%" }} data-tauri-drag-region>
      <div data-tauri-drag-region>
        <p class="Text-Title" data-tauri-drag-region>
          Discipline
        </p>
        <h1 class="Text-Timer" data-tauri-drag-region>
          {`${
            Math.floor(time() / 60) < 10
              ? `0${Math.floor(time() / 60)}`
              : `${Math.floor(time() / 60)}`
          }:${time() % 60 < 10 ? `0${time() % 60}` : time() % 60}`}
        </h1>
        <div data-tauri-drag-region>
          <button type="button"
            classList={{Play: pause() === false, Pause: pause() === true}}
            onClick={toggleTimer}
          >
            {!timerStart() ? "Start" : "Pause"}
          </button>
          <button
          class="reset"
          onClick={triggerResetDialog}
        >
          Reset
        </button>
        </div>
        <div class="timesFlex" classList={{visible: hideTimers() === false, hidden: hideTimers() === true}} data-tauri-drag-region>
          {buttons.map(({ value, display }) => (
            <button class="times"
              onClick={() => {
                setTimerStart(false);
                setPause(false);
                setTime(value);
              }}
            >
              {display}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Pomo;