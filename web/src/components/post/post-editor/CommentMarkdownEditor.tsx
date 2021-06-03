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
  onCreatePost: () => void;
  isSubmitting: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      border: "1px solid #EDEFF1",

      display: "flex",
      flexDirection: "column-reverse",
      borderRadius: "4px",
    },
    editor: {
      paddingLeft: "10px",
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
    commentButton: {
      borderRadius: "9999px",
      marginRight: "20px",
      height: "24px",
      textTransform: 'none'
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
  onCreatePost,
  isSubmitting,
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
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onCreatePost}
          className={classes.commentButton}
          disabled={isSubmitting || !markdownString}
        >
          Comment
        </Button>
      </Box>
      <TextField
        multiline
        fullWidth
        rows={10}
        value={markdownString}
        onChange={onMarkdownStringChange}
        className={classes.editor}
        placeholder={"What are your thoughts?"}
      />
    </Box>
  );
};
export default PostMarkdownEditor;
