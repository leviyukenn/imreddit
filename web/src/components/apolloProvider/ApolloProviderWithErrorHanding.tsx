import { ApolloClient, ApolloProvider, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import React, { useMemo } from "react";
import apolloClient from "../../apollo-client/apollo-client";
import { FrontendError } from "../../const/errors";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";

interface ApolloProviderWithErrorHandingProps {
  children?: React.ReactNode;
}

const ApolloProviderWithErrorHanding = ({
  children,
}: ApolloProviderWithErrorHandingProps) => {
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, networkError, forward, operation }) => {
        if (graphQLErrors && graphQLErrors.length !== 0) {
          onOpenSnackbarAlert({
            message: graphQLErrors[0].message,
            severity: AlertSeverity.ERROR,
          });
          return forward(operation);
        }
        if (networkError) {
          onOpenSnackbarAlert({
            message: FrontendError.ERR0003,
            severity: AlertSeverity.ERROR,
          });
          return forward(operation);
        }
      }),
    []
  );
  const apolloClientWithErrorHanding = useMemo(
    () =>
      new ApolloClient({
        cache: apolloClient.cache,
        link: from([errorLink, apolloClient.link]),
      }),

    [apolloClient]
  );

  return (
    <ApolloProvider client={apolloClientWithErrorHanding}>
      {children}
    </ApolloProvider>
  );
};
export default ApolloProviderWithErrorHanding;
