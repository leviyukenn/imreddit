import { FieldPolicy, Reference } from "@apollo/client";
import { OrderType } from "../graphql/types/types";

type HomePostsExisting = {
  posts: { [key: string]: Reference };
  hasMore: boolean;
};

export type PostsIncoming = { posts: Reference[]; hasMore: boolean };
export type PostsReadResult = PostsIncoming;

export const postsFieldPolicy: FieldPolicy<
  HomePostsExisting,
  PostsIncoming,
  PostsReadResult
> = {
  keyArgs: ["orderType", "userId"],
  merge(existing, incoming, { args, readField }) {
    // debugger;
    const merged = existing ? { ...existing.posts } : {};
    incoming.posts.forEach((item) => {
      const id = readField("id", item) as string;
      merged[id] = item;
    });
    return { posts: merged, hasMore: incoming.hasMore };
  },

  // Return all items stored so far, to avoid ambiguities
  // about the order of the items.
  read(existing, { args, readField }) {
    if (!existing) {
      return existing;
      // return { posts: [], hasMore: false };
    }
    const posts = Object.values(existing.posts);

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

    //sort cached posts by create time
    const sortedPosts = posts.sort(sortFn);

    return {
      posts: sortedPosts,
      hasMore: existing.hasMore,
    };
  },
};
