import React, { useContext, useState } from "react";
import { Store } from "../GlobalState/store";
import { graphql, compose } from "react-apollo";
import { SEND_MESSAGE } from "./Queries";
import styled from "styled-components";

import Chats from "./Chats";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ChatListFrame = styled.div`
  flex: 9;
  overflow-y: scroll;
  border-bottom: 1px solid #dcdcdc;
`;

const ChatInputFrame = styled.div`
  height: 35px;
`;

const InputNickname = styled.input``;
const InputChat = styled.input``;
const SendMessage = styled.button``;

const RightPannel = ({ sendMessage }) => {
  const { state } = useContext(Store);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const sendChat = async () => {
    await sendMessage({
      variables: {
        nickname,
        contents: message,
        innerChannelId: state.selectedChannelId
      }
    });
    setMessage("");
  };
  return (
    <Container>
      <ChatListFrame>
        <Chats innerChannelId={state.selectedChannelId} />
      </ChatListFrame>
      <ChatInputFrame>
        <InputNickname
          placeholder="your nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <InputChat
          placeholder="input your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <SendMessage onClick={() => sendChat()}>SEND MESSAGE</SendMessage>
      </ChatInputFrame>
    </Container>
  );
};

export default compose(graphql(SEND_MESSAGE, { name: "sendMessage" }))(
  RightPannel
);
