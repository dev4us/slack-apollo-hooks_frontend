import React, { useContext } from "react";
import { Store } from "../GlobalState/store";
import { useQuery, useSubscription } from "react-apollo-hooks";
import { CHANNELS_QUERY, CHANNELS_SUBSCRIPTION } from "./Queries";
import styled, { css } from "styled-components";

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

const LeftPannel = () => {
  const { state, dispatch } = useContext(Store);
  const { data, loading } = useQuery(CHANNELS_QUERY);

  const switchChannel = id => {
    dispatch({
      type: "SET_VALUE",
      target: "selectedChannelId",
      payload: id
    });
  };

  useSubscription(CHANNELS_SUBSCRIPTION, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: { CreateChannelSubscription }
      }
    }) => {
      try {
        let channels = client.readQuery({ query: CHANNELS_QUERY }).GetChannel
          .channels;

        channels.push(CreateChannelSubscription);

        client.writeQuery({
          query: CHANNELS_QUERY,
          data: {
            channels
          }
        });
      } catch (e) {}
    }
  });
  return (
    <>
      <LeftMenuFrame>
        <Title>Slack-Apollo-hooks</Title>
        <SubTitle>Channel</SubTitle>
        {loading && <Channel>loading...</Channel>}
        {data.GetChannel &&
          data.GetChannel.ok &&
          data.GetChannel.channels.map((channel, index) => (
            <Channel
              key={index}
              isActive={channel.id === state.selectedChannelId}
              onClick={() => switchChannel(channel.id)}
            >
              # {channel.channelName}
            </Channel>
          ))}
      </LeftMenuFrame>
    </>
  );
};

export default LeftPannel;
