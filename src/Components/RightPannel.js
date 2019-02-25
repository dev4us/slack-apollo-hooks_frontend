import React, { useContext, useState, useRef } from "react";
import { Store } from "../GlobalState/store";
import { useMutation } from "react-apollo-hooks";
import { SEND_MESSAGE } from "./Queries";
import styled from "styled-components";

import faker from "faker";

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
  const [nickname, setNickname] = useState(faker.name.findName());
  const [message, setMessage] = useState("");
  const inputChat = useRef();

  const sendChat = useMutation(SEND_MESSAGE, {
    variables: {
      nickname,
      contents: message,
      innerChannelId: state.selectedChannelId
    },
    update: (proxy, mutationResult) => {
      setMessage("");
      inputChat.current.focus();
    }
  });

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
          ref={inputChat}
          placeholder="input your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <SendMessage onClick={sendChat}>SEND MESSAGE</SendMessage>
      </ChatInputFrame>
    </Container>
  );
};

export default RightPannel;
