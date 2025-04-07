import React, { useRef } from "react";
import styled from "styled-components";
import LogOut from "./LogOut";
import ChatInput from "./ChatInput";

import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/ApiRoutes";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const scrollRef = useRef();
  const currentChatImage = currentChat.avatarImage;

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const updatedMessages = [...messages];
    updatedMessages.push({ fromSelf: true, message: msg });
    setMessages(updatedMessages);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const messaging = async () => {
      try {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });

        console.log("Messages received from API:", response.data);

        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentChat) {
      messaging();
    }
  }, [currentChat, currentUser]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={
                currentChatImage?.startsWith("http")
                  ? currentChatImage
                  : `data:image/svg+xml;base64,${currentChatImage}`
              }
              alt="avatar"
              onError={() =>
                console.error("Invalid current user avatar:", currentChatImage)
              }
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <LogOut />{" "}
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            <div ref={scrollRef} key={uuidv4()}
              className={`message ${message.fromSelf ? "sended" : "received"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};
const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
    background-color: #ffffff39;
    border-radius: 1rem;
    width:0.1rem;
    }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: rgb(180, 173, 173);
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: rgba(255, 255, 255, 0.13);
      }
    }
  }
`;
export default ChatContainer;
