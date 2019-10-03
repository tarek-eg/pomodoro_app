import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHamburger,
  faBriefcase,
  IconDefinition
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
  padding: 15px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #8785a2;
`;

const Text = styled.span`
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 7px;
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
        {timeLine.map(time => {
          return (
            <ListItem>
              <StyledIcon icon={mapNameToIcon[time.name]} />{" "}
              <Text>{time.name}</Text>
              <Text>|</Text>
              <Text>{time.toString()}</Text>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default connect(mapState)(TasksList);
