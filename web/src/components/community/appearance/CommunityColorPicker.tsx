import {
  ClickAwayListener,
  createStyles,
  Fade,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Popper,
  Theme,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useCallback, useRef } from "react";
import { ColorResult, TwitterPicker } from "react-color";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPickerContainer: {
      cursor: "pointer",
    },
    colorPickerPopper: {
      zIndex: 10000,
      top: "10px",
    },
    colorPickerTitle: {
      color: "#878a8c",
    },
    colorPickerButton: {
      width: "24px",
      height: "24px",
      "&:hover $downIcon": {
        display: "inline-block",
      },
    },
    downIcon: {
      display: "none",
    },
  })
);
const colorList = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#DAE0E6",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
];

interface CommunityColorPickerProps {
  color: string;
  setColor: (colorHex: string) => void;
}

const CommunityColorPicker = ({
  color,
  setColor,
}: CommunityColorPickerProps) => {
  const classes = useStyles();
  const divElementRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = useCallback(() => {
    setAnchorEl((prev) => (prev ? null : divElementRef.current));
  }, [divElementRef]);

  return (
    <>
      <ListItem onClick={handleClick} className={classes.colorPickerContainer}>
        <ListItemText
          primary={"Color"}
          primaryTypographyProps={{ variant: "caption" }}
          className={classes.colorPickerTitle}
        />
        <div
          className={classes.colorPickerButton}
          ref={divElementRef}
          style={{ backgroundColor: color }}
        >
          {open ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon className={classes.downIcon} />
          )}
        </div>
      </ListItem>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        className={classes.colorPickerPopper}
        placement="bottom-end"
        modifiers={{ offset: { enabled: true, offset: "0, 12" } }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={() => !open || setAnchorEl(null)}>
                <TwitterPicker
                  colors={colorList}
                  triangle="top-right"
                  color={color}
                  onChangeComplete={(color: ColorResult) => setColor(color.hex)}
                />
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
export default CommunityColorPicker;
