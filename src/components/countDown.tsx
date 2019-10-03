import React from "react";
import styled from "styled-components";

import { Time } from "../time";
import { PlayButton } from "./playButtons";

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

const TimerContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  timeLeft: Time;
  changeTime(minues: number, seconds: number): any;
}

export const CountDown: React.FC<Props> = ({ timeLeft, changeTime }) => {
  return (
    <TimerContainer>
      <ButtonContainer>
        <PlayButton onClick={changeTime(1, 0)}> +1</PlayButton>
        <PlayButton onClick={changeTime(-1, 0)}> -1</PlayButton>
      </ButtonContainer>
      <Timer>
        {timeLeft.toString().substring(0, timeLeft.toString().indexOf(":"))}
      </Timer>
      <Timer>:</Timer>
      <Timer>
        {timeLeft.toString().substring(timeLeft.toString().indexOf(":") + 1)}
      </Timer>
      <ButtonContainer>
        <PlayButton onClick={changeTime(0, 10)}> +10</PlayButton>
        <PlayButton onClick={changeTime(0, -10)}> -10</PlayButton>
      </ButtonContainer>
    </TimerContainer>
  );
};
