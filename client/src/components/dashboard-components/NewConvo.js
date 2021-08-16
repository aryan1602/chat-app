import React, { useContext, useState } from "react";
import Contacts from "../../contexts/contact-context";
import Conversations from "../../contexts/conversation-context";
import styles from "./NewConvo.module.css";

const NewConvo = ({ close }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const { contacts } = useContext(Contacts);
  const { createConversations } = useContext(Conversations)

  const submitHandler = (e) => {
    e.preventDefault();
    createConversations(selectedContacts)
    close();
  };

  const cancelHandler = () => {
    close();
  };

  const handleChange = contactEmail => { //checkbox handler
    setSelectedContacts(prevSelectedContacts => {
      if(prevSelectedContacts.includes(contactEmail)){
        return prevSelectedContacts.filter(prevEmail =>{
          return contactEmail !== prevEmail
        })
      }else{
        return [...prevSelectedContacts, contactEmail]
      }
    })
  }
  

  return (
    <form onSubmit={submitHandler} className={styles.convo}>
      <div className={styles.container}>
        {contacts.map((contact) => (
          <label key={contact.email}>
            <input
              type="checkbox"
              value={selectedContacts.includes(contact.email)}
              onChange={() => handleChange(contact.email)}
            />
            {contact.Name}
          </label>
        ))}
      </div>
      <button type="submit" className={styles.btn}>
        Add
      </button>
      <button type="button" onClick={cancelHandler} className={styles.btn}>
        Cancel
      </button>
    </form>
  );
};

export default NewConvo;
