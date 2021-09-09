/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  endpoints?: ModelEndpointConnection | null,
  subs?: ModelSubConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelEndpointConnection = {
  __typename: "ModelEndpointConnection",
  items?:  Array<Endpoint | null > | null,
  nextToken?: string | null,
};

export type Endpoint = {
  __typename: "Endpoint",
  id: string,
  arn: string,
  userId: string,
  type: Platform,
  token: string,
  user: User,
  createdAt: string,
  updatedAt: string,
};

export enum Platform {
  ios = "ios",
  android = "android",
  web = "web",
}


export type ModelSubConnection = {
  __typename: "ModelSubConnection",
  items?:  Array<Sub | null > | null,
  nextToken?: string | null,
};

export type Sub = {
  __typename: "Sub",
  id: string,
  userID: string,
  topicID: string,
  topic: Topic,
  subscriberID: string,
  subscriber: Endpoint,
  createdAt: string,
  updatedAt: string,
};

export type Topic = {
  __typename: "Topic",
  id: string,
  topic: string,
  subs?: ModelSubConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateEndpointInput = {
  id?: string | null,
  arn: string,
  userId: string,
  type: Platform,
  token: string,
};

export type UpdateEndpointInput = {
  id: string,
  arn?: string | null,
  userId?: string | null,
  type?: Platform | null,
  token?: string | null,
};

export type DeleteEndpointInput = {
  id?: string | null,
};

export type CreateTopicInput = {
  id?: string | null,
  topic: string,
};

export type UpdateTopicInput = {
  id: string,
  topic?: string | null,
};

export type DeleteTopicInput = {
  id?: string | null,
};

export type CreateSubInput = {
  id?: string | null,
  userID: string,
  topicID: string,
  subscriberID: string,
};

export type UpdateSubInput = {
  id: string,
  userID?: string | null,
  topicID?: string | null,
  subscriberID?: string | null,
};

export type DeleteSubInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelEndpointFilterInput = {
  id?: ModelIDFilterInput | null,
  arn?: ModelStringFilterInput | null,
  userId?: ModelIDFilterInput | null,
  type?: ModelPlatformFilterInput | null,
  token?: ModelStringFilterInput | null,
  and?: Array< ModelEndpointFilterInput | null > | null,
  or?: Array< ModelEndpointFilterInput | null > | null,
  not?: ModelEndpointFilterInput | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelPlatformFilterInput = {
  eq?: Platform | null,
  ne?: Platform | null,
};

export type ModelTopicFilterInput = {
  id?: ModelIDFilterInput | null,
  topic?: ModelStringFilterInput | null,
  and?: Array< ModelTopicFilterInput | null > | null,
  or?: Array< ModelTopicFilterInput | null > | null,
  not?: ModelTopicFilterInput | null,
};

export type ModelTopicConnection = {
  __typename: "ModelTopicConnection",
  items?:  Array<Topic | null > | null,
  nextToken?: string | null,
};

export type ModelSubFilterInput = {
  id?: ModelIDFilterInput | null,
  userID?: ModelIDFilterInput | null,
  topicID?: ModelIDFilterInput | null,
  subscriberID?: ModelIDFilterInput | null,
  and?: Array< ModelSubFilterInput | null > | null,
  or?: Array< ModelSubFilterInput | null > | null,
  not?: ModelSubFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    endpoints?:  {
      __typename: "ModelEndpointConnection",
      nextToken?: string | null,
    } | null,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    endpoints?:  {
      __typename: "ModelEndpointConnection",
      nextToken?: string | null,
    } | null,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    endpoints?:  {
      __typename: "ModelEndpointConnection",
      nextToken?: string | null,
    } | null,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateEndpointMutationVariables = {
  input: CreateEndpointInput,
};

export type CreateEndpointMutation = {
  createEndpoint?:  {
    __typename: "Endpoint",
    id: string,
    arn: string,
    userId: string,
    type: Platform,
    token: string,
    user:  {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEndpointMutationVariables = {
  input: UpdateEndpointInput,
};

export type UpdateEndpointMutation = {
  updateEndpoint?:  {
    __typename: "Endpoint",
    id: string,
    arn: string,
    userId: string,
    type: Platform,
    token: string,
    user:  {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEndpointMutationVariables = {
  input: DeleteEndpointInput,
};

export type DeleteEndpointMutation = {
  deleteEndpoint?:  {
    __typename: "Endpoint",
    id: string,
    arn: string,
    userId: string,
    type: Platform,
    token: string,
    user:  {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTopicMutationVariables = {
  input: CreateTopicInput,
};

export type CreateTopicMutation = {
  createTopic?:  {
    __typename: "Topic",
    id: string,
    topic: string,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTopicMutationVariables = {
  input: UpdateTopicInput,
};

export type UpdateTopicMutation = {
  updateTopic?:  {
    __typename: "Topic",
    id: string,
    topic: string,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTopicMutationVariables = {
  input: DeleteTopicInput,
};

export type DeleteTopicMutation = {
  deleteTopic?:  {
    __typename: "Topic",
    id: string,
    topic: string,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSubMutationVariables = {
  input: CreateSubInput,
};

export type CreateSubMutation = {
  createSub?:  {
    __typename: "Sub",
    id: string,
    userID: string,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    },
    subscriberID: string,
    subscriber:  {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubMutationVariables = {
  input: UpdateSubInput,
};

export type UpdateSubMutation = {
  updateSub?:  {
    __typename: "Sub",
    id: string,
    userID: string,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    },
    subscriberID: string,
    subscriber:  {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubMutationVariables = {
  input: DeleteSubInput,
};

export type DeleteSubMutation = {
  deleteSub?:  {
    __typename: "Sub",
    id: string,
    userID: string,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    },
    subscriberID: string,
    subscriber:  {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    endpoints?:  {
      __typename: "ModelEndpointConnection",
      nextToken?: string | null,
    } | null,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetEndpointQueryVariables = {
  id: string,
};

export type GetEndpointQuery = {
  getEndpoint?:  {
    __typename: "Endpoint",
    id: string,
    arn: string,
    userId: string,
    type: Platform,
    token: string,
    user:  {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEndpointsQueryVariables = {
  filter?: ModelEndpointFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEndpointsQuery = {
  listEndpoints?:  {
    __typename: "ModelEndpointConnection",
    items?:  Array< {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTopicQueryVariables = {
  id: string,
};

export type GetTopicQuery = {
  getTopic?:  {
    __typename: "Topic",
    id: string,
    topic: string,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTopicsQueryVariables = {
  filter?: ModelTopicFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTopicsQuery = {
  listTopics?:  {
    __typename: "ModelTopicConnection",
    items?:  Array< {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSubQueryVariables = {
  id: string,
};

export type GetSubQuery = {
  getSub?:  {
    __typename: "Sub",
    id: string,
    userID: string,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    },
    subscriberID: string,
    subscriber:  {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSubsQueryVariables = {
  filter?: ModelSubFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubsQuery = {
  listSubs?:  {
    __typename: "ModelSubConnection",
    items?:  Array< {
      __typename: "Sub",
      id: string,
      userID: string,
      topicID: string,
      subscriberID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner: string,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    endpoints?:  {
      __typename: "ModelEndpointConnection",
      nextToken?: string | null,
    } | null,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner: string,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    endpoints?:  {
      __typename: "ModelEndpointConnection",
      nextToken?: string | null,
    } | null,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner: string,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    endpoints?:  {
      __typename: "ModelEndpointConnection",
      nextToken?: string | null,
    } | null,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateEndpointSubscriptionVariables = {
  userId: string,
};

export type OnCreateEndpointSubscription = {
  onCreateEndpoint?:  {
    __typename: "Endpoint",
    id: string,
    arn: string,
    userId: string,
    type: Platform,
    token: string,
    user:  {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEndpointSubscriptionVariables = {
  userId: string,
};

export type OnUpdateEndpointSubscription = {
  onUpdateEndpoint?:  {
    __typename: "Endpoint",
    id: string,
    arn: string,
    userId: string,
    type: Platform,
    token: string,
    user:  {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEndpointSubscriptionVariables = {
  userId: string,
};

export type OnDeleteEndpointSubscription = {
  onDeleteEndpoint?:  {
    __typename: "Endpoint",
    id: string,
    arn: string,
    userId: string,
    type: Platform,
    token: string,
    user:  {
      __typename: "User",
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTopicSubscription = {
  onCreateTopic?:  {
    __typename: "Topic",
    id: string,
    topic: string,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTopicSubscription = {
  onUpdateTopic?:  {
    __typename: "Topic",
    id: string,
    topic: string,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTopicSubscription = {
  onDeleteTopic?:  {
    __typename: "Topic",
    id: string,
    topic: string,
    subs?:  {
      __typename: "ModelSubConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSubSubscription = {
  onCreateSub?:  {
    __typename: "Sub",
    id: string,
    userID: string,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    },
    subscriberID: string,
    subscriber:  {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubSubscription = {
  onUpdateSub?:  {
    __typename: "Sub",
    id: string,
    userID: string,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    },
    subscriberID: string,
    subscriber:  {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubSubscription = {
  onDeleteSub?:  {
    __typename: "Sub",
    id: string,
    userID: string,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      topic: string,
      createdAt: string,
      updatedAt: string,
    },
    subscriberID: string,
    subscriber:  {
      __typename: "Endpoint",
      id: string,
      arn: string,
      userId: string,
      type: Platform,
      token: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
