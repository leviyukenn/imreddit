import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TitleIcon from "@material-ui/icons/Title";
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

export const BlockTypeButtons = (props: {
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
      <Tooltip title="Heading">
        <IconButton onClick={toggleBlockType("H1")}>
          <TitleIcon
            className={
              currentState["blockType"] === "H1"
                ? classes.pressed
                : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Quote Block">
        <IconButton onClick={toggleBlockType("Blockquote")}>
          <FormatQuoteIcon
            className={
              currentState["blockType"] === "Blockquote"
                ? classes.pressed
                : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Code Block">
        <IconButton onClick={toggleBlockType("Code")}>
          <CodeIcon
            className={
              currentState["blockType"] === "Code"
                ? classes.pressed
                : classes.notPressed
            }
          />
        </IconButton>
      </Tooltip>
    </>
  );
};
