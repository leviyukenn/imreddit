import { ApolloClient, InMemoryCache, Reference } from "@apollo/client";
import { GRAPHQL_SERVER_URL } from "../const/const";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(
            existing:
              | { posts: { [key: string]: Reference }; hasMore: boolean }
              | undefined,
            incoming: { posts: Reference[]; hasMore: boolean },
            { readField }
          ) {
            console.log("existing", existing);
            console.log("incoming", incoming);
            const merged = { ...existing?.posts };
            incoming.posts.forEach((item) => {
              const id = readField("id", item) as string;
              merged[id] = item;
            });
            return { posts: merged, hasMore: incoming.hasMore };
          },

          // Return all items stored so far, to avoid ambiguities
          // about the order of the items.
          read(
            existing:
              | {
                  posts: { [key: string]: Reference };
                  hasMore: boolean;
                }
              | undefined,
            { readField }
          ) {
            if (!existing) {
              return existing;
            }

            //sort cached posts by create time
            const postsSortedByCreatedTime = Object.values(existing.posts).sort(
              (a, b) => {
                return (
                  parseInt(readField("createdAt", b) as string) -
                  parseInt(readField("createdAt", a) as string)
                );
              }
            );

            return {
              posts: postsSortedByCreatedTime,
              hasMore: existing.hasMore,
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: GRAPHQL_SERVER_URL,
  cache: cache,
  credentials: "include",
});

export default client;
