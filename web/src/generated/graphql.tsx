import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Community = {
  __typename?: 'Community';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  topics: Array<Topic>;
  totalMemberships: Scalars['Int'];
};

export type CommunityResponse = {
  __typename?: 'CommunityResponse';
  errors?: Maybe<Array<FieldError>>;
  community?: Maybe<Community>;
};

export type CompleteResponse = {
  __typename?: 'CompleteResponse';
  errors?: Maybe<Array<FieldError>>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

export type CreateCommunityInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  topicIds: Array<Scalars['String']>;
};

export type CreatePostInput = {
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  images?: Maybe<Array<ImageInput>>;
  communityId: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  errorCode: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  path: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type ImageInput = {
  path: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: CompleteResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  googleAuthentication: UserResponse;
  createPost: Post;
  deletePost: Scalars['Boolean'];
  uploadImage: UploadResponse;
  createCommunity: CommunityResponse;
  vote: Scalars['Int'];
  createTopic: Topic;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationRegisterArgs = {
  userInput: RegisterInput;
};


export type MutationLoginArgs = {
  userInput: LoginInput;
};


export type MutationGoogleAuthenticationArgs = {
  idToken: Scalars['String'];
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationUploadImageArgs = {
  image: Scalars['Upload'];
};


export type MutationCreateCommunityArgs = {
  createCommunityInput: CreateCommunityInput;
};


export type MutationVoteArgs = {
  voteInput: VoteInput;
};


export type MutationCreateTopicArgs = {
  title: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  creator: User;
  community: Community;
  children: Array<Post>;
  images: Array<Image>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  communityPosts: PaginatedPosts;
  paginatedPosts: PaginatedPosts;
  allPosts: Array<Post>;
  postDetail?: Maybe<Post>;
  communities: Array<Community>;
  community?: Maybe<Community>;
  userRoles: Array<Maybe<Role>>;
  topics: Array<Topic>;
};


export type QueryCommunityPostsArgs = {
  communityName: Scalars['String'];
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryPaginatedPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryPostDetailArgs = {
  postId: Scalars['String'];
};


export type QueryCommunitiesArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryCommunityArgs = {
  communityName: Scalars['String'];
};


export type QueryUserRolesArgs = {
  userId: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  userId: Scalars['String'];
  communityId: Scalars['String'];
  joinedAt: Scalars['String'];
  role: Scalars['String'];
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creator: User;
  title: Scalars['String'];
};


export type UploadResponse = {
  __typename?: 'UploadResponse';
  errors?: Maybe<Array<FieldError>>;
  path?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  role: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type VoteInput = {
  postId: Scalars['String'];
  value: Scalars['Int'];
};

export type RegularCommunityFragment = (
  { __typename?: 'Community' }
  & Pick<Community, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'description' | 'totalMemberships'>
  & { topics: Array<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'title'>
  )> }
);

export type RegularErrorsFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'errorCode' | 'message'>
);

export type RegularImageFragment = (
  { __typename?: 'Image' }
  & Pick<Image, 'id' | 'path' | 'caption' | 'link'>
);

export type RegularPostDetailFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ), images: Array<(
    { __typename?: 'Image' }
    & RegularImageFragment
  )>, community: (
    { __typename?: 'Community' }
    & Pick<Community, 'name'>
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorsFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorsFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type CreateCommunityMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  topicIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateCommunityMutation = (
  { __typename?: 'Mutation' }
  & { createCommunity: (
    { __typename?: 'CommunityResponse' }
    & { community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, 'name' | 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorsFragment
    )>> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  communityId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  images?: Maybe<Array<ImageInput> | ImageInput>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
    & { community: (
      { __typename?: 'Community' }
      & Pick<Community, 'name'>
    ) }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'CompleteResponse' }
    & Pick<CompleteResponse, 'isComplete'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorsFragment
    )>> }
  ) }
);

export type GoogleAuthenticationMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;


export type GoogleAuthenticationMutation = (
  { __typename?: 'Mutation' }
  & { googleAuthentication: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorsFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorsFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorsFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadImage: (
    { __typename?: 'UploadResponse' }
    & Pick<UploadResponse, 'path'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type VoteMutationVariables = Exact<{
  postId: Scalars['String'];
  value: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { allPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
    & { community: (
      { __typename?: 'Community' }
      & Pick<Community, 'name'>
    ) }
  )> }
);

export type CommunitiesQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
}>;


export type CommunitiesQuery = (
  { __typename?: 'Query' }
  & { communities: Array<(
    { __typename?: 'Community' }
    & Pick<Community, 'id' | 'name'>
  )> }
);

export type CommunityQueryVariables = Exact<{
  communityName: Scalars['String'];
}>;


export type CommunityQuery = (
  { __typename?: 'Query' }
  & { community?: Maybe<(
    { __typename?: 'Community' }
    & RegularCommunityFragment
  )> }
);

export type CommunityPostsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  communityName: Scalars['String'];
}>;


export type CommunityPostsQuery = (
  { __typename?: 'Query' }
  & { communityPosts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & RegularPostDetailFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { paginatedPosts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & RegularPostDetailFragment
    )> }
  ) }
);

export type PostDetailQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostDetailQuery = (
  { __typename?: 'Query' }
  & { postDetail?: Maybe<(
    { __typename?: 'Post' }
    & { children: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    )> }
    & RegularPostDetailFragment
  )> }
);

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = (
  { __typename?: 'Query' }
  & { topics: Array<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'title' | 'id'>
  )> }
);

export type UserRolesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserRolesQuery = (
  { __typename?: 'Query' }
  & { userRoles: Array<Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'role' | 'communityId'>
  )>> }
);

export const RegularCommunityFragmentDoc = gql`
    fragment RegularCommunity on Community {
  id
  createdAt
  updatedAt
  name
  description
  topics {
    title
  }
  totalMemberships
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const RegularImageFragmentDoc = gql`
    fragment RegularImage on Image {
  id
  path
  caption
  link
}
    `;
export const RegularPostDetailFragmentDoc = gql`
    fragment RegularPostDetail on Post {
  id
  createdAt
  updatedAt
  title
  text
  points
  creator {
    ...RegularUser
  }
  images {
    ...RegularImage
  }
  community {
    name
  }
}
    ${RegularUserFragmentDoc}
${RegularImageFragmentDoc}`;
export const RegularErrorsFragmentDoc = gql`
    fragment RegularErrors on FieldError {
  field
  errorCode
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularErrors
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorsFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...RegularErrors
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorsFragmentDoc}
${RegularUserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCommunityDocument = gql`
    mutation CreateCommunity($name: String!, $description: String!, $topicIds: [String!]!) {
  createCommunity(
    createCommunityInput: {name: $name, description: $description, topicIds: $topicIds}
  ) {
    community {
      name
      id
    }
    errors {
      ...RegularErrors
    }
  }
}
    ${RegularErrorsFragmentDoc}`;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      topicIds: // value for 'topicIds'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($communityId: String!, $text: String, $title: String, $parentId: String, $images: [ImageInput!]) {
  createPost(
    createPostInput: {title: $title, text: $text, parentId: $parentId, images: $images, communityId: $communityId}
  ) {
    id
    community {
      name
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      text: // value for 'text'
 *      title: // value for 'title'
 *      parentId: // value for 'parentId'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($username: String!, $email: String!) {
  forgotPassword(forgotPasswordInput: {username: $username, email: $email}) {
    errors {
      ...RegularErrors
    }
    isComplete
  }
}
    ${RegularErrorsFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GoogleAuthenticationDocument = gql`
    mutation GoogleAuthentication($idToken: String!) {
  googleAuthentication(idToken: $idToken) {
    errors {
      ...RegularErrors
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorsFragmentDoc}
${RegularUserFragmentDoc}`;
export type GoogleAuthenticationMutationFn = Apollo.MutationFunction<GoogleAuthenticationMutation, GoogleAuthenticationMutationVariables>;

/**
 * __useGoogleAuthenticationMutation__
 *
 * To run a mutation, you first call `useGoogleAuthenticationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleAuthenticationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleAuthenticationMutation, { data, loading, error }] = useGoogleAuthenticationMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *   },
 * });
 */
export function useGoogleAuthenticationMutation(baseOptions?: Apollo.MutationHookOptions<GoogleAuthenticationMutation, GoogleAuthenticationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleAuthenticationMutation, GoogleAuthenticationMutationVariables>(GoogleAuthenticationDocument, options);
      }
export type GoogleAuthenticationMutationHookResult = ReturnType<typeof useGoogleAuthenticationMutation>;
export type GoogleAuthenticationMutationResult = Apollo.MutationResult<GoogleAuthenticationMutation>;
export type GoogleAuthenticationMutationOptions = Apollo.BaseMutationOptions<GoogleAuthenticationMutation, GoogleAuthenticationMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(userInput: {username: $username, password: $password}) {
    errors {
      ...RegularErrors
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorsFragmentDoc}
${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(userInput: {email: $email, username: $username, password: $password}) {
    errors {
      ...RegularErrors
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorsFragmentDoc}
${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($file: Upload!) {
  uploadImage(image: $file) {
    errors {
      field
      message
    }
    path
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($postId: String!, $value: Int!) {
  vote(voteInput: {postId: $postId, value: $value})
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const AllPostsDocument = gql`
    query AllPosts {
  allPosts {
    id
    community {
      name
    }
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
export const CommunitiesDocument = gql`
    query Communities($userId: String) {
  communities(userId: $userId) {
    id
    name
  }
}
    `;

/**
 * __useCommunitiesQuery__
 *
 * To run a query within a React component, call `useCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunitiesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
      }
export function useCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
        }
export type CommunitiesQueryHookResult = ReturnType<typeof useCommunitiesQuery>;
export type CommunitiesLazyQueryHookResult = ReturnType<typeof useCommunitiesLazyQuery>;
export type CommunitiesQueryResult = Apollo.QueryResult<CommunitiesQuery, CommunitiesQueryVariables>;
export const CommunityDocument = gql`
    query Community($communityName: String!) {
  community(communityName: $communityName) {
    ...RegularCommunity
  }
}
    ${RegularCommunityFragmentDoc}`;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      communityName: // value for 'communityName'
 *   },
 * });
 */
export function useCommunityQuery(baseOptions: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
      }
export function useCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = Apollo.QueryResult<CommunityQuery, CommunityQueryVariables>;
export const CommunityPostsDocument = gql`
    query CommunityPosts($limit: Int, $cursor: String, $communityName: String!) {
  communityPosts(limit: $limit, cursor: $cursor, communityName: $communityName) {
    hasMore
    posts {
      ...RegularPostDetail
    }
  }
}
    ${RegularPostDetailFragmentDoc}`;

/**
 * __useCommunityPostsQuery__
 *
 * To run a query within a React component, call `useCommunityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      communityName: // value for 'communityName'
 *   },
 * });
 */
export function useCommunityPostsQuery(baseOptions: Apollo.QueryHookOptions<CommunityPostsQuery, CommunityPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityPostsQuery, CommunityPostsQueryVariables>(CommunityPostsDocument, options);
      }
export function useCommunityPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityPostsQuery, CommunityPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityPostsQuery, CommunityPostsQueryVariables>(CommunityPostsDocument, options);
        }
export type CommunityPostsQueryHookResult = ReturnType<typeof useCommunityPostsQuery>;
export type CommunityPostsLazyQueryHookResult = ReturnType<typeof useCommunityPostsLazyQuery>;
export type CommunityPostsQueryResult = Apollo.QueryResult<CommunityPostsQuery, CommunityPostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int, $cursor: String) {
  paginatedPosts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...RegularPostDetail
    }
  }
}
    ${RegularPostDetailFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostDetailDocument = gql`
    query PostDetail($postId: String!) {
  postDetail(postId: $postId) {
    ...RegularPostDetail
    children {
      id
    }
  }
}
    ${RegularPostDetailFragmentDoc}`;

/**
 * __usePostDetailQuery__
 *
 * To run a query within a React component, call `usePostDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostDetailQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostDetailQuery(baseOptions: Apollo.QueryHookOptions<PostDetailQuery, PostDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostDetailQuery, PostDetailQueryVariables>(PostDetailDocument, options);
      }
export function usePostDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostDetailQuery, PostDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostDetailQuery, PostDetailQueryVariables>(PostDetailDocument, options);
        }
export type PostDetailQueryHookResult = ReturnType<typeof usePostDetailQuery>;
export type PostDetailLazyQueryHookResult = ReturnType<typeof usePostDetailLazyQuery>;
export type PostDetailQueryResult = Apollo.QueryResult<PostDetailQuery, PostDetailQueryVariables>;
export const TopicsDocument = gql`
    query Topics {
  topics {
    title
    id
  }
}
    `;

/**
 * __useTopicsQuery__
 *
 * To run a query within a React component, call `useTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopicsQuery(baseOptions?: Apollo.QueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
      }
export function useTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
        }
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>;
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>;
export type TopicsQueryResult = Apollo.QueryResult<TopicsQuery, TopicsQueryVariables>;
export const UserRolesDocument = gql`
    query UserRoles($userId: String!) {
  userRoles(userId: $userId) {
    role
    communityId
  }
}
    `;

/**
 * __useUserRolesQuery__
 *
 * To run a query within a React component, call `useUserRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserRolesQuery(baseOptions: Apollo.QueryHookOptions<UserRolesQuery, UserRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserRolesQuery, UserRolesQueryVariables>(UserRolesDocument, options);
      }
export function useUserRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRolesQuery, UserRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserRolesQuery, UserRolesQueryVariables>(UserRolesDocument, options);
        }
export type UserRolesQueryHookResult = ReturnType<typeof useUserRolesQuery>;
export type UserRolesLazyQueryHookResult = ReturnType<typeof useUserRolesLazyQuery>;
export type UserRolesQueryResult = Apollo.QueryResult<UserRolesQuery, UserRolesQueryVariables>;
export type CommunityKeySpecifier = ('id' | 'createdAt' | 'updatedAt' | 'name' | 'description' | 'topics' | 'totalMemberships' | CommunityKeySpecifier)[];
export type CommunityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	topics?: FieldPolicy<any> | FieldReadFunction<any>,
	totalMemberships?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommunityResponseKeySpecifier = ('errors' | 'community' | CommunityResponseKeySpecifier)[];
export type CommunityResponseFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	community?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CompleteResponseKeySpecifier = ('errors' | 'isComplete' | CompleteResponseKeySpecifier)[];
export type CompleteResponseFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	isComplete?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FieldErrorKeySpecifier = ('field' | 'errorCode' | 'message' | FieldErrorKeySpecifier)[];
export type FieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	errorCode?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImageKeySpecifier = ('id' | 'path' | 'caption' | 'link' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	path?: FieldPolicy<any> | FieldReadFunction<any>,
	caption?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('changePassword' | 'forgotPassword' | 'register' | 'login' | 'logout' | 'googleAuthentication' | 'createPost' | 'deletePost' | 'uploadImage' | 'createCommunity' | 'vote' | 'createTopic' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	changePassword?: FieldPolicy<any> | FieldReadFunction<any>,
	forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	googleAuthentication?: FieldPolicy<any> | FieldReadFunction<any>,
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePost?: FieldPolicy<any> | FieldReadFunction<any>,
	uploadImage?: FieldPolicy<any> | FieldReadFunction<any>,
	createCommunity?: FieldPolicy<any> | FieldReadFunction<any>,
	vote?: FieldPolicy<any> | FieldReadFunction<any>,
	createTopic?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedPostsKeySpecifier = ('posts' | 'hasMore' | PaginatedPostsKeySpecifier)[];
export type PaginatedPostsFieldPolicy = {
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'creator' | 'community' | 'children' | 'images' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	points?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	community?: FieldPolicy<any> | FieldReadFunction<any>,
	children?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('me' | 'communityPosts' | 'paginatedPosts' | 'allPosts' | 'postDetail' | 'communities' | 'community' | 'userRoles' | 'topics' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	communityPosts?: FieldPolicy<any> | FieldReadFunction<any>,
	paginatedPosts?: FieldPolicy<any> | FieldReadFunction<any>,
	allPosts?: FieldPolicy<any> | FieldReadFunction<any>,
	postDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	communities?: FieldPolicy<any> | FieldReadFunction<any>,
	community?: FieldPolicy<any> | FieldReadFunction<any>,
	userRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	topics?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleKeySpecifier = ('userId' | 'communityId' | 'joinedAt' | 'role' | RoleKeySpecifier)[];
export type RoleFieldPolicy = {
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	communityId?: FieldPolicy<any> | FieldReadFunction<any>,
	joinedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TopicKeySpecifier = ('id' | 'createdAt' | 'updatedAt' | 'creator' | 'title' | TopicKeySpecifier)[];
export type TopicFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UploadResponseKeySpecifier = ('errors' | 'path' | UploadResponseKeySpecifier)[];
export type UploadResponseFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	path?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'createdAt' | 'updatedAt' | 'username' | 'role' | 'email' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserResponseKeySpecifier = ('errors' | 'user' | UserResponseKeySpecifier)[];
export type UserResponseFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Community?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommunityKeySpecifier | (() => undefined | CommunityKeySpecifier),
		fields?: CommunityFieldPolicy,
	},
	CommunityResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommunityResponseKeySpecifier | (() => undefined | CommunityResponseKeySpecifier),
		fields?: CommunityResponseFieldPolicy,
	},
	CompleteResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CompleteResponseKeySpecifier | (() => undefined | CompleteResponseKeySpecifier),
		fields?: CompleteResponseFieldPolicy,
	},
	FieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FieldErrorKeySpecifier | (() => undefined | FieldErrorKeySpecifier),
		fields?: FieldErrorFieldPolicy,
	},
	Image?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier),
		fields?: ImageFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PaginatedPosts?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedPostsKeySpecifier | (() => undefined | PaginatedPostsKeySpecifier),
		fields?: PaginatedPostsFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Role?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleKeySpecifier | (() => undefined | RoleKeySpecifier),
		fields?: RoleFieldPolicy,
	},
	Topic?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TopicKeySpecifier | (() => undefined | TopicKeySpecifier),
		fields?: TopicFieldPolicy,
	},
	UploadResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UploadResponseKeySpecifier | (() => undefined | UploadResponseKeySpecifier),
		fields?: UploadResponseFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserResponseKeySpecifier | (() => undefined | UserResponseKeySpecifier),
		fields?: UserResponseFieldPolicy,
	}
};