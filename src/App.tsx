import React from "react";
import styled from "styled-components";

import Counter from "./containers/counter";
import TimeLine from "./containers/tasksList";

const Container = styled.div`
  display: flex;
`;

const App = () => {
  return (
    <Container>
      <TimeLine />
      <Counter />
    </Container>
  );
};

export default App;
