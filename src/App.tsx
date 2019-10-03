import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Time } from "./time";
import { IRootState } from "./state";
import { startTimer, stopTimer, setTime } from "./state/actions/timerActions";
import { connect } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20%;
`;

interface IStateProps {
  counting: boolean;
  duration: Time;
  timeLeft: Time;
}

const mapState = ({ timer }: IRootState): IStateProps => ({
  counting: timer.counting,
  duration: timer.duration,
  timeLeft: timer.timeLeft
});

const mapActions = { startTimer, stopTimer, setTime };
type DispatchProps = typeof mapActions;

type Props = DispatchProps & IStateProps;

const App: React.FC<Props> = ({
  counting,
  duration,
  setTime,
  startTimer,
  stopTimer,
  timeLeft
}) => {
  const [pomodoroTime, setPomodoroTime] = useState();

  const toggleTimer = () => {
    counting ? stopTimer() : startTimer();
  };

  const resetTimer = () => {
    stopTimer();
    setTime(Time.fromTime(duration));
  };

  const setNewTime = () => {
    setTime(new Time(2, 10));
  };

  return (
    <div className="App">
      <Container>
        <button onClick={setNewTime}>Set Time</button>
        <button onClick={toggleTimer}>{counting ? "Stop" : "Start"}</button>
        <button onClick={resetTimer}>Reset pomodoro</button>

        <h2>
          Bomodoro time {duration.minutes}:{duration.seconds}
        </h2>
        <h2>
          Time left{" "}
          {timeLeft.toString().substring(0, timeLeft.toString().indexOf(":"))}:
          {timeLeft.toString().substring(timeLeft.toString().indexOf(":") + 1)}
        </h2>
      </Container>
    </div>
  );
};

export default connect(
  mapState,
  mapActions
)(App);
