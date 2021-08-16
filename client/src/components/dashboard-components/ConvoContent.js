import React, { useContext } from "react";
import Conversations from "../../contexts/conversation-context";
import styles from './convo-content.module.css'

const ConvoContent = () => {
  const { conversations, setSelectedConvo} = useContext(Conversations);
  

  return (
    <ul>
      {conversations.map((conversation, index) => {
        return (
          <li onClick = {() => setSelectedConvo(index)} className={conversation.selected && styles.selected } key={index}>
            {conversation.recepients.map(receipent => receipent.name).join(', ')}
          </li>
        );
      })}
    </ul>
  );
};

export default ConvoContent;
