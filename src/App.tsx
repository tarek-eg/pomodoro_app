import React from "react";
import styled from "styled-components";

import Counter from "./containers/counter";
import TimeLine from "./containers/tasksList";
import { media } from "./utils/media";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
  
  flex-direction: row;
  `}
`;

const App = () => {
  return (
    <Container>
      <Counter />
      <TimeLine />
    </Container>
  );
};

export default App;
