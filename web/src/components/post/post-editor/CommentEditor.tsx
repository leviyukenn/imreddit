import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import React, { useCallback, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import { useCreateComment } from "../../../graphql/hooks/useCreateComment";
import CommentMarkdownEditor from "./CommentMarkdownEditor";
import CommentRichEditor from "./CommentRichEditor";

interface CommentEditorProps {
  replyTo: RegularPostDetailFragment;
  setShowCommentEditor?: React.Dispatch<React.SetStateAction<boolean>>;
}

enum EditorType {
  richText = "rich-text",
  markdown = "markdown",
}

const CommentEditor = ({
  replyTo,
  setShowCommentEditor,
}: CommentEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [markdownString, setMarkdownString] = useState("");
  const [editorType, setEditorType] = useState<EditorType>(EditorType.richText);
  const { createComment, loading } = useCreateComment(replyTo);

  const onCreatePost = useCallback(async () => {
    let postDetail;

    if (editorType === EditorType.richText) {
      postDetail = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    } else {
      postDetail = draftToHtml(markdownToDraft(markdownString));
    }

    const success = await createComment(postDetail);
    if (success && setShowCommentEditor) setShowCommentEditor(false);
  }, [editorState, replyTo, editorType, markdownString, setShowCommentEditor]);

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

  return (
    <div>
      {editorType === EditorType.richText ? (
        <CommentRichEditor
          {...{
            editorState,
            setEditorState,
            switchEditor: switchToMarkdownEditor,
            onCreatePost,
            isSubmitting: loading,
          }}
        />
      ) : editorType === EditorType.markdown ? (
        <CommentMarkdownEditor
          {...{
            markdownString,
            setMarkdownString,
            switchEditor: switchToRichTextEditor,
            onCreatePost,
            isSubmitting: loading,
          }}
        />
      ) : null}
    </div>
  );
};
export default CommentEditor;
