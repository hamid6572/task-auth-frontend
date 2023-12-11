/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['Float']['output']
  parent?: Maybe<Comment>
  post: Post
  replies?: Maybe<Array<Comment>>
  text?: Maybe<Scalars['String']['output']>
  user: User
}

export type CommentInput = {
  postId?: InputMaybe<Scalars['Int']['input']>
  text: Scalars['String']['input']
}

export type LoginInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type LoginResponse = {
  __typename?: 'LoginResponse'
  token: Scalars['String']['output']
  user: User
}

export type Mutation = {
  __typename?: 'Mutation'
  addReplyToComment: Comment
  createComment: Comment
  createPost: SuccessResponse
  deleteCommentByPost: SuccessResponse
  deletePost: SuccessResponse
  login: LoginResponse
  register: LoginResponse
  updateComment: SuccessResponse
  updatePost: SuccessResponse
}

export type MutationAddReplyToCommentArgs = {
  data: ReplyInput
}

export type MutationCreateCommentArgs = {
  data: CommentInput
}

export type MutationCreatePostArgs = {
  data: PostInput
}

export type MutationDeleteCommentByPostArgs = {
  postId: Scalars['Int']['input']
}

export type MutationDeletePostArgs = {
  id: Scalars['Int']['input']
}

export type MutationLoginArgs = {
  loginData: LoginInput
}

export type MutationRegisterArgs = {
  createUser: UserInput
}

export type MutationUpdateCommentArgs = {
  data: CommentInput
  id: Scalars['Int']['input']
}

export type MutationUpdatePostArgs = {
  data: PostInput
  id: Scalars['Int']['input']
}

export type Post = {
  __typename?: 'Post'
  comments?: Maybe<Array<Comment>>
  content: Scalars['String']['output']
  id: Scalars['Float']['output']
  status: PostStatus
  title: Scalars['String']['output']
  user?: Maybe<User>
}

export enum PostStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query'
  Comment: Comment
  getComment: Array<Comment>
  getPost: Post
  getRepliesOfComment: Array<Comment>
  hello: Scalars['String']['output']
  listComments: Array<Comment>
  listPosts: Array<Post>
  paginatedPosts: Array<Post>
  search: Array<Post>
  user: User
}

export type QueryCommentArgs = {
  postId: Scalars['Int']['input']
}

export type QueryGetCommentArgs = {
  itemsPerPage?: Scalars['Int']['input']
  page?: Scalars['Int']['input']
  postId: Scalars['Int']['input']
}

export type QueryGetPostArgs = {
  id: Scalars['Int']['input']
}

export type QueryGetRepliesOfCommentArgs = {
  commentId: Scalars['Int']['input']
  itemsPerPage?: Scalars['Int']['input']
  page?: Scalars['Int']['input']
}

export type QueryPaginatedPostsArgs = {
  itemsPerPage?: Scalars['Int']['input']
  page?: Scalars['Int']['input']
}

export type QuerySearchArgs = {
  input: Scalars['String']['input']
}

export type QueryUserArgs = {
  email: Scalars['String']['input']
}

export type ReplyInput = {
  commentId?: InputMaybe<Scalars['Int']['input']>
  postId?: InputMaybe<Scalars['Int']['input']>
  text: Scalars['String']['input']
}

export type SuccessResponse = {
  __typename?: 'SuccessResponse'
  id?: Maybe<Scalars['Float']['output']>
  message?: Maybe<Scalars['String']['output']>
  success?: Maybe<Scalars['Boolean']['output']>
}

export type User = {
  __typename?: 'User'
  comments: Array<Comment>
  email: Scalars['String']['output']
  firstName: Scalars['String']['output']
  id: Scalars['Float']['output']
  lastName: Scalars['String']['output']
  password: Scalars['String']['output']
  posts: Array<Post>
}

export type UserInput = {
  email: Scalars['String']['input']
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type PostInput = {
  content: Scalars['String']['input']
  title: Scalars['String']['input']
}

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input']
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'LoginResponse'
    token: string
    user: { __typename?: 'User'; id: number }
  }
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'LoginResponse'; token: string; user: { __typename?: 'User'; id: number } }
}

export type GetUserQueryVariables = Exact<{
  email: Scalars['String']['input']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    firstName: string
    posts: Array<{ __typename?: 'Post'; title: string }>
  }
}

export type GetCommentQueryVariables = Exact<{
  postId: Scalars['Int']['input']
  page: Scalars['Int']['input']
  itemsPerPage: Scalars['Int']['input']
}>

export type GetCommentQuery = {
  __typename?: 'Query'
  getComment: Array<{
    __typename?: 'Comment'
    id: number
    text?: string | null
    user: { __typename?: 'User'; firstName: string }
    post: { __typename?: 'Post'; id: number; title: string; content: string }
    replies?: Array<{
      __typename?: 'Comment'
      id: number
      text?: string | null
      replies?: Array<{ __typename?: 'Comment'; id: number; text?: string | null }> | null
    }> | null
  }>
}

export type CommentQueryVariables = Exact<{
  commentId: Scalars['Int']['input']
}>

export type CommentQuery = {
  __typename?: 'Query'
  Comment: {
    __typename?: 'Comment'
    id: number
    text?: string | null
    user: { __typename?: 'User'; firstName: string }
    post: { __typename?: 'Post'; id: number; title: string; content: string }
    replies?: Array<{
      __typename?: 'Comment'
      id: number
      text?: string | null
      replies?: Array<{ __typename?: 'Comment'; id: number; text?: string | null }> | null
    }> | null
  }
}

export type GetRepliesOfCommentQueryVariables = Exact<{
  commentId: Scalars['Int']['input']
  page: Scalars['Int']['input']
  itemsPerPage: Scalars['Int']['input']
}>

export type GetRepliesOfCommentQuery = {
  __typename?: 'Query'
  getRepliesOfComment: Array<{
    __typename?: 'Comment'
    id: number
    text?: string | null
    user: { __typename?: 'User'; firstName: string }
    post: { __typename?: 'Post'; id: number; title: string; content: string }
    replies?: Array<{
      __typename?: 'Comment'
      id: number
      text?: string | null
      replies?: Array<{ __typename?: 'Comment'; id: number; text?: string | null }> | null
    }> | null
  }>
}

export type AddCommentMutationVariables = Exact<{
  text: Scalars['String']['input']
  postId: Scalars['Int']['input']
}>

export type AddCommentMutation = {
  __typename?: 'Mutation'
  createComment: {
    __typename?: 'Comment'
    id: number
    text?: string | null
    user: { __typename?: 'User'; firstName: string }
    post: { __typename?: 'Post'; id: number; title: string; content: string }
    replies?: Array<{
      __typename?: 'Comment'
      id: number
      text?: string | null
      replies?: Array<{ __typename?: 'Comment'; id: number; text?: string | null }> | null
    }> | null
  }
}

export type AddReplyToCommentMutationVariables = Exact<{
  text: Scalars['String']['input']
  postId: Scalars['Int']['input']
  commentId: Scalars['Int']['input']
}>

export type AddReplyToCommentMutation = {
  __typename?: 'Mutation'
  addReplyToComment: { __typename?: 'Comment'; id: number; text?: string | null }
}

export type CreatePostMutationVariables = Exact<{
  input: PostInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: { __typename?: 'SuccessResponse'; message?: string | null; id?: number | null }
}

export type PaginatedPostsQueryVariables = Exact<{
  page: Scalars['Int']['input']
  itemsPerPage: Scalars['Int']['input']
}>

export type PaginatedPostsQuery = {
  __typename?: 'Query'
  paginatedPosts: Array<{
    __typename?: 'Post'
    id: number
    title: string
    content: string
    user?: { __typename?: 'User'; id: number; firstName: string } | null
    comments?: Array<{ __typename?: 'Comment'; id: number; text?: string | null }> | null
  }>
}

export type SearchQueryVariables = Exact<{
  input: Scalars['String']['input']
}>

export type SearchQuery = {
  __typename?: 'Query'
  search: Array<{
    __typename?: 'Post'
    id: number
    title: string
    content: string
    user?: { __typename?: 'User'; lastName: string; firstName: string; id: number } | null
    comments?: Array<{
      __typename?: 'Comment'
      id: number
      text?: string | null
      user: { __typename?: 'User'; firstName: string }
      post: { __typename?: 'Post'; id: number; title: string; content: string }
      replies?: Array<{
        __typename?: 'Comment'
        id: number
        text?: string | null
        replies?: Array<{ __typename?: 'Comment'; id: number; text?: string | null }> | null
      }> | null
    }> | null
  }>
}

export type GetPostQueryVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type GetPostQuery = {
  __typename?: 'Query'
  getPost: {
    __typename?: 'Post'
    id: number
    title: string
    content: string
    user?: { __typename?: 'User'; firstName: string } | null
    comments?: Array<{ __typename?: 'Comment'; id: number; text?: string | null }> | null
  }
}

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int']['input']
  input: PostInput
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost: { __typename?: 'SuccessResponse'; message?: string | null; id?: number | null }
}

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: { __typename?: 'SuccessResponse'; message?: string | null }
}

export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createUser' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'firstName' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'lastName' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'loginData' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const GetUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'posts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'title' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>
export const GetCommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetComment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'postId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'itemsPerPage' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getComment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'postId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'postId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'itemsPerPage' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'itemsPerPage' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } }]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'post' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replies' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'replies' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'text' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCommentQuery, GetCommentQueryVariables>
export const CommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Comment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Comment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'postId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } }]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'post' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replies' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'replies' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'text' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommentQuery, CommentQueryVariables>
export const GetRepliesOfCommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRepliesOfComment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'itemsPerPage' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getRepliesOfComment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commentId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'itemsPerPage' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'itemsPerPage' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } }]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'post' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replies' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'replies' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'text' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetRepliesOfCommentQuery, GetRepliesOfCommentQueryVariables>
export const AddCommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddComment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'postId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createComment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'text' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'postId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'postId' } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } }]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'post' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replies' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'replies' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'text' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>
export const AddReplyToCommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddReplyToComment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'postId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addReplyToComment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'text' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'postId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'postId' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'commentId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'commentId' } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddReplyToCommentMutation, AddReplyToCommentMutationVariables>
export const CreatePostDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreatePost' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'postInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPost' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>
export const PaginatedPostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PaginatedPosts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'itemsPerPage' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paginatedPosts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'itemsPerPage' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'itemsPerPage' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'comments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<PaginatedPostsQuery, PaginatedPostsQueryVariables>
export const SearchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Search' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'search' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'comments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'post' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'content' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'replies' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'replies' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'text' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>
export const GetPostDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPost' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPost' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } }]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'comments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>
export const UpdatePostDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePost' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'postInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePost' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>
export const DeletePostDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeletePost' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deletePost' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'message' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>
