import React from "react";
import ChatHeader from "./active-conversation/ChatHeader";
import ConversationArea from "./active-conversation/ConversationArea";
import MessageInput from "./active-conversation/MessageInput";
import styles from "./chat-area.module.css";


const ChatArea = () => {
  
 


  return (
    <div className={styles['chat-area']}>
      <ChatHeader />
     
       <ConversationArea/>
     
      <MessageInput />
    </div>
  );
};

export default ChatArea;
