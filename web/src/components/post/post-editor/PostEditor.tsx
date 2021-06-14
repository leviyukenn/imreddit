import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import React, { useCallback, useEffect, useState } from "react";
import PostMarkdownEditor from "./PostMarkdownEditor";
import PostRichEditor from "./PostRichEditor";

interface PostEditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  setGetPostDetailCallback: React.Dispatch<React.SetStateAction<() => string>>;
}

enum EditorType {
  richText = "rich-text",
  markdown = "markdown",
}

const PostEditor = ({
  setGetPostDetailCallback,
  editorState,
  setEditorState,
}: PostEditorProps) => {
  const [markdownString, setMarkdownString] = useState("");
  const [editorType, setEditorType] = useState<EditorType>(EditorType.richText);

  const switchToMarkdownEditor = useCallback(() => {
    const markdownContent = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    );
    setMarkdownString(markdownContent);
    setEditorType(EditorType.markdown);
  }, [editorType, editorState]);

  const switchToRichTextEditor = useCallback(() => {
    const rawData = markdownToDraft(markdownString);
    const contentState = convertFromRaw(rawData);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    setEditorType(EditorType.richText);
  }, [editorType, markdownString]);

  useEffect(() => {
    function callback() {
      if (editorType === EditorType.richText) {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
      }
      if (editorType === EditorType.markdown) {
        return draftToHtml(markdownToDraft(markdownString));
      }
      return "";
    }
    setGetPostDetailCallback(() => callback);
  }, [editorType, editorState, markdownString]);

  return (
    <div>
      {editorType === EditorType.richText ? (
        <PostRichEditor
          {...{
            editorState,
            setEditorState,
            switchEditor: switchToMarkdownEditor,
          }}
        />
      ) : editorType === EditorType.markdown ? (
        <PostMarkdownEditor
          {...{
            markdownString,
            setMarkdownString,
            switchEditor: switchToRichTextEditor,
          }}
        />
      ) : null}
    </div>
  );
};
export default PostEditor;
