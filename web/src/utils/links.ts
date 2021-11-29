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

export const loginPageLink = "/login";
export const registerPageLink = "/register";
export const forgotPasswordPageLink = "/forgot-password";
export const createCommunityPageLink = "/create-community";
