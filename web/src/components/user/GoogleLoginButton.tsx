import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Snackbar,
  Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { GOOGLE_AUTH_CLIENT_ID } from "../../const/const";
import {
  RegularUserFragmentDoc,
  useGoogleAuthenticationMutation,
} from "../../generated/graphql";
import GoogleIcon from "../../images/icons/google_icon.svg";
import { useUserModalState } from "../../redux/hooks/useUserModalState";

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

function GoogleButton() {
  const clientId = GOOGLE_AUTH_CLIENT_ID;
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
  const [error, setError] = useState("");

  const { isOpen, onClose } = useUserModalState();
  const router = useRouter();

  const onLogin = useCallback(
    async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      const loginResult = await login({
        variables: { idToken: (response as GoogleLoginResponse).tokenId },
      });

      if ((loginResult.data?.googleAuthentication.errors?.length || 0) > 0) {
        setError(loginResult.data!.googleAuthentication.errors![0].message);
      }

      if (loginResult.data?.googleAuthentication.user) {
        if (!isOpen) {
          router.back();
          return;
        }
        onClose();
      }
    },
    [login, isOpen, onClose]
  );
  const classes = useStyles();

  const handleClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setError("");
    },
    []
  );

  return (
    <>
      <Snackbar open={!error} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onLogin}
        onFailure={(error) => setError("Failed to login with google account.")}
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
