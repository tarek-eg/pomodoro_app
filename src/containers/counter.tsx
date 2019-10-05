import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { IRootState } from "../state";
import { Time } from "../time";
import { startTimer, stopTimer, setTime } from "../state/actions/timerActions";
import { PomodoroButtons, TimeTypes } from "../components/pomodoroButtons";
import { CountDown } from "../components/countDown";
import { PlayButtons } from "../components/playButtons";

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
    name: TimeTypes,
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

  return (
    <Container>
      <PomodoroButtons
        selectedButton={duration.name}
        handleClick={setTaskTime}
      />

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
