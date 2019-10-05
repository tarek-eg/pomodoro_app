import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSync } from "@fortawesome/free-solid-svg-icons";

const PlayButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlayButton = styled.button`
  border-radius: 4px;
  border: 1px solid #fafafa;
  background: #f6f6f6;
  padding: 10px 47px;
  margin: 10px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  color: #3f51b5;
  &:hover {
    background: #ebebeb;
  }
  &:active {
    transform: scale(0.97);
  }
`;
const ButtonLabel = styled.span`
  margin-left: 5px;
`;

const ResetButton = styled(PlayButton)`
  color: #ff4081;
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
        <FontAwesomeIcon icon={counting ? faPause : faPlay} />{" "}
        <ButtonLabel>{counting ? "Pause" : "Start"}</ButtonLabel>
      </PlayButton>
      <ResetButton onClick={resetTimer}>
        <FontAwesomeIcon icon={faSync} /> <ButtonLabel>Reset</ButtonLabel>
      </ResetButton>
    </PlayButtonsContainer>
  );
};
