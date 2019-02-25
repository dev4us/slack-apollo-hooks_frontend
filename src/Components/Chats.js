import React from "react";
import { useQuery, useSubscription } from "react-apollo-hooks";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "./Queries";
import styled from "styled-components";
import moment from "moment-timezone";

const ChatRow = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding-left: 15px;

  &:hover {
    background: #ececec;
  }
`;

const Thumbnail = styled.img`
  margin-right: 10px;
  height: 40px;
`;

const MessageFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const DateTime = styled.div`
  font-size: 12px;
  padding-top: 3px;
  padding-left: 5px;
`;
const ProfileFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

const Chats = ({ innerChannelId }) => {
  const { data } = useQuery(GET_MESSAGES, {
    variables: { innerChannelId }
  });

  useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: { CreateMessageSubscription }
      }
    }) => {
      try {
        let messages = client.readQuery({
          query: GET_MESSAGES,
          variables: { innerChannelId }
        }).GetMessage.messages;

        if (CreateMessageSubscription.innerChannelId === innerChannelId) {
          messages.push(CreateMessageSubscription);

          client.writeQuery({
            query: GET_MESSAGES,
            variables: { innerChannelId },
            data: {
              messages
            }
          });
        }
      } catch (e) {}
    }
  });

  const TimeConverter = timestamp => {
    if (!timestamp) {
      return;
    }
    //let timestamp_date = new Date(parseInt(timestamp));
    //return timestamp_date.toLocaleString();
    return moment(parseInt(timestamp))
      .utcOffset(360)
      .format("YYYY-MM-DD HH:mm");
  };

  return (
    <div>
      {data.GetMessage &&
        data.GetMessage.ok &&
        data.GetMessage.messages.map((message, index) => (
          <ChatRow key={index}>
            <Thumbnail src="//github.com/dev4us/source_warehouse/blob/master/images/avatar.png?raw=true" />
            <MessageFrame>
              <ProfileFrame>
                <Nickname>{message.nickname}</Nickname>
                <DateTime>{TimeConverter(message.createdAt)}</DateTime>
              </ProfileFrame>
              {message.contents}
            </MessageFrame>
          </ChatRow>
        ))}
    </div>
  );
};

export default Chats;
