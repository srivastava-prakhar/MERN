import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPIckerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };
   const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg("");
    }
   }
   const handleInput = ()=>{
    if(showEmojiPicker){
      setShowEmojiPicker(!showEmojiPicker);
    }
   }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPIckerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker">
              <StyledEmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input
        onClick={handleInput}
          type="text"
          placeholder="Start Typing"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #00000076;
  padding: 0.5rem;
  position: relative;
  @media screen and(min-width:720px) and(max-width:1080px){
  padding:0 1 rem;
  gap:1rem;}
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    position: relative;

    .emoji {
      position: relative;
      padding-right:0.5rem;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker {
        position: absolute;
        bottom: 50px; /* Positioned above the input */
        left: 0;
        z-index: 100;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
       
      }
       
    }
  }

  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    border-radius: 2rem;
    padding: 0.5rem;

    input {
      width: 100%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9186f3;
      }

      &:focus {
        outline: none;
      }
    }

    .submit {
      padding: 0.5rem 1.5rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      @media screen and(min-width:720px) and(max-width:1080px){
      padding:0.3rem 1rem;
      svg{
      font-size:1rem;
      }
      }
      &:hover {
        background-color: #7a68e3;
      }

      svg {
        font-size: 1.8rem;
        color: white;
      }
    }
  }
`;
const StyledEmojiPicker = styled(Picker)`
  background-color: #080420 !important;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.2);

  .epr-search-container {
    background-color: #0d0630 !important; /* Darken search bar */
    border: none;
  }

  .epr-body {
    background-color: #080420 !important; /* Background of emoji grid */
  }

  .epr-emoji-category-label {
    background-color: #0d0630 !important; /* Category headers */
    color: white;
  }

  .epr-emoji-list {
    background-color: #080420 !important; /* Background of emoji list */
  }

  .epr-emoji {
    background-color: #080420 !important; /* Emoji buttons */
  }

  .epr-header {
    background-color: #080420 !important; /* Header where tabs are */
    border-bottom: 1px solid #161032;
  }

  .epr-footer {
    background-color: #080420 !important; /* Footer area */
  }

  .epr-input {
    background-color: #0d0630 !important; /* Search bar */
    color: white;
    border: none;
  }
`;
export default ChatInput;
