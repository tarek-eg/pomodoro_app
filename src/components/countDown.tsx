import React from "react";
import styled from "styled-components";

import { Time } from "../time";
import { PlayButton } from "./playButtons";

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

const StyledButton = styled(PlayButton)`
  margin: 0;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.97);
  }
`;

interface Props {
  timeLeft: Time;
  changeTime(minues: number, seconds: number): any;
}

export const CountDown: React.FC<Props> = ({ timeLeft, changeTime }) => {
  return (
    <TimerContainer>
      <ButtonContainer>
        <StyledButton onClick={changeTime(1, 0)}> +1</StyledButton>
        <StyledButton onClick={changeTime(-1, 0)}> -1</StyledButton>
      </ButtonContainer>
      <Timer>
        {timeLeft.toString().substring(0, timeLeft.toString().indexOf(":"))}
      </Timer>
      <Timer>:</Timer>
      <Timer>
        {timeLeft.toString().substring(timeLeft.toString().indexOf(":") + 1)}
      </Timer>
      <ButtonContainer>
        <StyledButton onClick={changeTime(0, 10)}> +10</StyledButton>
        <StyledButton onClick={changeTime(0, -10)}> -10</StyledButton>
      </ButtonContainer>
    </TimerContainer>
  );
};
