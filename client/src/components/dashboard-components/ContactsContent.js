import React, { useContext } from "react";
import Contacts from "../../contexts/contact-context";

const ContactsContent = () => {

    const {contacts} = useContext(Contacts)


  
  return (
    <ul>
      {contacts.map((contact) => {
        return <li key={contact.email}>{contact.Name}</li>;
      })}
    </ul>
  );
};

export default ContactsContent;
