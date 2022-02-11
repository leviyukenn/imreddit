import { FieldPolicy, Reference } from "@apollo/client";
import { PostsIncoming, PostsReadResult } from "./postsFieldPolicy";

type CommunityPostsExisting = {
  posts: { [key: string]: Reference };
  hasMore: boolean;
};

export const communityPostsFieldPolicy: FieldPolicy<
  CommunityPostsExisting,
  PostsIncoming,
  PostsReadResult
> = {
  keyArgs: ["communityName"],
  merge(existing, incoming, { args, readField }) {
    const mergedPosts = existing ? { ...existing.posts } : {};

    incoming.posts.forEach((item) => {
      const id = readField("id", item) as string;
      mergedPosts[id] = item;
    });
    return { posts: mergedPosts, hasMore: incoming.hasMore };
  },

  // Return all items stored so far, to avoid ambiguities
  // about the order of the items.
  read(existing, { args, readField }) {
    if (!existing) {
      return undefined;
    }
    const posts = Object.values(existing.posts);
    //sort cached posts by create time
    const postsSortedByCreatedTime = posts.sort((a, b) => {
      return (
        parseInt(readField("createdAt", b) as string) -
        parseInt(readField("createdAt", a) as string)
      );
    });

    return {
      posts: postsSortedByCreatedTime,
      hasMore: existing.hasMore,
    };
  },
};
