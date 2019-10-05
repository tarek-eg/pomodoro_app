import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faCoffee,
  faLaptopCode
} from "@fortawesome/free-solid-svg-icons";

import { media } from "../utils/media";

const ButtonsContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 20px;
  ${media.tablet`
    margin:0;
  `}
`;

export const PomodoroButton = styled.button<{ selected: boolean }>`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 5px solid #8785a2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "#ffc7c7" : "#ffe2e2")};
  text-transform: uppercase;
  margin: 10px;
  transition: all 0.1s ease-in;
  &:hover {
    background: #ffc7c7;
  }
  &:active {
    transform: scale(0.97);
  }
  &:focus {
    background: #ffc7c7;
  }

  ${media.tablet`
    width: 200px;
    height: 200px;

  `}
`;

const BreakButton = styled(PomodoroButton)`
  margin: 0;
  width: 70px;
  height: 70px;
  font-size: 0.5rem;
  ${media.tablet`
  width: 100px;
  height: 100px;
  font-size: 1rem;

  `}
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
  selectedButton: TimeTypes;
}

export enum TimeTypes {
  LUNCH = "Lunch Break",
  POMODORO = "Pomodoro",
  COFFEE = "Coffe Break"
}

export const PomodoroButtons: React.FC<Props> = ({
  handleClick,
  selectedButton
}: Props) => {
  return (
    <ButtonsContainer>
      <BreakButton
        selected={selectedButton === TimeTypes.LUNCH}
        onClick={handleClick(TimeTypes.LUNCH, 30)}>
        <Text>Lunch break</Text>
        <StyledIcon icon={faHamburger} />
      </BreakButton>
      <PomodoroButton
        selected={selectedButton === TimeTypes.POMODORO}
        onClick={handleClick(TimeTypes.POMODORO, 25)}>
        <Text>Task</Text>
        <PomodoroIcon icon={faLaptopCode} />
      </PomodoroButton>
      <BreakButton
        selected={selectedButton === TimeTypes.COFFEE}
        onClick={handleClick(TimeTypes.COFFEE, 0, 1)}>
        <Text>Cofee break</Text>
        <StyledIcon icon={faCoffee} />
      </BreakButton>
    </ButtonsContainer>
  );
};
