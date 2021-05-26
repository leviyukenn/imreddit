import { BlockTypeButtons } from "./post-editor-toolbar-components/BlockComponent";
import ImageComponent from "./post-editor-toolbar-components/ImageComponent";
import { InlineButtons } from "./post-editor-toolbar-components/InlineComponent";
import LinkComponent from "./post-editor-toolbar-components/LinkComponent";
import { ListButtons } from "./post-editor-toolbar-components/ListComponents";

export const createPostToolbarConfig = {
  options: ["inline", "blockType", "list", "link", "image"],
  inline: {
    component: InlineButtons,
    options: ["bold", "italic", "strikethrough", "superscript"],
  },
  blockType: {
    options: ["H1", "Blockquote", "Code"],
    component: BlockTypeButtons,
  },
  list: {
    component: ListButtons,
    options: ["unordered", "ordered"],
  },
  link: {
    component: LinkComponent,
  },
  image: {
    component: ImageComponent,
  },
};

export const createCommentToolbarConfig = {
  options: ["inline", "blockType", "list", "link"],
  inline: {
    component: InlineButtons,
    options: ["bold", "italic", "strikethrough", "superscript"],
  },
  blockType: {
    options: ["H1", "Blockquote", "Code"],
    component: BlockTypeButtons,
  },
  list: {
    component: ListButtons,
    options: ["unordered", "ordered"],
  },
  link: {
    component: LinkComponent,
  },
};
