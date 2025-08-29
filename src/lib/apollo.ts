import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const GRAPHQL_ENDPOINT = "http://127.0.0.1:8000/graphql/";

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default client;