import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { IRootState } from "../state";
import { Time } from "../time";
import { startTimer, stopTimer, setTime } from "../state/actions/timerActions";
import { PomodoroButtons, TimeTypes } from "../components/pomodoroButtons";
import { CountDown } from "../components/countDown";
import { PlayButtons } from "../components/playButtons";
import { getCache } from "../state/reducers/timerReducers";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

interface IStateProps {
  counting: boolean;
  duration: Time;
  timeLeft: Time;
  timeLine: Time[];
}

const mapState = ({ timer }: IRootState): IStateProps => ({
  counting: timer.counting,
  duration: timer.duration,
  timeLeft: timer.timeLeft,
  timeLine: timer.timeLine
});

const mapActions = { startTimer, stopTimer, setTime };

type DispatchProps = typeof mapActions;

type Props = DispatchProps & IStateProps;

const Counter: React.FC<Props> = ({
  counting,
  duration,
  setTime,
  startTimer,
  stopTimer,
  timeLeft,
  timeLine
}) => {
  const toggleTimer = () => {
    counting ? stopTimer() : startTimer();
  };

  const resetTimer = () => {
    stopTimer();
    setTime(Time.fromTime(duration));
  };

  const setTaskTime = (
    name: string,
    minutes: number,
    seconds: number = 0
  ) => () => {
    stopTimer();
    setTime(new Time(minutes, seconds, name));
  };

  const changeTime = (minutes: number, seconds: number) => () => {
    setTime(
      new Time(
        duration.minutes + minutes,
        duration.seconds + seconds,
        duration.name
      )
    );
  };
  const SumActualPomodoro = () => {
    if (getCache()) {
      const filtered = getCache()!.filter(
        time => time.name === TimeTypes.POMODORO
      );
      console.log(getCache(), filtered);
      const minutes = filtered.reduce((acc, curr) => acc + curr.minutes, 0);
      const seconds = filtered.reduce((acc, curr) => acc + curr.seconds, 0);
      console.log(minutes, seconds);
      return Time.fromTime(new Time(minutes, seconds)).toString();
    }
    return "Nothing yet";
  };

  return (
    <Container>
      <h1>{SumActualPomodoro()}</h1>
      <PomodoroButtons handleClick={setTaskTime} />

      <CountDown changeTime={changeTime} timeLeft={timeLeft} />

      <PlayButtons
        resetTimer={resetTimer}
        toggleTimer={toggleTimer}
        counting={counting}
      />
    </Container>
  );
};

export default connect(
  mapState,
  mapActions
)(Counter);
