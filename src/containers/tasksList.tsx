import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHamburger,
  faBriefcase,
  IconDefinition,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

import { IRootState } from "../state";
import { Time } from "../time";
import { PlayButton } from "../components/playButtons";
import { deletePomodoro } from "../state/actions/timerActions";

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
  min-width: 250px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
  padding: 0;
`;

const ListItem = styled.li<{ isPomodoro: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #8785a2;
  background: ${({ isPomodoro }) =>
    isPomodoro ? "linear-gradient(45deg, #ffe2e2, #f6f6f6);" : "transparent"};
  font-weight: ${({ isPomodoro }) => (isPomodoro ? 600 : 400)};
`;

const Text = styled.span`
  margin-right: 10px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const DeleteButton = styled(PlayButton)`
  display: flex;
  font-size: 1.2rem;
  margin: 0;
  background: transparent;
  border: none;
  padding: 0 5px;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.97);
  }
`;
const Title = styled.h2`
  margin: 5px 0;
`;

interface IStateProps {
  timeLine: Time[];
}

interface IconProps {
  [key: string]: IconDefinition;
}

const mapNameToIcon: IconProps = {
  "Coffe Break": faCoffee,
  "Lunch Break": faHamburger,
  Pomodoro: faBriefcase,
  Task: faBriefcase
};

const mapState = ({ timer }: IRootState): IStateProps => ({
  timeLine: timer.timeLine
});

const mapActions = { deletePomodoro };

type DispatchProps = typeof mapActions;

type Props = DispatchProps & IStateProps;

const TasksList: React.FC<Props> = ({ timeLine, deletePomodoro }) => {
  return (
    <Container>
      <Title>Time Line</Title>
      <List>
        {timeLine.map((time, index) => {
          console.log(time);
          return (
            <ListItem isPomodoro={time.name === "Pomodoro"} key={index}>
              <StyledIcon icon={mapNameToIcon[time.name]} />{" "}
              <Text>{time.name}</Text>
              <Text>|</Text>
              <Text>{time.toString()}</Text>
              <DeleteButton onClick={() => deletePomodoro(index)}>
                <FontAwesomeIcon icon={faTimes} />
              </DeleteButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default connect(
  mapState,
  mapActions
)(TasksList);
