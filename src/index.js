import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "react-apollo";

import client from "./apollo";

import GlobalStyle from "./global-styles";

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    <GlobalStyle />
  </>,
  document.getElementById("root")
);
