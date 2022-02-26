import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createCommentToolbarConfig } from "./ToolbarComponents";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

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
    },
    toolbar: {
      backgroundColor: "#F6F7F8",
      position: "sticky",
      display: "flex",
      height: "38px",
      alignItems: "center",
      padding: 0,
      top: "64px",
      zIndex: 1000,
      marginBottom: 0,
    },
    commentButton: {
      borderRadius: "9999px",
      marginRight: "20px",
      height: "24px",
      textTransform: "none",
    },
    switchEditorButton: {
      marginLeft: "auto",
      marginRight: "16px",
      textTransform: "none",
    },
  })
);

interface CommentRichEditorProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  onCreatePost: () => void;
  isSubmitting: boolean;
  switchEditor: () => void;
}

export default function RichTextEditor({
  editorState,
  setEditorState,
  onCreatePost,
  isSubmitting,
  switchEditor,
}: CommentRichEditorProps) {
  const classes = useStyles();
  const CommentButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onCreatePost}
        className={classes.commentButton}
        disabled={isSubmitting || !editorState.getCurrentContent().hasText()}
      >
        Comment
      </Button>
    );
  };

  const SwitchEditorButton = () => (
    <Button
      onClick={switchEditor}
      color="primary"
      className={classes.switchEditorButton}
    >
      Markdown
    </Button>
  );

  return (
    <div>
      {typeof window !== "undefined" ? (
        <Editor
          editorState={editorState}
          editorClassName={classes.editor}
          wrapperClassName={classes.wrapper}
          toolbarClassName={classes.toolbar}
          onEditorStateChange={setEditorState}
          toolbar={createCommentToolbarConfig}
          placeholder="What are your thoughts?"
          toolbarCustomButtons={[<SwitchEditorButton />, <CommentButton />]}
        />
      ) : null}
    </div>
  );
}
