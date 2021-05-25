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
import SuperscriptIcon from "../../../../images/icons/superscript.svg";

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
        <IconButton onClick={toggleInline("bold")}>
          <FormatBoldIcon
            className={
              currentState["bold"] ? classes.pressed : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italics">
        <IconButton onClick={toggleInline("italic")}>
          <FormatItalicIcon
            className={
              currentState["italic"] ? classes.pressed : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Strikethrough">
        <IconButton onClick={toggleInline("strikethrough")}>
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
        <IconButton onClick={toggleInline("superscript")}>
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
