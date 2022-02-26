import { BlockTypeButtons } from "./toolbarComponents/BlockComponent";
import ImageComponent from "./toolbarComponents/ImageComponent";
import { InlineButtons } from "./toolbarComponents/InlineComponent";
import LinkComponent from "./toolbarComponents/LinkComponent";
import { ListButtons } from "./toolbarComponents/ListComponents";

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
