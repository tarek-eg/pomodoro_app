import React from "react";
import styled from "styled-components";

import Counter from "./containers/counter";

const Root = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const App = () => {
  return (
    <Root>
      <Counter />
    </Root>
  );
};

export default App;
