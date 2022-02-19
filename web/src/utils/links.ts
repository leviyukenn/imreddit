export const createCommunityHomeLink = (communityName: string) =>
  `/r/${communityName}`;

export const createPostDetailPageLink = (
  communityName: string,
  postId: string
) => `/r/${communityName}/${postId}`;

export const createPostDetailModalLink = (
  currentPath: string,
  postId: string
) => `${currentPath}?modalPostId=${postId}`;

export const createPostDetailModalLinkWithCommentId = (
  currentPath: string,
  postId: string,
  commentId: string
) => `${currentPath}?modalPostId=${postId}&commentId=${commentId}`;

export const createPostDetailPageLinkWithCommentId = (
  communityName: string,
  postId: string,
  commentId: string
) => `/r/${communityName}/${postId}?commentId=${commentId}`;

export const createUserProfileLink = (userName: string, sectionName: string) =>
  `/user/${userName}/${sectionName}`;

export const createPostLink = "/create-post";
export const loginPageLink = "/login";
export const registerPageLink = "/register";
export const forgotPasswordPageLink = "/forgot-password";
export const createCommunityPageLink = "/create-community";
