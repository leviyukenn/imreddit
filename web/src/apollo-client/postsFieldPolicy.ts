import { FieldPolicy, Reference } from "@apollo/client";

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
  keyArgs: ['orderType','userId'],
  merge(existing, incoming, { args, readField }) {
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
