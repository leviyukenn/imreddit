import { Box } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { useUploadImage } from "../../../graphql/hooks/useUploadImage";
import { UploadedImage } from "../../types/types";
import ImagePostEditorDropZone from "./ImagePostEditorDropZone";
import ImagePostEditorPreview from "./ImagePostEditorPreview";

interface ImagePostEditorProps {
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
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

  const onDrop = useMemo(
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
