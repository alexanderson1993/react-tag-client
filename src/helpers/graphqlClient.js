import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { ApolloLink, split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"

import fetch from "isomorphic-fetch"
import ws from "ws"

import React from "react"

const authToken =
  typeof window !== "undefined" ? window.localStorage.getItem("auth-token") : ""
const uri = "http://localhost:4000/"
const wsUri = "ws://localhost:4000/graphql"

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    connectionParams: async () => ({
      authToken,
    }),
  },
  webSocketImpl: typeof window === "undefined" ? ws : window.WebSocket,
})

const AuthLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken.replace(/"/gi, "")}` : "",
    },
  }
})

const DataLink = new HttpLink({
  uri,
  credentials: "same-origin",
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  ApolloLink.from([AuthLink, DataLink])
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  fetch: typeof window !== "undefined" ? window.fetch : fetch,
})

export default ({ children }) => {
  return (
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
  )
}
