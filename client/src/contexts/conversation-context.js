import React, { useContext, useState, useEffect, useCallback } from "react";
import { auth } from "../firebase";
import useLocalStorage from "../Hooks/useLocalStorage";
import Contacts from "./contact-context";
import SocketContext from "./socket-context";

const Conversations = React.createContext();

export const ConversationsProvider = (props) => {
  let user = "";
  if (auth.currentUser) {
    user = auth.currentUser.uid;
  }

  const [conversations, setConversations] = useLocalStorage(
    user + "-coversations",
    []
  );
  const { contacts } = useContext(Contacts);
  const socket = useContext(SocketContext)
  const [selectedConvo, setSelectedConvo] = useState(0);

  const createConversations = (recepients) => {
    //recepients - selectedContacts while creating new convo
    setConversations((prevValue) => {
      return [...prevValue, { recepients, messages: [] }]; // empty message when new convo created
    });
  };

  //getting the names along with email id

  const formattedConversations = conversations.map((conversation, index) => {
    const recepients = conversation.recepients.map((recipent) => {
      const contact = contacts.find((contact) => {
        return contact.email === recipent;
      });
      const name = (contact && contact.Name) || recipent;
      return { email: recipent, name };
    });

    const messages = conversation.messages.map(message=>{
      const contact = contacts.find((contact) => {
        return contact.email === message.sender;
      });
      const name = (contact && contact.Name) || message.sender;
      const fromMe = message.sender === auth.currentUser.email
      return {...message,senderName:name, fromMe };
    });
   
    const selected = selectedConvo === index;
    return { ...conversation,messages, recepients, selected };
  });

 

  const addMessage = useCallback(({recepients, text, sender}) => {
    setConversations((prevConversations) => {
      let convoExists = false;
      const newMessage = { text, sender };
      const newConversations = conversations.map((conversation) => {
        if (isArrayEqual(recepients, conversation.recepients)) {
          convoExists = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            //here spread operator adds the previous coversation and overwrites the conversation.messages
          };
        } else {
          return conversation;
        }
      });

      if (convoExists) {
        return newConversations;
      } else {
        return [
          ...prevConversations,
          {
            recepients,
            messages: [newMessage],
          },
        ];
      }
    });
  }, [setConversations, conversations]);

  useEffect(() => {
    if(socket == null) return
    socket.on('receive-message', addMessage)

    return () => socket.off('receive-message')
  },[socket, addMessage])




  const sendMessage = (recepients, text) => {
    socket.emit('send-message', {recepients, text})

    addMessage({ recepients, text, sender: auth.currentUser.email });
  };

  const values = {
    conversations: formattedConversations,
    createConversations,
    setSelectedConvo,
    selectedConversation: formattedConversations[selectedConvo],
    sendMessage,
  };

  return (
    <Conversations.Provider value={values}>
      {props.children}
    </Conversations.Provider>
  );
};

export default Conversations;

const isArrayEqual = (array1, array2) => {
  array1.sort();
  array2.sort();

  return array1.every((element, index) => {
    return array2[index] === element;
  });
};
