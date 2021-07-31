import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import fetch from "node-fetch";
import { toast } from "react-toastify";

const link = "http://localhost:4000/graphql";
const httpLink = createHttpLink({
  uri: link,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("edexaToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err?.extensions?.exception?.response?.statusCode) {
        case 401:
          toast.error(err?.message);
          window.location.href = "/auth/login";
          break;
        default:
          break;
      }
    }
  }

  if (networkError) {
    //  TODO: Handle network error once server is ready
  }
});

const ApolloGqlClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default ApolloGqlClient;
