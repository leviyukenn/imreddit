import { Box } from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import { FrontendError } from "../../../const/errors";
import { useUploadImageMutation } from "../../../generated/graphql";
import { useSnackbarAlert } from "../../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../../redux/types/types";
import { UploadedImage } from "../../types/types";
import ImagePostEditorDropZone from "./ImagePostEditorDropZone";
import ImagePostEditorPreview from "./ImagePostEditorPreview";

interface ImagePostEditorProps {
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

function useUploadImage() {
  const [uploadImage] = useUploadImageMutation();
  const [uploading, setUploading] = useState(false);
  const { onOpenSnackbarAlert } = useSnackbarAlert();

  const onUpload = useCallback(
    (successCallback: (uploadedImagePath: string) => void) => (
      files: File[]
    ) => {
      setUploading(true);
      files.forEach(async (file) => {
        const response = await uploadImage({ variables: { file } }).catch(
          () => null
        );
        if (!response) {
          onOpenSnackbarAlert({
            message: FrontendError.ERR0002,
            severity: AlertSeverity.ERROR,
          });
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
    },
    [uploadImage]
  );
  return { uploading, onUpload };
}

const ImagePostEditor = ({
  uploadedImages,
  setUploadedImages,
}: ImagePostEditorProps) => {
  const [selectedImage, setSelectedImage] = useState("");
  const hasImageUploded = useMemo(() => uploadedImages.length !== 0, [
    uploadedImages,
  ]);

  const { onUpload, uploading } = useUploadImage();

  const onDrop = useCallback(
    () =>
      onUpload((uploadedImagePath: string) => {
        const uploadedImage = {
          path: uploadedImagePath,
          caption: "",
          link: "",
        };
        setUploadedImages((prevState) => [...prevState, uploadedImage]);
        setSelectedImage(uploadedImage.path);
      }),
    [onUpload, setUploadedImages, setSelectedImage]
  );

  return (
    <Box>
      {hasImageUploded ? (
        <ImagePostEditorPreview
          {...{
            uploadedImages,
            selectedImage,
            setUploadedImages,
            setSelectedImage,
            onDrop,
          }}
        />
      ) : (
        <ImagePostEditorDropZone onDrop={onDrop} />
      )}
    </Box>
  );
};
export default ImagePostEditor;
