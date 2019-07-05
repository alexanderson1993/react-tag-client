import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { ApolloLink, split } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { WebSocketLink } from 'apollo-link-ws';

import fetch from "isomorphic-fetch";

import { auth } from "./firebase";
import React from "react";

const uri = "https://18yw3.sse.codesandbox.io/";
const wsUri ="wss://18yw3.sse.codesandbox.io/graphql"

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});

const AuthLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    const token = await auth.currentUser.getIdToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (err) {
    return headers;
  }
});

// TODO: Add sentry event tracking to this when Sentry eventually gets added.
const ErrorLink = onError(({ graphQLErrors, networkError }) => {
  // if (graphQLErrors)
  //   graphQLErrors.map(({ message, locations, path }) =>
  //     // console.error(
  //     //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //     // )
  //   );
  // if (networkError) console.error(`[Network error]: ${networkError}`);
});

const DataLink = createUploadLink({
  uri,
  credentials: "same-origin",
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([AuthLink, ErrorLink, DataLink]),
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  fetch: typeof window !== "undefined" ? window.fetch : fetch,
});

export default ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ApolloProvider>
  );
};
