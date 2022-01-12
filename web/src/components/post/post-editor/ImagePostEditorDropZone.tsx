import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDropzone } from "react-dropzone";

interface ImagePostEditorDropZoneProps {
  onDrop: (files: File[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropzone: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "280px",
      borderRadius: "4px",
      border: "1px dashed #d6d6d6",
      padding: "12px",
    },
    uploadButton: {
      borderRadius: "9999px",
      textTransform: "none",
      marginLeft: "12px",
      textDecoration: "",
      fontWeight: 700,
    },
    activeDropzone: {
      borderColor: theme.palette.primary.main,
      borderWidth: "3px",
    },
  })
);
const ImagePostEditorDropZone = ({ onDrop }: ImagePostEditorDropZoneProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    onDrop,
    noClick: true,
    accept: "image/*",
  });
  const classes = useStyles();
  return (
    <Box
      {...getRootProps({
        className: `${classes.dropzone} ${
          isDragActive ? classes.activeDropzone : ""
        }`,
      })}
    >
      <input {...getInputProps()} />
      {!isDragActive ? (
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" color="primary">
            Drag and drop images or
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            className={classes.uploadButton}
            onClick={open}
          >
            Upload
          </Button>
        </Box>
      ) : (
        <Typography variant="subtitle1" color="primary">
          Drop Here to Upload
        </Typography>
      )}
    </Box>
  );
};
export default ImagePostEditorDropZone;
