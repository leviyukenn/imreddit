import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
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
      top: "64px",
      zIndex: 1000,
      marginBottom: 0,
    },
  })
);

export default function RichTextEditor({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}) {
  const onEditorStateChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
    },
    [setEditorState]
  );
  const classes = useStyles();

  return (
    <div>
      {typeof window !== "undefined" ? (
        <Editor
          editorState={editorState}
          editorClassName={classes.editor}
          wrapperClassName={classes.wrapper}
          toolbarClassName={classes.toolbar}
          onEditorStateChange={onEditorStateChange}
          toolbar={createCommentToolbarConfig}
          placeholder="Text(optional)"
        />
      ) : null}
    </div>
  );
}
