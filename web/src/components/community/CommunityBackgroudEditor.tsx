import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

interface CommunityBackgroudEditoProps {}

const CommunityBackgroudEditor = ({}: CommunityBackgroudEditoProps) => {
  return (
    <List>
      <ListItem>
        <ListItemText
          primary={"Body Background"}
          primaryTypographyProps={{ variant: "h6" }}
        />
      </ListItem>
    </List>
  );
};
export default CommunityBackgroudEditor;
