import {
  Box,
  ButtonBase,
  ClickAwayListener,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Popper,
  Theme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import React, { useState } from "react";
import { RegularUserFragment } from "../../../generated/graphql";
import { createUserProfileLink } from "../../../utils/links";
import UserDropDownListItem from "./UserDropDownListItem";
import { useRouter } from "next/router";
import { useLogout } from "../../../graphql/hooks/useLogout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: "0.875rem",
      width: "100%",
    },
    button: {
      width: "100%",
      height: 36,
      display: "flex",
      justifyContent: "space-between",
      color: "#586069",
      border: "1px solid #fff",
      borderRadius: "4px",
      padding: "0 1em",
      fontWeight: 600,
      cursor: "pointer",
      "&:hover,&:focus": {
        border: "1px solid rgb(237, 239, 241)",
      },
      "& svg": {
        width: 20,
        height: 20,
      },
    },
    popper: {
      border: "1px solid #edeff1",
      boxShadow: "none",
      borderRadius: "0 0 4px 4px",
      width: 211,
      zIndex: 10000,
      backgroundColor: "#ffffff",
    },
    smallAvatar: {
      width: "28px",
      height: "28px",
      margin: theme.spacing(1),
    },
    menuTitle: {
      color: "#878a8c",
      fontWeight: 700,
    },
  })
);

interface UserDropDownProps {
  me: RegularUserFragment;
}

const UserDropDown = ({ me }: UserDropDownProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { logout } = useLogout();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ButtonBase
          disableRipple
          className={classes.button}
          onClick={handleClick}
        >
          <Box display="flex" alignItems="center">
            <img className={classes.smallAvatar} src={me.avatar} />
            <Box display="flex" alignItems="center">
              {me.username}
            </Box>
          </Box>
          <ExpandMoreRoundedIcon />
        </ButtonBase>
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <ClickAwayListener onClickAway={() => open && setAnchorEl(null)}>
          <List>
            <ListItem>
              <ListItemText
                primary="MY STUFF"
                primaryTypographyProps={{ variant: "caption" }}
                // className={classes.menuTitle}
                classes={{ primary: classes.menuTitle }}
              />
            </ListItem>
            <UserDropDownListItem
              icon={<AccountCircleIcon />}
              text="Profile"
              onClick={() => {
                router.push(createUserProfileLink(me.username, "posts"));
                setAnchorEl(null);
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
      </Popper>
    </React.Fragment>
  );
};
export default UserDropDown;
