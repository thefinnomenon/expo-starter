/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      endpoints {
        nextToken
      }
      subs {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      endpoints {
        nextToken
      }
      subs {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      endpoints {
        nextToken
      }
      subs {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createEndpoint = /* GraphQL */ `
  mutation CreateEndpoint($input: CreateEndpointInput!) {
    createEndpoint(input: $input) {
      id
      arn
      userId
      type
      token
      user {
        id
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEndpoint = /* GraphQL */ `
  mutation UpdateEndpoint($input: UpdateEndpointInput!) {
    updateEndpoint(input: $input) {
      id
      arn
      userId
      type
      token
      user {
        id
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEndpoint = /* GraphQL */ `
  mutation DeleteEndpoint($input: DeleteEndpointInput!) {
    deleteEndpoint(input: $input) {
      id
      arn
      userId
      type
      token
      user {
        id
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTopic = /* GraphQL */ `
  mutation CreateTopic($input: CreateTopicInput!) {
    createTopic(input: $input) {
      id
      topic
      subs {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTopic = /* GraphQL */ `
  mutation UpdateTopic($input: UpdateTopicInput!) {
    updateTopic(input: $input) {
      id
      topic
      subs {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTopic = /* GraphQL */ `
  mutation DeleteTopic($input: DeleteTopicInput!) {
    deleteTopic(input: $input) {
      id
      topic
      subs {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSub = /* GraphQL */ `
  mutation CreateSub($input: CreateSubInput!) {
    createSub(input: $input) {
      id
      userID
      topicID
      topic {
        id
        topic
        createdAt
        updatedAt
      }
      subscriberID
      subscriber {
        id
        arn
        userId
        type
        token
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSub = /* GraphQL */ `
  mutation UpdateSub($input: UpdateSubInput!) {
    updateSub(input: $input) {
      id
      userID
      topicID
      topic {
        id
        topic
        createdAt
        updatedAt
      }
      subscriberID
      subscriber {
        id
        arn
        userId
        type
        token
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSub = /* GraphQL */ `
  mutation DeleteSub($input: DeleteSubInput!) {
    deleteSub(input: $input) {
      id
      userID
      topicID
      topic {
        id
        topic
        createdAt
        updatedAt
      }
      subscriberID
      subscriber {
        id
        arn
        userId
        type
        token
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
