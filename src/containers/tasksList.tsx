import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { IRootState } from "../state";
import { Time } from "../time";

const Container = styled.aside`
  display: flex;
  justify-content: center;
  background: #fff;
  height: 100vh;
  flex: 1;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  padding: 15px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;

const Text = styled.span`
  margin-right: 3px;
`;

interface IStateProps {
  timeLine: Time[];
}

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
