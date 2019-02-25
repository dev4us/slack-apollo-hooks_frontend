import React from "react";
import styled from "styled-components";

import LeftPannel from "./Components/LeftPannel";
import RightPannel from "./Components/RightPannel";

import Favicon from "react-favicon";
import Helmet from "react-helmet";
import GHCorner from "react-gh-corner";

const MainFrame = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;
const App = () => {
  return (
    <MainFrame>
      <GHCorner
        href="https://github.com/dev4us/slack-apollo-hooks_frontend"
        size={80}
        bgColor="#9f4940"
      />
      <Favicon url="//raw.githubusercontent.com/dev4us/source_warehouse/master/images/slack.ico" />
      <Helmet>
        <title>Slack witch apollo & hooks - dev4us</title>
      </Helmet>
      <LeftPannel />
      <RightPannel />
    </MainFrame>
  );
};

export default App;
