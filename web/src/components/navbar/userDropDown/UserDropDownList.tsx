import {
  ClickAwayListener,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useRouter } from "next/router";
import React from "react";
import { useLogout } from "../../../graphql/hooks/useLogout";
import { createUserProfileLink } from "../../../utils/links";
import UserDropDownListItem from "./UserDropDownListItem";

interface UserDropDownListProps {
  onClickAway: () => void;
  userName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuTitle: {
      color: "#878a8c",
    },
  })
);

const UserDropDownList = ({ onClickAway, userName }: UserDropDownListProps) => {
  const router = useRouter();
  const classes = useStyles();
  const { logout } = useLogout();
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <List>
        <ListItem>
          <ListItemText
            primary="MY STUFF"
            primaryTypographyProps={{ variant: "caption" }}
            className={classes.menuTitle}
          />
        </ListItem>
        <UserDropDownListItem
          icon={<AccountCircleIcon />}
          text="Profile"
          onClick={() => {
            router.push(createUserProfileLink(userName, "posts"));
            onClickAway();
          }}
        />
        <Divider />
        <UserDropDownListItem
          icon={<ExitToAppIcon />}
          text="Logout"
          onClick={logout}
        />
      </List>
    </ClickAwayListener>
  );
};
export default UserDropDownList;
