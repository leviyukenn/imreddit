import { FieldPolicy, Reference } from "@apollo/client";
import { PostsIncoming, PostsReadResult } from "./postsFieldPolicy";

type UserPostsExisting = {
  [key: string]: {
    posts: { [key: string]: Reference };
    hasMore: boolean;
  };
};

export const userPostsFieldPolicy: FieldPolicy<
  UserPostsExisting,
  PostsIncoming,
  PostsReadResult
> = {
  keyArgs: false,
  merge(existing = {}, incoming, { args, readField }) {
    const mergedPosts = existing[args!.userName]
      ? { ...existing[args!.userName].posts }
      : {};

    incoming.posts.forEach((item) => {
      const id = readField("id", item) as string;
      mergedPosts[id] = item;
    });
    return {
      ...existing,
      [args!.userName]: { posts: mergedPosts, hasMore: incoming.hasMore },
    };
  },

  // Return all items stored so far, to avoid ambiguities
  // about the order of the items.
  read(existing, { args, readField }) {
    if (!existing || !existing[args!.userName]) {
      return undefined;
    }
    const posts = Object.values(existing[args!.userName].posts);
    //sort cached posts by create time
    const postsSortedByCreatedTime = posts.sort((a, b) => {
      return (
        parseInt(readField("createdAt", b) as string) -
        parseInt(readField("createdAt", a) as string)
      );
    });

    return {
      posts: postsSortedByCreatedTime,
      hasMore: existing[args!.userName].hasMore,
    };
  },
};
