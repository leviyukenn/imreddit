import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useCallback } from "react";

interface PostMarkdownEditorProps {
  markdownString: string;
  setMarkdownString: React.Dispatch<React.SetStateAction<string>>;
  switchEditor: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      border: "1px solid #EDEFF1",

      borderRadius: "4px",
    },
    editor: {
      paddingLeft: "10px",
      paddingTop: "8px",
      minHeight: "200px",
      fontSize: "0.875rem",
    },
    toolbar: {
      height: "38px",
      backgroundColor: "#F6F7F8",
      position: "sticky",
      top: "64px",
      zIndex: 1000,
      marginBottom: 0,
      paddingLeft: "16px",
    },
    switchEditorButton: {
      marginLeft: "auto",
      marginRight: "16px",
      textTransform: "none",
    },
  })
);
const PostMarkdownEditor = ({
  markdownString,
  setMarkdownString,
  switchEditor,
}: PostMarkdownEditorProps) => {
  const onMarkdownStringChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setMarkdownString(event.target.value);
    },
    [setMarkdownString]
  );

  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.toolbar} display="flex" alignItems="center">
        <Typography variant="subtitle1">Markdown</Typography>
        <Button
          onClick={switchEditor}
          color="primary"
          className={classes.switchEditorButton}
        >
          Switch to Fancy Pants Editor
        </Button>
      </Box>
      <TextField
        multiline
        fullWidth
        rows={10}
        value={markdownString}
        onChange={onMarkdownStringChange}
        className={classes.editor}
      />
    </Box>
  );
};
export default PostMarkdownEditor;
