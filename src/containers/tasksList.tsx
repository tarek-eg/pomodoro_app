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

const Container = styled.aside`
  display: flex;
  justify-content: center;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
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
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 1.2rem;
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

const TasksList: React.FC<IStateProps> = ({ timeLine }) => {
  return (
    <Container>
      <List>
        {timeLine.map((time, index) => {
          console.log(time);
          return (
            <ListItem isPomodoro={time.name === "Pomodoro"} key={index}>
              <StyledIcon icon={mapNameToIcon[time.name]} />{" "}
              <Text>{time.name}</Text>
              <Text>|</Text>
              <Text>{time.toString()}</Text>
              <DeleteIcon icon={faTimes} />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default connect(mapState)(TasksList);
