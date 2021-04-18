import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import apolloClient from "../apollo-client/apollo-client";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
