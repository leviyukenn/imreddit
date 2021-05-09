import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toolbar } from "./ToolbarComponents";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editor: {
      border: "1px solid black",
      paddingLeft: "10px",
      minHeight: "200px",
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
          onEditorStateChange={onEditorStateChange}
          toolbar={toolbar}
        />
      ) : null}
    </div>
  );
}
