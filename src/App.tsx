import React, { useState } from "react";
import styled from "styled-components";

import Counter from "./containers/counter";
import TimeLine from "./containers/tasksList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { PlayButton } from "./components/playButtons";

const Container = styled.div`
  display: flex;
`;

const StyledButton = styled(PlayButton)`
  position: fixed;
  top: 9px;
  right: 9px;
  font-size: 2rem;
  margin: 0;
`;

const App = () => {
  const [toggleConfig, setToggleConfig] = useState(true);

  const toggleShow = () => {
    setToggleConfig(prev => !prev);
  };

  return (
    <Container>
      <StyledButton onClick={toggleShow} tabIndex={0}>
        <FontAwesomeIcon icon={faUserCog} />
      </StyledButton>

      <TimeLine />
      {toggleConfig && <Counter />}
    </Container>
  );
};

export default App;
