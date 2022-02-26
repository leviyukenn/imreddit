import {
  createStyles,
  IconButton,
  makeStyles,
  SvgIcon,
  Theme,
  Tooltip,
} from "@material-ui/core";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import { useCallback } from "react";
// import SuperscriptIcon from "../../../../images/icons/superscript.svg";
import SuperscriptIcon from "../../../../../images/icons/superscript.svg";

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

export const InlineButtons = (props: {
  onChange: (style: string) => void;
  currentState: { [key: string]: boolean };
}) => {
  const { onChange, currentState } = props;
  const toggleInline = useCallback((field: string) => () => onChange(field), [
    onChange,
    currentState,
  ]);

  const classes = useStyles();
  return (
    <>
      <Tooltip title="Bold">
        <IconButton size="small" onClick={toggleInline("bold")}>
          <FormatBoldIcon
            className={
              currentState["bold"] ? classes.pressed : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italics">
        <IconButton size="small" onClick={toggleInline("italic")}>
          <FormatItalicIcon
            className={
              currentState["italic"] ? classes.pressed : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Strikethrough">
        <IconButton size="small" onClick={toggleInline("strikethrough")}>
          <StrikethroughSIcon
            className={
              currentState["strikethrough"]
                ? classes.pressed
                : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Superscript">
        <IconButton size="small" onClick={toggleInline("superscript")}>
          <SvgIcon
            className={
              currentState["superscript"] ? classes.pressed : classes.notPressed
            }
          >
            <SuperscriptIcon />{" "}
          </SvgIcon>
        </IconButton>
      </Tooltip>
    </>
  );
};
