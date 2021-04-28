import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_SERVER_URL } from "../const/const";

const client = new ApolloClient({
  uri: GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
