import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import CommunityImagePreview from "./CommunityImagePreview";
import CommunityImageDropzone from "./CommunityImageDropzone";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageDropZoneTitle: {
      color: "#878a8c",
    },
  })
);

interface CommmunityImageEditorProps {
  imagePath: string;
  setImagePath: (path: string) => void;
}

const CommmunityImageEditor = ({
  imagePath,
  setImagePath,
}: CommmunityImageEditorProps) => {
  const classes = useStyles();
  return (
    <>
      <ListItem>
        <ListItemText
          primary={"Custom Image"}
          primaryTypographyProps={{ variant: "caption" }}
          className={classes.imageDropZoneTitle}
        />
      </ListItem>
      <ListItem>
        {imagePath ? (
          <CommunityImagePreview
            uploadedImagePath={imagePath}
            setUploadedImagePath={setImagePath}
          />
        ) : (
          <CommunityImageDropzone setUploadedImagePath={setImagePath} />
        )}
      </ListItem>
    </>
  );
};
export default CommmunityImageEditor;
