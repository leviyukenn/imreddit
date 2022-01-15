import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import CommmunityImageEditor from "./CommmunityImageEditor";
import CommunityColorPicker from "./CommunityColorPicker";

interface CommunityAppearanceEditorProps {}

const CommunityAppearanceEditor = ({}: CommunityAppearanceEditorProps) => {
  const {
    background,
    backgroundColor,
    banner,
    bannerColor,
    icon,
    setCommunityBackgroundImage,
    setCommunityBackgroundColor,
    setCommunityBannerImage,
    setCommunityBannerColor,
    setCommunityIconImage,
  } = useCommunityAppearance();

  return (
    <List>
      <ListItem>
        <ListItemText
          primary={"Icon"}
          primaryTypographyProps={{ variant: "subtitle1" }}
        />
      </ListItem>
      <CommmunityImageEditor
        imagePath={icon}
        setImagePath={setCommunityIconImage}
      />
      <ListItem>
        <ListItemText
          primary={"Banner"}
          primaryTypographyProps={{ variant: "subtitle1" }}
        />
      </ListItem>
      <CommunityColorPicker
        color={bannerColor}
        setColor={setCommunityBannerColor}
      />
      <CommmunityImageEditor
        imagePath={banner}
        setImagePath={setCommunityBannerImage}
      />
      <Divider />
      <ListItem>
        <ListItemText
          primary={"Body Background"}
          primaryTypographyProps={{ variant: "subtitle1" }}
        />
      </ListItem>
      <CommunityColorPicker
        color={backgroundColor}
        setColor={setCommunityBackgroundColor}
      />
      <CommmunityImageEditor
        imagePath={background}
        setImagePath={setCommunityBackgroundImage}
      />
    </List>
  );
};
export default CommunityAppearanceEditor;
