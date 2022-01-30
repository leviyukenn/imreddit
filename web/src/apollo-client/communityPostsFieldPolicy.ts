import { FieldPolicy, Reference } from "@apollo/client";
import { PostsIncoming, PostsReadResult } from "./postsFieldPolicy";

type CommunityPostsExisting = {
  [key: string]: {
    posts: { [key: string]: Reference };
    hasMore: boolean;
  };
};

export const communityPostsFieldPolicy: FieldPolicy<
  CommunityPostsExisting,
  PostsIncoming,
  PostsReadResult
> = {
  keyArgs: false,
  merge(existing = {}, incoming, { args, readField }) {
    const mergedPosts = existing[args!.communityName]
      ? { ...existing[args!.communityName].posts }
      : {};

    incoming.posts.forEach((item) => {
      const id = readField("id", item) as string;
      mergedPosts[id] = item;
    });
    return {
      ...existing,
      [args!.communityName]: { posts: mergedPosts, hasMore: incoming.hasMore },
    };
  },

  // Return all items stored so far, to avoid ambiguities
  // about the order of the items.
  read(existing, { args, readField }) {
    if (!existing || !existing[args!.communityName]) {
      return undefined;
    }
    const posts = Object.values(existing[args!.communityName].posts);
    //sort cached posts by create time
    const postsSortedByCreatedTime = posts.sort((a, b) => {
      return (
        parseInt(readField("createdAt", b) as string) -
        parseInt(readField("createdAt", a) as string)
      );
    });

    return {
      posts: postsSortedByCreatedTime,
      hasMore: existing[args!.communityName].hasMore,
    };
  },
};
