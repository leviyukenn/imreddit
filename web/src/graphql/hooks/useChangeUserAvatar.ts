import { useCallback } from "react";
import { useChangeUserAvatarMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

export const useChangeUserAvatar = () => {
  const { onOpenSnackbarAlert, handleMutationError } = useSnackbarAlert();
  const [changeUserAvatarMutation] = useChangeUserAvatarMutation({
    onError: handleMutationError,
  });
  const { redirectToLoginIfNotLoggedIn, me } = useIsAuth();
  const onSaveAvatar = useCallback(
    async (avatarSeed: string) => {
      if (!me) {
        redirectToLoginIfNotLoggedIn();
        return false;
      }
      const result = await changeUserAvatarMutation({
        variables: { avatarSeed },
      });
      if (!result) {
        return false;
      }

      if (result.errors) {
        onOpenSnackbarAlert({
          message: result.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return true;
      }

      const userResponse = result.data?.changeUserAvatar;
      if (userResponse) {
        onOpenSnackbarAlert({
          message: `Avatar successfully saved!`,
          severity: AlertSeverity.SUCCESS,
        });
        return true;
      }
      return false;
    },
    [redirectToLoginIfNotLoggedIn, changeUserAvatarMutation]
  );

  return {
    onSaveAvatar,
  };
};
