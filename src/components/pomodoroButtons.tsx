import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faCoffee,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  background: #ffe2e2;
  text-transform: uppercase;
  margin: 10px;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: #ffc7c7;
  }
  &:active {
    transform: scale(0.97);
  }
`;

const BreakButton = styled(PomodoroButton)`
  width: 100px;
  height: 100px;
  font-size: 1rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
`;
const PomodoroIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
`;

const Text = styled.span`
  margin-bottom: 5px;
`;

interface Props {
  handleClick(name: string, minutes: number, seconds?: number): any;
}

export enum TimeTypes {
  LUNCH = "Lunch Break",
  POMODORO = "Pomodoro",
  COFFEE = "Coffe Break"
}

export const PomodoroButtons: React.FC<Props> = ({ handleClick }: Props) => {
  return (
    <ButtonsContainer>
      <BreakButton onClick={handleClick(TimeTypes.LUNCH, 30)}>
        <Text>Lunch break</Text>
        <StyledIcon icon={faHamburger} />
      </BreakButton>
      <PomodoroButton onClick={handleClick(TimeTypes.POMODORO, 25)}>
        <Text>Pomodoro</Text>
        <PomodoroIcon icon={faBriefcase} />
      </PomodoroButton>
      <BreakButton onClick={handleClick(TimeTypes.COFFEE, 0, 1)}>
        <Text>Cofee break</Text>
        <StyledIcon icon={faCoffee} />
      </BreakButton>
    </ButtonsContainer>
  );
};
