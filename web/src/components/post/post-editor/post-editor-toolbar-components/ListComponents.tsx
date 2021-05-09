import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { useCallback } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notPressed: {
      color: "#878A8C!important",
    },
    pressed: {
      color: "#1A1A1B!important",
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
      <IconButton onClick={toggleBlockType("ordered")}>
        <FormatListNumberedIcon
          className={
            currentState["listType"] === "ordered"
              ? classes.pressed
              : classes.notPressed
          }
        />
      </IconButton>
      <IconButton onClick={toggleBlockType("unordered")}>
        <FormatListBulletedIcon
          className={
            currentState["listType"] === "unordered"
              ? classes.pressed
              : classes.notPressed
          }
        />
      </IconButton>
    </>
  );
};
