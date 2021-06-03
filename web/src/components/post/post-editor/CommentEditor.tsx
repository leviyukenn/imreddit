import { Reference } from "@apollo/client";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import React, { useCallback, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  RegularPostDetailFragment,
  RegularPostDetailFragmentDoc,
  useCreatePostMutation,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import CommentMarkdownEditor from "./CommentMarkdownEditor";
import CommentRichEditor from "./CommentRichEditor";

interface CommentEditorProps {
  replyTo: RegularPostDetailFragment;
}

enum EditorType {
  richText = "rich-text",
  markdown = "markdown",
}

const CommentEditor = ({ replyTo }: CommentEditorProps) => {
  const [createPost, { error: createPostError }] = useCreatePostMutation({
    update(cache, { data: createPostResponse }) {
      cache.modify({
        id: cache.identify(replyTo),
        fields: {
          children(existingPostRefs: Reference[]) {
            const commentRef = cache.writeFragment({
              fragment: RegularPostDetailFragmentDoc,
              data: createPostResponse?.createPost,
              fragmentName: "RegularPostDetail",
            });

            return [commentRef, ...existingPostRefs];
          },
        },
      });
    },
  });
  const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);

  const { checkIsAuth } = useIsAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [markdownString, setMarkdownString] = useState("");
  const [editorType, setEditorType] = useState<EditorType>(EditorType.richText);

  const onCreatePost = useCallback(async () => {
    try {
      setIsSubmitting(true);
      if (!checkIsAuth()) return;

      let postDetail = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      if (editorType === EditorType.markdown) {
        postDetail = draftToHtml(markdownToDraft(markdownString));
      }

      const result = await createPost({
        variables: { text: postDetail, parentId: replyTo.id },
      });

      if (createPostError || result.errors) {
        setDisplayInnerError(true);
        return;
      }
    } catch (err) {
      alert(err);
    } finally {
      setEditorState(EditorState.createEmpty());
      setIsSubmitting(false);
    }
  }, [editorState, replyTo, editorType, markdownString]);

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
            isSubmitting,
          }}
        />
      ) : editorType === EditorType.markdown ? (
        <CommentMarkdownEditor
          {...{
            markdownString,
            setMarkdownString,
            switchEditor: switchToRichTextEditor,
            onCreatePost,
            isSubmitting,
          }}
        />
      ) : null}
    </div>
  );
};
export default CommentEditor;
