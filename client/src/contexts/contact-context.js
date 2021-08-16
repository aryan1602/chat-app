import React from "react";
import { auth } from "../firebase";
import useLocalStorage from "../Hooks/useLocalStorage";

const Contacts = React.createContext();

export const ContactsProvider = (props) => {
    let user = ""
    if(auth.currentUser){
         user = auth.currentUser.uid
    }
    
const [contacts, setContacts] = useLocalStorage(user+'-contacts', [] )

const createContact = (email, Name) => {
    setContacts((prevValue) =>{
        console.log(prevValue)
        return [...prevValue, {email, Name}]
    })
} 
    





  const values = {
      contacts,
      createContact
  }  


  return <Contacts.Provider value={values}>{props.children}</Contacts.Provider>;
};

export default Contacts;
