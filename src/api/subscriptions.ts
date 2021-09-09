/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
export const onCreateEndpoint = /* GraphQL */ `
  subscription OnCreateEndpoint($userId: String!) {
    onCreateEndpoint(userId: $userId) {
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
export const onUpdateEndpoint = /* GraphQL */ `
  subscription OnUpdateEndpoint($userId: String!) {
    onUpdateEndpoint(userId: $userId) {
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
export const onDeleteEndpoint = /* GraphQL */ `
  subscription OnDeleteEndpoint($userId: String!) {
    onDeleteEndpoint(userId: $userId) {
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
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic {
    onCreateTopic {
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
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic {
    onUpdateTopic {
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
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic {
    onDeleteTopic {
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
export const onCreateSub = /* GraphQL */ `
  subscription OnCreateSub {
    onCreateSub {
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
export const onUpdateSub = /* GraphQL */ `
  subscription OnUpdateSub {
    onUpdateSub {
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
export const onDeleteSub = /* GraphQL */ `
  subscription OnDeleteSub {
    onDeleteSub {
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
