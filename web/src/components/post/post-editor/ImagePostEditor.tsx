import {
  Box,
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
  Typography,
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SERVER_URL } from "../../../const/const";
import { useUploadImageMutation } from "../../../generated/graphql";

interface ImagePostEditorProps {}
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
    dropzoneWithPreview: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      minHeight: "280px",
      borderRadius: "4px",
      border: "1px dashed #d6d6d6",
      padding: "12px",
    },
    activedDropzone: {
      borderColor: theme.palette.primary.main,
      borderWidth: "3px",
    },
    uploadButton: {
      borderRadius: "9999px",
      textTransform: "none",
      marginLeft: "12px",
      textDecoration: "",
      fontWeight: 700,
    },
    previewGridContainer: {
      height: "110px",
      overflow: "auto",
      flexWrap: "nowrap",
    },

    imageOutterBox: {
      width: "100px",
      height: "100px",
      borderRadius: "4px",
      cursor: "pointer",
      opacity: "0.5",
      "&:hover": {
        opacity: 1,
      },
    },
    selectedImageOutterBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100px",
      height: "100px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "2px solid #898989",
    },
    deleteButton: {
      display: "none",
      position: "absolute",
      top: "4px",
      right: "4px",
      color: "#FFFFFF",
      backgroudColor: "black",
    },

    imageInnerBox: {
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundPosition: "50%",
      backgroundSize: "cover",
      borderRadius: "4px",
      "&:hover $deleteButton": {
        display: "inline",
      },
    },
    selectedImageInnerBox: {
      position: "relative",
      width: "84px",
      height: "84px",
      backgroundPosition: "50%",
      backgroundSize: "cover",
      borderRadius: "4px",
      "&:hover $deleteButton": {
        display: "inline",
      },
    },
    addImageBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100px",
      height: "100px",
      borderRadius: "4px",
      border: "1px dashed #d6d6d6",
    },
    addInfoSection: {
      width: "100%",
    },

    previewImageBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
      height: "324px",
      margin: "12px 12px 12px 0",
      borderRadius: "4px",
      backgroundColor: "#f6f7f8",
    },
    previewImage: {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

interface UploadedImage {
  name: string;
  url: string;
}

const ImagePostEditor = ({}: ImagePostEditorProps) => {
  const [uploadImage] = useUploadImageMutation();
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const noImageUploded = useMemo(() => uploadedImages.length === 0, [
    uploadedImages,
  ]);
  const [message, setMessage] = useState<{
    severity: "info" | "success" | "warning" | "error";
    message: string;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  const onDrop = useCallback(
    (files: File[]) => {
      setUploading(true);
      files.forEach(async (file) => {
        const response = await uploadImage({ variables: { file } });
        if (response.errors) {
          setMessage({
            severity: "error",
            message: "Uploading failed. please try it again later.",
          });
          return;
        }
        if (response.data?.uploadImage.errors) {
          setMessage({
            severity: "warning",
            message: response.data.uploadImage.errors[0].message,
          });
          return;
        }

        if (response.data?.uploadImage.url) {
          setUploadedImages((prevState) => [
            ...prevState,
            {
              url: SERVER_URL + response.data!.uploadImage.url,
              name: response.data!.uploadImage.url!,
            },
          ]);
          setMessage({
            severity: "success",
            message: "Image successfully uploaded.",
          });
        }
      });
      setUploading(false);
    },
    [uploadImage]
  );

  const onCloseSnackbar = useCallback(() => {
    setMessage(null);
  }, [setMessage]);

  const onImageSelected = useCallback((name: string) => {
    return () => setSelectedImage(name);
  }, []);

  const onImageDeleted = useCallback((name: string) => {
    return () =>
      setUploadedImages((prevState) =>
        prevState.filter((img) => img.name !== name)
      );
  }, []);

  const {
    acceptedFiles,
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
    <Box>
      <Box
        {...getRootProps({
          className: `${
            noImageUploded ? classes.dropzone : classes.dropzoneWithPreview
          } ${isDragActive ? classes.activedDropzone : ""}`,
        })}
      >
        <input {...getInputProps()} />
        {noImageUploded ? (
          !isDragActive ? (
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
          )
        ) : null}
        {!noImageUploded ? (
          <Grid container spacing={1} className={classes.previewGridContainer}>
            {uploadedImages.map((uploadedImage) => {
              return (
                <Grid item key={uploadedImage.name}>
                  <Box
                    className={
                      selectedImage === uploadedImage.name
                        ? classes.selectedImageOutterBox
                        : classes.imageOutterBox
                    }
                  >
                    <Box
                      style={{ backgroundImage: `url(${uploadedImage.url})` }}
                      className={
                        selectedImage === uploadedImage.name
                          ? classes.selectedImageInnerBox
                          : classes.imageInnerBox
                      }
                      onClick={onImageSelected(uploadedImage.name)}
                    >
                      <IconButton
                        size="small"
                        className={classes.deleteButton}
                        onClick={onImageDeleted(uploadedImage.name)}
                      >
                        <HighlightOffTwoToneIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
            <Grid item>
              <Box className={classes.addImageBox}>
                <IconButton size="medium" onClick={open}>
                  <AddOutlinedIcon fontSize="large" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ) : null}
        {selectedImage ? (
          <Box display="flex" className={classes.addInfoSection}>
            <Box className={classes.previewImageBox}>
              <img
                src={
                  uploadedImages.find((img) => img.name === selectedImage)?.url
                }
                className={classes.previewImage}
              />
            </Box>
            <Box></Box>
          </Box>
        ) : null}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!message}
        autoHideDuration={5000}
        onClose={onCloseSnackbar}
      >
        <MuiAlert elevation={6} variant="filled" severity={message?.severity}>
          {message?.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};
export default ImagePostEditor;
