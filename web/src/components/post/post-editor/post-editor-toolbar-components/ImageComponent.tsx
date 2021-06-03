import {
  Box,
  createStyles,
  IconButton,
  LinearProgress,
  makeStyles,
  Popover,
  Theme,
  Tooltip,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import ImageIcon from "@material-ui/icons/Image";
import MuiAlert from "@material-ui/lab/Alert";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SERVER_URL } from "../../../../const/const";
import { useUploadImageMutation } from "../../../../generated/graphql";

interface ImageComponentProps {
  onChange: (
    src: string,
    height?: string,
    width?: string,
    alt?: string
  ) => void;
  onExpandEvent: () => void;
  expanded?: boolean;
  doCollapse: () => void;
}

interface ImageDropZoneProps {
  onChange: (
    src: string,
    height?: string,
    width?: string,
    alt?: string
  ) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      width: "370px",
      padding: "16px",
    },
    icon: {
      fontSize: "26px",
    },
  })
);

const ImageDropZone = ({ onChange }: ImageDropZoneProps) => {
  const [uploadImage, { error }] = useUploadImageMutation();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    severity: "info" | "success" | "warning" | "error";
    message: string;
  } | null>(null);
  const onUpload = useCallback(
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
          onChange(SERVER_URL + response.data.uploadImage.url, "auto", "100%");
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

  useEffect(() => {
    if (error) {
      setMessage({
        severity: "error",
        message: "Inner error, please try it again later.",
      });
    }
  }, [error]);

  return (
    <>
      <Box onClick={(event) => event.stopPropagation()}>
        <DropzoneArea
          acceptedFiles={[
            "image/gif",
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/svg",
          ]}
          filesLimit={1}
          showPreviewsInDropzone={false}
          useChipsForPreview={true}
          onDrop={onUpload}
          getFileAddedMessage={undefined}
        />
        {uploading ? <LinearProgress /> : null}
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
    </>
  );
};

const ImageComponent = ({
  onChange,
  onExpandEvent,
  expanded,
  doCollapse,
}: ImageComponentProps) => {
  const anchorRef = useRef();
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Add an image">
        <IconButton
          size="small"
          onClick={onExpandEvent}
          aria-haspopup="true"
          aria-expanded={!!expanded}
          buttonRef={anchorRef}
        >
          <ImageIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Popover
        classes={{ paper: classes.popover }}
        open={!!expanded}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ImageDropZone onChange={onChange} />
      </Popover>
    </>
  );
};
export default ImageComponent;
