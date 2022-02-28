import { useCallback } from "react";
import { FrontendError } from "../../const/errors";
import { useEditCommunityDescriptionMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";

export const useSaveCommunityDescription = () => {
  const { onOpenSnackbarAlert, handleMutationError } = useSnackbarAlert();
  const [saveDescription] = useEditCommunityDescriptionMutation({
    onError: handleMutationError,
  });
  const onSaveDescription = useCallback(
    async (communityId: string, description: string) => {
      const result = await saveDescription({
        variables: { communityId, description },
      }).catch(() => null);
      if (!result) {
        onOpenSnackbarAlert({
          message: FrontendError.ERR0002,
          severity: AlertSeverity.ERROR,
        });
        return;
      }

      if (result.errors) {
        onOpenSnackbarAlert({
          message: result.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return;
      }

      const communityResponse = result.data?.editCommunityDescription;
      if (communityResponse?.errors) {
        onOpenSnackbarAlert({
          message: communityResponse.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return;
      }

      if (communityResponse?.community) {
        onOpenSnackbarAlert({
          message: `Community settings updated successfully`,
          severity: AlertSeverity.SUCCESS,
        });
        return;
      }
    },
    []
  );

  return {
    onSaveDescription,
  };
};
