import {
  Box,
  ButtonBase,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popper,
  Theme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import React, { useState } from "react";
import { useLogout } from "../../graphql/hooks/useLogout";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

interface UserDropDownProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: "0.875rem",
    },
    button: {
      width: "100%",
      maxWidth: 210,
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
    icon: {},
    menuTitle: {
      color: "#878a8c",
    },
    listItemText: {
      fontWeight: 700,
      color: "rgb(28,28,28)",
    },
    listItemIcon: {
      color: "rgb(28,28,28)",
    },
  })
);

const UserDropDown = ({}: UserDropDownProps) => {
  const { me } = useIsAuth();
  const { logout, loading } = useLogout();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ButtonBase
          disableRipple
          className={classes.button}
          onClick={handleClick}
        >
          <Box display="flex" alignItems="center">
            {me?.username}
          </Box>
          <ExpandMoreRoundedIcon className={classes.icon} />
        </ButtonBase>
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="MY STUFF"
              primaryTypographyProps={{ variant: "caption" }}
              className={classes.menuTitle}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.listItemIcon}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{
                variant: "body2",
                className: classes.listItemText,
              }}
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={logout}>
            <ListItemIcon className={classes.listItemIcon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                variant: "body2",
                className: classes.listItemText,
              }}
            />
          </ListItem>
        </List>
      </Popper>
    </React.Fragment>
  );
};
export default UserDropDown;
