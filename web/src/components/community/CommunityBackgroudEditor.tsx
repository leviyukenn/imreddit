import {
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { useCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import CommunityColorPicker from "./CommunityColorPicker";
import CommunityImageDropzone from "./CommunityImageDropzone";
import CommunityImagePreview from "./CommunityImagePreview";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageDropZoneTitle: {
      color: "#878a8c",
    },
  })
);
interface CommunityBackgroudEditoProps {}

const CommunityBackgroudEditor = ({}: CommunityBackgroudEditoProps) => {
  const classes = useStyles();
  const { background, setCommunityBackgroundImage } = useCommunityAppearance();

  return (
    <List>
      <ListItem>
        <ListItemText
          primary={"Body Background"}
          primaryTypographyProps={{ variant: "h6" }}
        />
      </ListItem>
      <Divider />
      <CommunityColorPicker />
      <ListItem>
        <ListItemText
          primary={"Custom Image"}
          primaryTypographyProps={{ variant: "caption" }}
          className={classes.imageDropZoneTitle}
        />
      </ListItem>

      <ListItem>
        {background ? (
          <CommunityImagePreview
            uploadedImagePath={background}
            setUploadedImagePath={setCommunityBackgroundImage}
          />
        ) : (
          <CommunityImageDropzone
            setUploadedImagePath={setCommunityBackgroundImage}
          />
        )}
      </ListItem>
    </List>
  );
};
export default CommunityBackgroudEditor;
