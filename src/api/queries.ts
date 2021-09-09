/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEndpoint = /* GraphQL */ `
  query GetEndpoint($id: ID!) {
    getEndpoint(id: $id) {
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
export const listEndpoints = /* GraphQL */ `
  query ListEndpoints(
    $filter: ModelEndpointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEndpoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        arn
        userId
        type
        token
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTopic = /* GraphQL */ `
  query GetTopic($id: ID!) {
    getTopic(id: $id) {
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
export const listTopics = /* GraphQL */ `
  query ListTopics(
    $filter: ModelTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        topic
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSub = /* GraphQL */ `
  query GetSub($id: ID!) {
    getSub(id: $id) {
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
export const listSubs = /* GraphQL */ `
  query ListSubs(
    $filter: ModelSubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        topicID
        subscriberID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
