import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

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
