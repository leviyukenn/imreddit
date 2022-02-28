import { useCallback } from "react";
import { useEditUserAboutMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

export const useSaveUserAbout = () => {
  const { onOpenSnackbarAlert, handleMutationError } = useSnackbarAlert();
  const [saveAboutMutation] = useEditUserAboutMutation({
    onError: handleMutationError,
  });
  const { checkIsAuth } = useIsAuth();
  const onSaveAbout = useCallback(
    async (about: string) => {
      if (!checkIsAuth) return false;
      const result = await saveAboutMutation({
        variables: { about },
      });
      if (!result) {
        return false;
      }

      if (result.errors) {
        onOpenSnackbarAlert({
          message: result.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      const userResponse = result.data?.editUserAbout;
      if (userResponse?.errors) {
        onOpenSnackbarAlert({
          message: userResponse.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      if (userResponse?.user) {
        onOpenSnackbarAlert({
          message: `User settings updated successfully`,
          severity: AlertSeverity.SUCCESS,
        });
        return true;
      }
      return false;
    },
    [saveAboutMutation]
  );

  return {
    onSaveAbout,
  };
};
