import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
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

interface Props {
  toggleTimer(): void;
  resetTimer(): void;
  counting: boolean;
}

export const PlayButtons: React.FC<Props> = ({
  counting,
  resetTimer,
  toggleTimer
}) => {
  return (
    <PlayButtonsContainer>
      <PlayButton onClick={toggleTimer}>
        <FontAwesomeIcon icon={faPlay} />{" "}
        <ButtonLabel>{counting ? "Pause" : "Start"}</ButtonLabel>
      </PlayButton>
      <PlayButton onClick={resetTimer}>
        <FontAwesomeIcon icon={faPause} /> <ButtonLabel>Reset</ButtonLabel>
      </PlayButton>
    </PlayButtonsContainer>
  );
};
