import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { GlobalProvider } from "./GlobalState/store";

import client from "./apollo";

import GlobalStyle from "./global-styles";

ReactDOM.render(
  <>
    <GlobalProvider>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <App />
          <GlobalStyle />
        </ApolloHooksProvider>
      </ApolloProvider>
    </GlobalProvider>
  </>,
  document.getElementById("root")
);
