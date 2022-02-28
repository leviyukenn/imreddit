import { useCallback, useState } from "react";
import { useUploadImageMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

export function useUploadImage() {
  const { onOpenSnackbarAlert, handleMutationError } = useSnackbarAlert();
  const [uploadImage] = useUploadImageMutation({
    onError: handleMutationError,
  });
  const [uploading, setUploading] = useState(false);
  const { checkIsAuth } = useIsAuth();

  const onUpload = useCallback(
    (successCallback: (uploadedImagePath: string) => void) => {
      return (files: File[]) => {
        setUploading(true);
        files.forEach(async (file) => {
          if (!checkIsAuth()) return false;
          const response = await uploadImage({ variables: { file } });
          if (!response) {
            setUploading(false);
            return;
          }

          if (response.errors) {
            onOpenSnackbarAlert({
              message: response.errors[0].message,
              severity: AlertSeverity.ERROR,
            });
            setUploading(false);
            return;
          }

          const uploadedImageResponse = response.data?.uploadImage;
          if (uploadedImageResponse?.errors) {
            onOpenSnackbarAlert({
              message: uploadedImageResponse?.errors[0].message,
              severity: AlertSeverity.ERROR,
            });
            setUploading(false);
            return;
          }

          if (uploadedImageResponse?.path) {
            successCallback(uploadedImageResponse.path);

            onOpenSnackbarAlert({
              message: "Image successfully uploaded.",
              severity: AlertSeverity.SUCCESS,
            });
            setUploading(false);
          }
        });
      };
    },
    [uploadImage, checkIsAuth]
  );
  return { uploading, onUpload };
}
