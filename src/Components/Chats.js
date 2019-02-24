import React from "react";
import { useQuery, useSubscription } from "react-apollo-hooks";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "./Queries";

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
      console.log(CreateMessageSubscription);
      console.log(client);
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

  return (
    <div>
      {data.GetMessage &&
        data.GetMessage.ok &&
        data.GetMessage.messages.map((message, index) => (
          <div key={index}>
            {message.nickname}: {message.contents} ({message.createdAt})
          </div>
        ))}
    </div>
  );
};

export default Chats;
