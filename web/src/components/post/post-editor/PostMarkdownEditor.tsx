import {
  Box,
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
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      border: "1px solid #EDEFF1",

      borderRadius: "4px",
    },
    editor: {
      paddingLeft: "10px",
      minHeight: "200px",
    },
    toolbar: {
      height: "50px",
      backgroundColor: "#F6F7F8",
      position: "sticky",
      top: "64px",
      zIndex: 1000,
      marginBottom: 0,
      paddingLeft: "16px",
    },
  })
);
const PostMarkdownEditor = ({
  markdownString,
  setMarkdownString,
}: PostMarkdownEditorProps) => {
  //   const [markdownString, setMarkdownString] = useState("");
  const onMarkdownStringChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setMarkdownString(event.target.value);
    },
    [setMarkdownString]
  );

  //   const markdownStringRef = useRef<string>("");
  //   useEffect(() => {
  //     markdownStringRef.current = markdownString;
  //   }, [markdownString]);

  //   useEffect(() => {
  //     const markdownContent = draftToMarkdown(
  //       convertToRaw(editorState.getCurrentContent())
  //     );
  //     setMarkdownString(markdownContent);
  //     return () => {
  //       const rawData = markdownToDraft(markdownStringRef.current);
  //       const contentState = convertFromRaw(rawData);
  //       const newEditorState = EditorState.createWithContent(contentState);
  //       setEditorState(newEditorState);
  //     };
  //   }, []);

  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.toolbar} display="flex" alignItems="center">
        <Typography variant="h6">Markdown</Typography>
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
