import {
  Box,
  createStyles,
  Fade,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Popper,
  Theme,
} from "@material-ui/core";
import React from "react";
import { TwitterPicker } from "react-color";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPickerTitle: {
      color: "#878a8c",
    },
  })
);

interface CommunityColorPickerProps {}

const CommunityColorPicker = ({}: CommunityColorPickerProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  return (
    <>
      <ListItem>
        <ListItemText
          primary={"Color"}
          primaryTypographyProps={{ variant: "caption" }}
          className={classes.colorPickerTitle}
        />
        <Box></Box>
      </ListItem>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <TwitterPicker />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
export default CommunityColorPicker;
