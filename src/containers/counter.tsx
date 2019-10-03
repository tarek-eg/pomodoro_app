import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { IRootState } from "../state";
import { Time } from "../time";
import { startTimer, stopTimer, setTime } from "../state/actions/timerActions";

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
const ButtonLabel = styled.span`
  margin-left: 5px;
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

const Counter: React.FC<Props> = ({
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

  const setTaskTime = (
    name: string,
    minutes: number,
    seconds: number = 0
  ) => () => {
    stopTimer();
    setTime(new Time(minutes, seconds, name));
  };

  return (
    <Container>
      <ButtonsContainer>
        <CoffeButton onClick={setTaskTime("Lunch Break", 30)}>
          Lunch break
        </CoffeButton>
        <PomodoroButton onClick={setTaskTime("Pomodor", 25)}>
          Pomodoro
        </PomodoroButton>
        <CoffeButton onClick={setTaskTime("Coffe Break", 0, 1)}>
          Cofee break
        </CoffeButton>
      </ButtonsContainer>
      <TimerContainer>
        <Timer>
          {timeLeft.toString().substring(0, timeLeft.toString().indexOf(":"))}
        </Timer>
        <Timer>:</Timer>
        <Timer>
          {timeLeft.toString().substring(timeLeft.toString().indexOf(":") + 1)}
        </Timer>
      </TimerContainer>
      <PlayButtonsContainer>
        <PlayButton onClick={toggleTimer}>
          <FontAwesomeIcon icon={faPlay} />{" "}
          <ButtonLabel>{counting ? "Pause" : "Start"}</ButtonLabel>
        </PlayButton>
        <PlayButton onClick={resetTimer}>
          <FontAwesomeIcon icon={faPause} /> <ButtonLabel>Reset</ButtonLabel>
        </PlayButton>
      </PlayButtonsContainer>
    </Container>
  );
};

export default connect(
  mapState,
  mapActions
)(Counter);
