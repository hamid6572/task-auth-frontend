/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation Register($email: String!, $firstName: String!, $lastName: String!, $password: String!) {\n    register(\n      createUser: { email: $email, firstName: $firstName, lastName: $lastName, password: $password }\n    ) {\n      token\n      user {\n        id\n      }\n    }\n  }\n':
    types.RegisterDocument,
  '\n  mutation Login($email: String!, $password: String!) {\n    login(loginData: { email: $email, password: $password }) {\n      token\n      user {\n        id\n      }\n    }\n  }\n':
    types.LoginDocument,
  '\n  query GetUser($email: String!) {\n    user(email: $email) {\n      firstName\n      posts {\n        title\n      }\n    }\n  }\n':
    types.GetUserDocument,
  '\n  query GetComment($postId: Int!, $page: Int!, $itemsPerPage: Int!) {\n    getComment(postId: $postId, page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n':
    types.GetCommentDocument,
  '\n  query Comment($commentId: Int!) {\n    Comment(postId: $commentId) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n':
    types.CommentDocument,
  '\n  query GetRepliesOfComment($commentId: Int!, $page: Int!, $itemsPerPage: Int!) {\n    getRepliesOfComment(commentId: $commentId, page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n':
    types.GetRepliesOfCommentDocument,
  '\n  mutation AddComment($text: String!, $postId: Int!) {\n    createComment(data: { text: $text, postId: $postId }) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n':
    types.AddCommentDocument,
  '\n  mutation AddReplyToComment($text: String!, $postId: Int!, $commentId: Int!) {\n    addReplyToComment(data: { text: $text, postId: $postId, commentId: $commentId }) {\n      id\n      text\n    }\n  }\n':
    types.AddReplyToCommentDocument,
  '\n  mutation CreatePost($input: postInput!) {\n    createPost(data: $input) {\n      message\n      id\n    }\n  }\n':
    types.CreatePostDocument,
  '\n  query PaginatedPosts($page: Int!, $itemsPerPage: Int!) {\n    paginatedPosts(page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      title\n      content\n      user {\n        id\n        firstName\n      }\n      comments {\n        id\n        text\n      }\n    }\n  }\n':
    types.PaginatedPostsDocument,
  '\n  query Search($input: String!) {\n    search(input: $input) {\n      user {\n        lastName\n        firstName\n        id\n      }\n      comments {\n        id\n        text\n        user {\n          firstName\n        }\n        post {\n          id\n          title\n          content\n        }\n        replies {\n          id\n          text\n          replies {\n            id\n            text\n          }\n        }\n      }\n      id\n      title\n      content\n    }\n  }\n':
    types.SearchDocument,
  '\n  query GetPost($id: Int!) {\n    getPost(id: $id) {\n      id\n      title\n      content\n      user {\n        firstName\n      }\n      comments {\n        id\n        text\n      }\n    }\n  }\n':
    types.GetPostDocument,
  '\n  mutation UpdatePost($id: Int!, $input: postInput!) {\n    updatePost(id: $id, data: $input) {\n      message\n      id\n    }\n  }\n':
    types.UpdatePostDocument,
  '\n  mutation DeletePost($id: Int!) {\n    deletePost(id: $id) {\n      message\n    }\n  }\n':
    types.DeletePostDocument
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation Register($email: String!, $firstName: String!, $lastName: String!, $password: String!) {\n    register(\n      createUser: { email: $email, firstName: $firstName, lastName: $lastName, password: $password }\n    ) {\n      token\n      user {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation Register($email: String!, $firstName: String!, $lastName: String!, $password: String!) {\n    register(\n      createUser: { email: $email, firstName: $firstName, lastName: $lastName, password: $password }\n    ) {\n      token\n      user {\n        id\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    login(loginData: { email: $email, password: $password }) {\n      token\n      user {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation Login($email: String!, $password: String!) {\n    login(loginData: { email: $email, password: $password }) {\n      token\n      user {\n        id\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUser($email: String!) {\n    user(email: $email) {\n      firstName\n      posts {\n        title\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUser($email: String!) {\n    user(email: $email) {\n      firstName\n      posts {\n        title\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetComment($postId: Int!, $page: Int!, $itemsPerPage: Int!) {\n    getComment(postId: $postId, page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetComment($postId: Int!, $page: Int!, $itemsPerPage: Int!) {\n    getComment(postId: $postId, page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Comment($commentId: Int!) {\n    Comment(postId: $commentId) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Comment($commentId: Int!) {\n    Comment(postId: $commentId) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetRepliesOfComment($commentId: Int!, $page: Int!, $itemsPerPage: Int!) {\n    getRepliesOfComment(commentId: $commentId, page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetRepliesOfComment($commentId: Int!, $page: Int!, $itemsPerPage: Int!) {\n    getRepliesOfComment(commentId: $commentId, page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddComment($text: String!, $postId: Int!) {\n    createComment(data: { text: $text, postId: $postId }) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AddComment($text: String!, $postId: Int!) {\n    createComment(data: { text: $text, postId: $postId }) {\n      id\n      text\n      user {\n        firstName\n      }\n      post {\n        id\n        title\n        content\n      }\n      replies {\n        id\n        text\n        replies {\n          id\n          text\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddReplyToComment($text: String!, $postId: Int!, $commentId: Int!) {\n    addReplyToComment(data: { text: $text, postId: $postId, commentId: $commentId }) {\n      id\n      text\n    }\n  }\n'
): (typeof documents)['\n  mutation AddReplyToComment($text: String!, $postId: Int!, $commentId: Int!) {\n    addReplyToComment(data: { text: $text, postId: $postId, commentId: $commentId }) {\n      id\n      text\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreatePost($input: postInput!) {\n    createPost(data: $input) {\n      message\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreatePost($input: postInput!) {\n    createPost(data: $input) {\n      message\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query PaginatedPosts($page: Int!, $itemsPerPage: Int!) {\n    paginatedPosts(page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      title\n      content\n      user {\n        id\n        firstName\n      }\n      comments {\n        id\n        text\n      }\n    }\n  }\n'
): (typeof documents)['\n  query PaginatedPosts($page: Int!, $itemsPerPage: Int!) {\n    paginatedPosts(page: $page, itemsPerPage: $itemsPerPage) {\n      id\n      title\n      content\n      user {\n        id\n        firstName\n      }\n      comments {\n        id\n        text\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Search($input: String!) {\n    search(input: $input) {\n      user {\n        lastName\n        firstName\n        id\n      }\n      comments {\n        id\n        text\n        user {\n          firstName\n        }\n        post {\n          id\n          title\n          content\n        }\n        replies {\n          id\n          text\n          replies {\n            id\n            text\n          }\n        }\n      }\n      id\n      title\n      content\n    }\n  }\n'
): (typeof documents)['\n  query Search($input: String!) {\n    search(input: $input) {\n      user {\n        lastName\n        firstName\n        id\n      }\n      comments {\n        id\n        text\n        user {\n          firstName\n        }\n        post {\n          id\n          title\n          content\n        }\n        replies {\n          id\n          text\n          replies {\n            id\n            text\n          }\n        }\n      }\n      id\n      title\n      content\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPost($id: Int!) {\n    getPost(id: $id) {\n      id\n      title\n      content\n      user {\n        firstName\n      }\n      comments {\n        id\n        text\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetPost($id: Int!) {\n    getPost(id: $id) {\n      id\n      title\n      content\n      user {\n        firstName\n      }\n      comments {\n        id\n        text\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdatePost($id: Int!, $input: postInput!) {\n    updatePost(id: $id, data: $input) {\n      message\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdatePost($id: Int!, $input: postInput!) {\n    updatePost(id: $id, data: $input) {\n      message\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeletePost($id: Int!) {\n    deletePost(id: $id) {\n      message\n    }\n  }\n'
): (typeof documents)['\n  mutation DeletePost($id: Int!) {\n    deletePost(id: $id) {\n      message\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
