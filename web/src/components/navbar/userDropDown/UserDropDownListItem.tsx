import {
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

interface UserDropDownListItemProps {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemText: {
      fontWeight: 700,
      color: "rgb(28,28,28)",
    },
    listItemIcon: {
      color: "rgb(28,28,28)",
    },
  })
);

const UserDropDownListItem = ({
  icon,
  text,
  onClick,
}: UserDropDownListItemProps) => {
  const classes = useStyles();
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          variant: "body2",
          className: classes.listItemText,
        }}
      />
    </ListItem>
  );
};
export default UserDropDownListItem;
