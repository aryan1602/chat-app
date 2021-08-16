import React, { useContext, useCallback } from "react";
import Conversations from "../../../contexts/conversation-context";
import styles from "./conversation-area.module.css";

const ConversationArea = () => {
  const { selectedConversation } = useContext(Conversations);
  const setRef = useCallback(Node => {
    if(Node){
      Node.scrollIntoView()
    }
  },[])

  if (selectedConversation) {
    return (
      <div className={styles.convo}>
        {selectedConversation.messages.map((m, index) => {
          
          return (
           
              <div key={index}
                ref = {index === selectedConversation.messages.length - 1 ? setRef:null}
                align={m.fromMe ? "right" : "left"}
                className={styles.container}
              >
                <div
                  className={m.fromMe ? styles["from-me"] : styles["not-me"]}
                >
                  <p>{m.text}</p>
                </div>
              </div>
            
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles["noConvo"]}>
      <p>Create a new Conversation to start texting</p>
    </div>
  );
};

export default ConversationArea;
