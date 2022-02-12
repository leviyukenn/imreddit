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
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import { createUserProfileLink } from "../../../utils/links";
import UserDropDownListItem from "./UserDropDownListItem";

interface UserDropDownListProps {
  onClickAway: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuTitle: {
      color: "#878a8c",
    },
  })
);

const UserDropDownList = ({ onClickAway }: UserDropDownListProps) => {
  const router = useRouter();
  const classes = useStyles();
  const { logout, loading } = useLogout();
  const { me } = useIsAuth();
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
            me?.username &&
              router.push(createUserProfileLink(me?.username, "posts"));
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
