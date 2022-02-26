import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createPostToolbarConfig } from "./ToolbarComponents";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

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
      backgroundColor: "#F6F7F8",
      position: "sticky",
      display: "flex",
      alignItems: "center",
      height: "38px",

      top: "64px",
      zIndex: 1000,
      marginBottom: 0,
      padding: 0,
    },
    switchEditorButton: {
      marginLeft: "auto",
      marginRight: "16px",
      textTransform: "none",
    },
  })
);

interface RichTextEditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  switchEditor: () => void;
}

export default function RichTextEditor({
  editorState,
  setEditorState,
  switchEditor,
}: RichTextEditorProps) {
  const onEditorStateChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
    },
    [setEditorState]
  );
  const classes = useStyles();
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
          onEditorStateChange={onEditorStateChange}
          toolbar={createPostToolbarConfig}
          placeholder="Text(optional)"
          toolbarCustomButtons={[<SwitchEditorButton />]}
        />
      ) : null}
    </div>
  );
}
