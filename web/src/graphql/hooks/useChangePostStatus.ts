import { useCallback } from "react";
import { FrontendError } from "../../const/errors";
import { useChangePostStatusMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

export enum PostStatus {
  NOT_APPROVED,
  APPROVED,
  REMOVED,
}
export function useChnagePostStatus() {
  const { checkIsAuth } = useIsAuth();
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const [changePostStatusMutation, { loading }] = useChangePostStatusMutation();

  const changePostStatus = useCallback(
    async (postId: string, postStatus: PostStatus) => {
      if (!checkIsAuth()) return;
      const response = await changePostStatusMutation({
        variables: { postId, postStatus },
      }).catch((err) => {
        onOpenSnackbarAlert({
          message: err.message || FrontendError.ERR0002,
          severity: AlertSeverity.ERROR,
        });
        return null;
      });
      if (!response) {
        return false;
      }

      if (response.errors?.length) {
        onOpenSnackbarAlert({
          message: response.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      const changePostStatusResult = response.data?.changePostStatus;
      if (changePostStatusResult?.errors?.length) {
        onOpenSnackbarAlert({
          message: changePostStatusResult.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      if (changePostStatusResult?.post) { 
        onOpenSnackbarAlert({
          message: `Post has been ${
            changePostStatusResult.post.postStatus === 1
              ? "approved"
              : "removed"
          }.`,
          severity: AlertSeverity.SUCCESS,
        });
        return true;
      }
      return false;
    },
    [checkIsAuth, changePostStatusMutation, onOpenSnackbarAlert]
  );

  return { changePostStatus, loading };
}
