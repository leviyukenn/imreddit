export enum CommunitySelectionOptionGroupType {
  MY_COMMUNITIES = "MY COMMUNITIES",
  MODERATING = "MODERATING",
}

interface ICommunitySelectionOption {
  readonly id: string;
  readonly name: string;
  readonly icon: JSX.Element | string;
  readonly link: string;
  readonly group: CommunitySelectionOptionGroupType;
}

export class CommunitySelectionOption implements ICommunitySelectionOption {
  readonly id: string;
  readonly name: string;
  readonly icon: JSX.Element | string;
  readonly link: string;
  readonly group: CommunitySelectionOptionGroupType;

  private constructor(
    id: string,
    name: string,
    icon: JSX.Element | string,
    link: string,
    group: CommunitySelectionOptionGroupType
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.link = link;
    this.group = group;
  }

  static createOption({
    id,
    name,
    icon,
    link,
    group,
  }: ICommunitySelectionOption) {
    return new CommunitySelectionOption(id, name, icon, link, group);
  }
}
