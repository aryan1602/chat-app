import React, { useContext, useState } from "react";
import Conversations from "../../../contexts/conversation-context";
import styles from "./message-input.module.css";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, selectedConversation } = useContext(Conversations);
  

  const submitHandler = (e) => {
    
    e.preventDefault();
    if(selectedConversation){
    const recepients = selectedConversation.recepients.map(r=>(r.email))
    sendMessage(recepients, message)
      
    setMessage("");
    }else{
        console.log("testing")
    }
  };

  return (
    <div className={styles.test}>
    <form onSubmit={submitHandler} className={styles.message}>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
      />
      <button>SEND</button>
    </form>
    </div>
  );
};

export default MessageInput;
