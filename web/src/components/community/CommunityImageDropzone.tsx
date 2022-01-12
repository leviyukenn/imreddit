import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadImage } from "../hooks/useUploadImage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageDropZoneTitle: {
      color: "#878a8c",
    },
    dropzone: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: 100,
      width: "100%",
      margin: "0.25rem 0",
      backgroundColor: "#f6f7f8",
      border: "1px solid #edeff1",
      borderRadius: "4px",
      cursor: "pointer",
    },
    dropzoneIcon: {
      fontSize: "3rem",
      color: "#878a8c",
    },
    dropzoneText: {
      fontSize: "0.75rem",
      color: "#7c7c7c",
    },
    activeDropzone: {
      backgroundColor: "#fff",
    },
  })
);

interface CommunityImageDropzoneProps {
  setUploadedImagePath: (path: string) => void;
}

const CommunityImageDropzone = ({
  setUploadedImagePath,
}: CommunityImageDropzoneProps) => {
  const classes = useStyles();
  const { onUpload, uploading } = useUploadImage();
  const onDrop = useMemo(
    () =>
      onUpload((uploadedImagePath: string) =>
        setUploadedImagePath(uploadedImagePath)
      ),
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: "image/*",
  });

  return (
    <Box
      {...getRootProps({
        className: `${classes.dropzone} ${
          isDragActive ? classes.activeDropzone : ""
        }`,
      })}
      onClick={open}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon className={classes.dropzoneIcon} />
      <Typography variant="subtitle2" className={classes.dropzoneText}>
        Drag and Drop or Upload Image
      </Typography>
    </Box>
  );
};
export default CommunityImageDropzone;
