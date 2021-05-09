import MUIRichTextEditor from "mui-rte";
import React from "react";

interface PostEditorProps {}

const PostEditor = ({}: PostEditorProps) => {
  const save = (data: string) => console.log(data);
  return (
    <div>
      <MUIRichTextEditor
        label="Type something here..."
        controls={[
          "title",
          "bold",
          "italic",
          "strikethrough",
          "link",
          "media",
          "numberList",
          "bulletList",
          "quote",
          "code",
        ]}
        onSave={save}
        inlineToolbar={true}
      />
    </div>
  );
};
export default PostEditor;
