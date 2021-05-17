import { BlockTypeButtons } from "./post-editor-toolbar-components/BlockComponent";
import ImageComponent from "./post-editor-toolbar-components/ImageComponent";
import { InlineButtons } from "./post-editor-toolbar-components/InlineComponent";
import LinkComponent from "./post-editor-toolbar-components/LinkComponent";
import { ListButtons } from "./post-editor-toolbar-components/ListComponents";

export const toolbar = {
  options: ["inline", "blockType", "list", "link", "image"],
  inline: {
    inDropdown: false,
    className: undefined,
    component: InlineButtons,
    dropdownClassName: undefined,
    options: ["bold", "italic", "strikethrough", "superscript"],
  },
  blockType: {
    inDropdown: false,
    options: ["H1", "Blockquote", "Code"],
    className: undefined,
    component: BlockTypeButtons,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: ListButtons,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: LinkComponent,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link"],
    linkCallback: undefined,
  },
  image: {
    className: undefined,
    component: ImageComponent,
    popupClassName: undefined,
    urlEnabled: false,
    uploadEnabled: true,
    alignmentEnabled: false,
    uploadCallback: () => console.log("hello"),
    previewImage: true,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
};
