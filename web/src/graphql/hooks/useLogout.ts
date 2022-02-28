import { useGoogleLogout } from "react-google-login";
import { GOOGLE_AUTH_CLIENT_ID } from "../../const/const";
import { useLogoutMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";

export function useLogout() {
  const { onOpenSnackbarAlert,handleMutationError } = useSnackbarAlert();
  const [logout, { loading: logoutLoading }] = useLogoutMutation({
    onError:handleMutationError,
    update(cache, { data: logoutResponse }) {
      cache.modify({
        fields: {
          me(loggedInUser) {
            if (logoutResponse?.logout) {
              return null;
            }
            return loggedInUser;
          },
        },
      });
    },
  });

  const { signOut, loaded } = useGoogleLogout({
    clientId: GOOGLE_AUTH_CLIENT_ID,
    onFailure: () =>
      onOpenSnackbarAlert({
        message: "Failed to logout with google account",
        severity: AlertSeverity.ERROR,
      }),
    onLogoutSuccess: logout,
  });

  return { logout: signOut, loading: logoutLoading };
}
