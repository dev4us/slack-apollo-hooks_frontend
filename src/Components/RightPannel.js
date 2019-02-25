import React, { useContext, useState, useRef } from "react";
import { Store } from "../GlobalState/store";
import { useMutation } from "react-apollo-hooks";
import { SEND_MESSAGE } from "./Queries";
import styled, { css } from "styled-components";

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
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  height: 60px;
`;

const InputData = styled.input`
  border: 2px solid black;
  padding-left: 30px;
  height: 38px;
  ${props =>
    props.inputId === "nickname" &&
    css`
      width: 12%;
      border-right: none;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    `}
  ${props =>
    props.inputId === "chat" &&
    css`
      width: 76%;
    `}
`;
const SendMessage = styled.button`
  width: 11%;
  height: 38px;
  background: #4d394b;
  color: white;
  font-size: 12px;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
`;

const RightPannel = () => {
  const { state } = useContext(Store);
  const [nickname, setNickname] = useState(faker.name.findName());
  const [message, setMessage] = useState("");
  const inputChat = useRef();

  const setMessageByKey = e => {
    if (e.key === "Enter") {
      sendChat();
    }
  };
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
        <InputData
          inputId="nickname"
          placeholder="your nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <InputData
          inputId="chat"
          ref={inputChat}
          placeholder="input your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => setMessageByKey(e)}
        />
        <SendMessage onClick={sendChat}>Send Message</SendMessage>
      </ChatInputFrame>
    </Container>
  );
};

export default RightPannel;
