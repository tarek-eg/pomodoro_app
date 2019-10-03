import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Time } from "./time";
import { IRootState } from "./state";
import { startTimer, stopTimer, setTime } from "./state/actions/timerActions";

const Root = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ButtonsContainer = styled.div`
  display: flex;
  position: relative;
`;

export const PomodoroButton = styled.button`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #8785a2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  background: #ffe2e2;
  text-transform: uppercase;
  margin: 10px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #ffc7c7;
  }
`;
const Timer = styled.span`
  font-size: 70px;
`;

const CoffeButton = styled(PomodoroButton)`
  width: 100px;
  height: 100px;
  font-size: 20px;
`;

const TimerContainer = styled.div`
  display: flex;
`;

const PlayButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.button`
  border-radius: 4px;
  border: 1px solid #fafafa;
  background: #f6f6f6;
  padding: 10px 47px;
  margin: 10px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in;
  &:hover {
    background: #ebebeb;
  }
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
  const toggleTimer = () => {
    counting ? stopTimer() : startTimer();
  };

  const resetTimer = () => {
    stopTimer();
    setTime(Time.fromTime(duration));
  };

  const setCoffeBreakTime = () => {
    stopTimer();
    setTime(new Time(5, 0));
  };

  const setPomodoroTime = () => {
    stopTimer();
    setTime(new Time(25, 0));
  };
  const setLunchBreakTime = () => {
    stopTimer();
    setTime(new Time(30, 0));
  };

  return (
    <Root>
      <Container>
        <ButtonsContainer>
          <CoffeButton onClick={setLunchBreakTime}>Lunch break</CoffeButton>
          <PomodoroButton onClick={setPomodoroTime}>Pomodoro</PomodoroButton>
          <CoffeButton onClick={setCoffeBreakTime}>Cofee break</CoffeButton>
        </ButtonsContainer>
        <TimerContainer>
          <Timer>
            {timeLeft.toString().substring(0, timeLeft.toString().indexOf(":"))}
          </Timer>
          <Timer>:</Timer>
          <Timer>
            {timeLeft
              .toString()
              .substring(timeLeft.toString().indexOf(":") + 1)}
          </Timer>
        </TimerContainer>
        <PlayButtonsContainer>
          <PlayButton onClick={toggleTimer}>
            {counting ? "Pause" : "Start"}
          </PlayButton>
          <PlayButton onClick={resetTimer}>Reset</PlayButton>
        </PlayButtonsContainer>
      </Container>
    </Root>
  );
};

export default connect(
  mapState,
  mapActions
)(App);
