export enum VoteStatus {
  UPVOTED = "upvoted",
  DOWNVOTED = "downvoted",
  NOTVOTED = "notvoted",
}

export enum PostType {
  TEXT_POST = "textPost",
  IMAGE_POST = "imagePost",
}


export interface UploadedImage {
  path: string;
  caption: string;
  link: string;
}
