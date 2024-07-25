import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useKinde } from "./useKinde";

const KindeApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useKinde();
  const httpLink = createHttpLink({
    uri: "http://localhost:9000/api",
  });

  const authLink = setContext(async (_, { headers }) => {
    //const parsedToken = token ? JSON.parse(token) : {};
    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
        latitude,
        longitude,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    name: "ChristmasLightsApp",
    version: "0.1",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default KindeApolloProvider;
