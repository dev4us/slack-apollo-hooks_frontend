import React, { useEffect } from "react";
import { graphql, compose } from "react-apollo";
import styled, { css } from "styled-components";
import gql from "graphql-tag";

const LeftMenuFrame = styled.div`
  padding: 15px 15px 15px 15px;
  width: 250px;
  height: 100%;
  background: #4d394b;
`;

const Title = styled.div`
  width: 100%;
  height: 40px;
  font-weight: bold;
  color: white;
  font-size: 20px;
`;

const SubTitle = styled.div`
  width: 100%;
  height: 40px;
  color: #dcdcdc;
  font-size: 15px;
`;

const Channel = styled.div`
  width: 100%;
  height: 30px;
  color: #8e8d8d;
  font-size: 15px;
  cursor: pointer;
  ${props =>
    props.isActive &&
    css`
      color: white;
      font-weight: bold;
      cursor: context-menu;
    `}
`;

const CHANNELS_QUERY = gql`
  query {
    GetChannel {
      channels {
        id
        channelName
      }
    }
  }
`;

const CHANNELS_SUBSCRIPTION = gql`
  subscription CreateChannelSubscription {
    CreateChannelSubscription {
      id
      channelName
    }
  }
`;

const ChannelList = ({ getChannelQuery, store, setStore }) => {
  const subscribeToNewChannel = () => {
    getChannelQuery.subscribeToMore({
      document: CHANNELS_SUBSCRIPTION,
      updateQuery: (prevData, { subscriptionData }) => {
        return {
          GetChannel: {
            channels: [
              ...prevData.GetChannel.channels,
              subscriptionData.data.CreateChannelSubscription
            ],
            __typename: prevData.GetChannel.__typename
          }
        };
      }
    });
  };

  useEffect(() => {
    subscribeToNewChannel();
  }, []);

  const switchChannel = id => {
    setStore({
      ...store,
      selectedChannelId: id
    });
  };

  return (
    <>
      <LeftMenuFrame>
        <Title>Slack-Apollo-hooks</Title>
        <SubTitle>Channel</SubTitle>
        {!getChannelQuery.loading &&
          getChannelQuery.GetChannel.channels.map((channel, index) => (
            <Channel
              key={index}
              isActive={channel.id === store.selectedChannelId}
              onClick={() => switchChannel(channel.id)}
            >
              # {channel.channelName}
            </Channel>
          ))}
      </LeftMenuFrame>
    </>
  );
};

export default compose(graphql(CHANNELS_QUERY, { name: "getChannelQuery" }))(
  ChannelList
);
