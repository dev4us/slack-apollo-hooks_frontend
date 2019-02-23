import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "react-apollo";
import { GlobalProvider } from "./GlobalState/store";

import client from "./apollo";

import GlobalStyle from "./global-styles";

ReactDOM.render(
  <>
    <GlobalProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      <GlobalStyle />
    </GlobalProvider>
  </>,
  document.getElementById("root")
);
