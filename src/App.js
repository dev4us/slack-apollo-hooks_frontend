import React from "react";
import styled from "styled-components";

import LeftPannel from "./Components/LeftPannel";
import RightPannel from "./Components/RightPannel";

const MainFrame = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;
const App = () => {
  return (
    <MainFrame>
      <LeftPannel />
      <RightPannel />
    </MainFrame>
  );
};

export default App;
