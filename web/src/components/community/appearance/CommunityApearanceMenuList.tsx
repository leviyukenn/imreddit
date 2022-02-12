import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React, { Dispatch, SetStateAction } from "react";
import { AppearanceContent } from "./CommunityAppearanceDrawer";

interface CommunityApearanceMenuListProps {
  setShowWhichContent: Dispatch<SetStateAction<AppearanceContent>>;
}

const CommunityApearanceMenuList = ({
  setShowWhichContent,
}: CommunityApearanceMenuListProps) => {
  return (
    <List>
      <ListItem>
        <ListItemText
          primary={"Appearance"}
          primaryTypographyProps={{ variant: "h5" }}
        />
      </ListItem>
      <ListItem
        button
        onClick={() => setShowWhichContent(AppearanceContent.BACKGROUND)}
      >
        <ListItemText primary={"Background"} />
        <ListItemIcon>
          <ChevronRightIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};
export default CommunityApearanceMenuList;
