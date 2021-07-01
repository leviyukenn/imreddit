import {
  ApolloClient,
  ApolloLink,
  FieldPolicy,
  InMemoryCache,
  Reference,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GRAPHQL_SERVER_URL } from "../const/const";

type PostsExisting = { posts: { [key: string]: Reference }; hasMore: boolean };

type PostsIncoming = { posts: Reference[]; hasMore: boolean };
type PostsReadResult = PostsIncoming;
const postsFieldPolicy: FieldPolicy<
  PostsExisting,
  PostsIncoming,
  PostsReadResult
> = {
  keyArgs: false,
  merge(existing, incoming, { args, readField }) {
    // console.log("existing", existing);
    // console.log("incoming", incoming);
    // console.log(args);
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
    let posts = Object.values(existing.posts);

    if (args?.communityName) {
      posts = posts.filter((post) => {
        const postCommunityName = (readField("community", post) as {
          name: string;
        }).name;
        return postCommunityName === args.communityName;
      });
    }
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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: postsFieldPolicy,
      },
    },
  },
});

const uploadLink = createUploadLink({
  uri: GRAPHQL_SERVER_URL,
  credentials: "include",
});

const client = new ApolloClient({
  link: (uploadLink as unknown) as ApolloLink,
  cache: cache,
});

export default client;
