import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { useCallback } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notPressed: {
      color: "#878A8C!important",
      fontSize: "26px",
    },
    pressed: {
      color: "#1A1A1B!important",
      fontSize: "26px",
    },
  })
);

export const ListButtons = (props: {
  onChange: (blockType: string) => void;
  currentState: { [key: string]: string };
}) => {
  const { onChange, currentState } = props;
  const toggleBlockType = useCallback(
    (blockType: string) => () => onChange(blockType),
    [onChange]
  );
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Numbered List">
        <IconButton size="small" onClick={toggleBlockType("ordered")}>
          <FormatListNumberedIcon
            className={
              currentState["listType"] === "ordered"
                ? classes.pressed
                : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Bulleted List">
        <IconButton size="small" onClick={toggleBlockType("unordered")}>
          <FormatListBulletedIcon
            className={
              currentState["listType"] === "unordered"
                ? classes.pressed
                : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
    </>
  );
};
