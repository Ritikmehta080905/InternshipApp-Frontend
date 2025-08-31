import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Use environment variable or fallback to production
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_URL 
  || https://internshipapp-backend.onrender.com/graphql/;

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