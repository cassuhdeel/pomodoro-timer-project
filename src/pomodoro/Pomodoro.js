import React, { useState } from "react";
import Play from "./Controls";
import useInterval from "../utils/useInterval";
import BreakTime from "./Break";
import FocusTime from "./Focus";
import Timer from "./Timer";

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [disableControl, setDisableControl] = useState(false)
  const [disableStop, setDisableStop] = useState(true)
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);


  const higherBreak = () => {
    setBreakDuration(Math.min(15, breakDuration + 1))
  }

  const lowerBreak = () => {
    setBreakDuration(Math.max(1, breakDuration - 1))
  }

const higherFocus = () => {
  setFocusDuration(Math.min(60, focusDuration + 5))
}

  const lowerFocus = () => {
    setFocusDuration(Math.max(5, focusDuration - 5))
  }


  function handleStop () {
  
    setBreakDuration(5)
    setDisableStop(true)
    setSession(null)
    setDisableControl(false)
    setIsTimerRunning(false)
    setFocusDuration(25)
    
  }
  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
   useInterval(() => {
    if (session.timeRemaining === 0) {
      new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
      return setSession(nextSession(focusDuration, breakDuration));
    }
    return setSession(nextTick);
  },
  isTimerRunning ? 1000 : null
);

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setDisableControl(true)
    setDisableStop(false)
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">


        <FocusTime higherFocus = {higherFocus}
        lowerFocus = {lowerFocus}
        focusDuration = {focusDuration} 
        disableControl = {disableControl}
        />
        <BreakTime higherBreak = {higherBreak}
        lowerBreak = {lowerBreak}
        breakDuration = {breakDuration} 
        disableControl = {disableControl}
        />
      </div>


      <div className="row">
        <Play isTimerRunning={isTimerRunning}
          playPause={playPause} 
          handleStop = {handleStop}
          disableStop = {disableStop} />
      </div>
      <Timer session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration} />
    </div>
  );
}

export default Pomodoro;
