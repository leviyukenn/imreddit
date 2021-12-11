import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { GOOGLE_AUTH_CLIENT_ID } from "../../const/const";
import { FrontendError } from "../../const/errors";
import {
  RegularUserFragmentDoc,
  useGoogleAuthenticationMutation,
} from "../../generated/graphql";
import GoogleIcon from "../../images/icons/google_icon.svg";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { AlertSeverity, SnackbarAlert } from "../errorHandling/SnackbarAlert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    googleIconContaniner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 46,
      height: 46,
      borderRadius: 4,
      marginRight: "0.5rem",
      backgroundColor: "#fff",
    },
    button: {
      width: "100%",
      height: 52,
      fontWeight: 600,
      borderRadius: 4,
      border: "1px solid #0079d3",
      color: "#0079d3",
      padding: "0.25rem 0.1rem",
      "&:hover": {
        backgroundColor: "#0079d3",
        color: "#fff",
      },
      "&:hover $googleIconContaniner": {},
    },
  })
);

interface GoogleButtonProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

function useGoogleAuthentication(
  setIsSubmitting: (isSubmitting: boolean) => void
) {
  const [login] = useGoogleAuthenticationMutation({
    update(cache, { data: loginResponse }) {
      cache.modify({
        fields: {
          me() {
            if (!loginResponse?.googleAuthentication.user) {
              return null;
            }
            const loggedInUserRef = cache.writeFragment({
              fragment: RegularUserFragmentDoc,
              data: loginResponse.googleAuthentication.user,
            });
            return loggedInUserRef;
          },
        },
      });
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onClose } = useUserModalState();
  const router = useRouter();

  const onLogin = useCallback(
    async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      setIsSubmitting(true);

      const loginResponse = await login({
        variables: { idToken: (response as GoogleLoginResponse).tokenId },
      });

      const loginResult = loginResponse.data?.googleAuthentication;

      if (!loginResult) {
        setErrorMessage(FrontendError.ERR0002);
        setIsSubmitting(false);
        return;
      }

      if ((loginResult.errors?.length || 0) > 0) {
        setErrorMessage(loginResult.errors![0].message);
        setIsSubmitting(false);
        return;
      }

      if (loginResult.user) {
        if (isOpen) {
          onClose();
          return;
        }
        router.back();
      }
    },
    [isOpen, login, router, onClose]
  );

  return { onLogin, errorMessage, setErrorMessage };
}

function GoogleButton({ isSubmitting, setIsSubmitting }: GoogleButtonProps) {
  const clientId = GOOGLE_AUTH_CLIENT_ID;
  const { onLogin, errorMessage, setErrorMessage } = useGoogleAuthentication(
    setIsSubmitting
  );
  const classes = useStyles();

  return (
    <>
      <SnackbarAlert
        {...{
          message: errorMessage,
          setMessage: setErrorMessage,
          severity: AlertSeverity.ERROR,
        }}
      />
      <GoogleLogin
        clientId={clientId}
        onSuccess={onLogin}
        onFailure={() => setErrorMessage(FrontendError.ERR0001)}
        disabled={isSubmitting}
        uxMode="redirect"
        render={({ onClick }: { onClick: () => void }) => (
          <Button
            variant="outlined"
            classes={{ root: classes.button, label: classes.label }}
            onClick={onClick}
          >
            <Box className={classes.googleIconContaniner}>
              <GoogleIcon />
            </Box>
            CONNECT TO GOOGLE
          </Button>
        )}
      />
    </>
  );
}

export default GoogleButton;
