import {
  Box,
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import MuiAlert from "@material-ui/lab/Alert";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SERVER_URL } from "../../../const/const";
import { useUploadImageMutation } from "../../../generated/graphql";
import { UploadedImage } from "../../types/types";

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
      color: "black",
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
    previewSection: {
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
    addImageInfoBox: {
      margin: "12px 0",
    },
    inputField: {
      marginBottom: "12px",
    },
  })
);

interface ImagePostEditorProps {
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

const ImagePostEditor = ({
  uploadedImages,
  setUploadedImages,
}: ImagePostEditorProps) => {
  const [uploadImage] = useUploadImageMutation();
  const [uploading, setUploading] = useState(false);
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

        if (response.data?.uploadImage.path) {
          const uploadedImage = {
            path: response.data!.uploadImage.path!,
            caption: "",
            link: "",
          };
          setUploadedImages((prevState) => [...prevState, uploadedImage]);
          setSelectedImage(uploadedImage.path);

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

  const onImageSelected = useCallback((path: string) => {
    return () => setSelectedImage(path);
  }, []);

  const onImageDeleted = useCallback(
    (path: string) => {
      return () =>
        setUploadedImages((prevState) =>
          prevState.filter((img) => img.path !== path)
        );
    },
    [selectedImage]
  );

  const onCaptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUploadedImages((prevState) =>
        prevState.map((img) => {
          if (img.path === selectedImage) {
            img.caption = event.target.value;
          }
          return img;
        })
      );
    },
    [selectedImage]
  );

  const onLinkChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUploadedImages((prevState) =>
        prevState.map((img) => {
          if (img.path === selectedImage) {
            img.link = event.target.value;
          }
          return img;
        })
      );
    },
    [selectedImage]
  );
  console.log(uploadedImages);

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
                <Grid item key={uploadedImage.path}>
                  <Box
                    className={
                      selectedImage === uploadedImage.path
                        ? classes.selectedImageOutterBox
                        : classes.imageOutterBox
                    }
                  >
                    <Box
                      style={{
                        backgroundImage: `url(${
                          SERVER_URL + uploadedImage.path
                        })`,
                      }}
                      className={
                        selectedImage === uploadedImage.path
                          ? classes.selectedImageInnerBox
                          : classes.imageInnerBox
                      }
                      onClick={onImageSelected(uploadedImage.path)}
                    >
                      <IconButton
                        size="small"
                        className={classes.deleteButton}
                        onClick={onImageDeleted(uploadedImage.path)}
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
        {selectedImage &&
        uploadedImages.find((img) => img.path === selectedImage) ? (
          <Box display="flex" className={classes.previewSection}>
            <Box className={classes.previewImageBox}>
              <img
                src={
                  SERVER_URL +
                  uploadedImages.find((img) => img.path === selectedImage)?.path
                }
                className={classes.previewImage}
              />
            </Box>
            <Box className={classes.addImageInfoBox}>
              <TextField
                size="small"
                variant="outlined"
                label="Caption"
                placeholder="Add a caption..."
                fullWidth
                className={classes.inputField}
                value={
                  uploadedImages.find((img) => img.path === selectedImage)
                    ?.caption
                }
                onChange={onCaptionChange}
              />
              <TextField
                size="small"
                variant="outlined"
                label="Link"
                placeholder="Add a link..."
                fullWidth
                className={classes.inputField}
                value={
                  uploadedImages.find((img) => img.path === selectedImage)?.link
                }
                onChange={onLinkChange}
              />
            </Box>
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
