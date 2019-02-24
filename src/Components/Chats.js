import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_MESSAGES } from "./Queries";

const Chats = ({ innerChannelId }) => {
  const { data } = useQuery(GET_MESSAGES, {
    variables: { innerChannelId }
  });

  return (
    <div>
      {data.GetMessage &&
        data.GetMessage.ok &&
        data.GetMessage.messages.map((message, index) => (
          <div key={index}>
            {message.nickname}: {message.contents}
          </div>
        ))}
    </div>
  );
};

export default Chats;
