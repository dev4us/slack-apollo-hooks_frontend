import gql from "graphql-tag";

export const CHANNELS_QUERY = gql`
  query {
    GetChannel {
      ok
      channels {
        id
        channelName
      }
    }
  }
`;

export const CHANNELS_SUBSCRIPTION = gql`
  subscription CreateChannelSubscription {
    CreateChannelSubscription {
      id
      channelName
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessage($innerChannelId: Int!) {
    GetMessage(innerChannelId: $innerChannelId) {
      ok
      messages {
        nickname
        contents
        createdAt
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $nickname: String!
    $contents: String!
    $innerChannelId: Int!
  ) {
    SendMessage(
      nickname: $nickname
      contents: $contents
      innerChannelId: $innerChannelId
    ) {
      ok
      error
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription CreateMessageSubscription {
    CreateMessageSubscription {
      nickname
      contents
      createdAt
      innerChannelId
    }
  }
`;
