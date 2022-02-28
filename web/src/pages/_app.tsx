import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import ApolloProviderWithErrorHanding from "../components/apolloProvider/ApolloProviderWithErrorHanding";
import AlertDialog from "../components/errorHandling/AlertDialog";
import { SnackbarAlert } from "../components/errorHandling/SnackbarAlert";
import PostDetailModal from "../components/post/PostDetailModal";
import LoginRegisterModal from "../components/user/LoginRegisterModal";
import store from "../redux/store";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      {/* <ApolloProvider client={apolloClient}> */}
      <ApolloProviderWithErrorHanding>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <SnackbarAlert />
          <AlertDialog />
          <LoginRegisterModal />
          <PostDetailModal />
        </ThemeProvider>
      </ApolloProviderWithErrorHanding>
      {/* </ApolloProvider> */}
    </Provider>
  );
}

export default MyApp;
