import { FieldPolicy, Reference } from "@apollo/client";
import { OrderType } from "../graphql/types/types";
import { PostsIncoming, PostsReadResult } from "./postsFieldPolicy";

type UserPostsExisting = {
  posts: { [key: string]: Reference };
  hasMore: boolean;
};

export const userPostsFieldPolicy: FieldPolicy<
  UserPostsExisting,
  PostsIncoming,
  PostsReadResult
> = {
  keyArgs: ["userName", "orderType"],
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
    let sortFn: (a: Reference, b: Reference) => number;

    if (args?.orderType === OrderType.NEW) {
      sortFn = (a, b) => {
        return (
          parseInt(readField("createdAt", b) as string) -
          parseInt(readField("createdAt", a) as string)
        );
      };
    } else {
      sortFn = (a, b) => {
        return (
          (readField("points", b) as number) -
          (readField("points", a) as number)
        );
      };
    }

    //sort cached posts
    const sortedPosts = posts.sort(sortFn);

    return {
      posts: sortedPosts,
      hasMore: existing.hasMore,
    };
  },
};
