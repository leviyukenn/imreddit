import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GRAPHQL_SERVER_URL } from "../const/const";
import { communityPostsFieldPolicy } from "./communityPostsFieldPolicy";
import { postsFieldPolicy } from "./postsFieldPolicy";
import { userPostsFieldPolicy } from "./userPostsFieldPolicy";
import { userUpvotedPostsFieldPolicy } from "./userUpvotedPostsFieldPolicy";
const cache = new InMemoryCache({
  typePolicies: {
    Role: {
      keyFields: ["userId", "communityId"],
    },
    Query: {
      fields: {
        communityPosts: communityPostsFieldPolicy,
        paginatedPosts: postsFieldPolicy,
        userPosts: userPostsFieldPolicy,
        userCommentedPosts: userPostsFieldPolicy,
        userUpvotedPosts: userUpvotedPostsFieldPolicy,
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
