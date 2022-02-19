import {
  Box,
  ButtonBase,
  createStyles,
  makeStyles,
  Popper,
  Theme,
} from "@material-ui/core";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import React, { useState } from "react";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import UserDropDownList from "./UserDropDownList";

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
  })
);

const UserDropDown = ({}: UserDropDownProps) => {
  const { me } = useIsAuth();
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
          <ExpandMoreRoundedIcon />
        </ButtonBase>
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <UserDropDownList
          onClickAway={() => !open || setAnchorEl(null)}
          userName={me?.username!}
        />
      </Popper>
    </React.Fragment>
  );
};
export default UserDropDown;
