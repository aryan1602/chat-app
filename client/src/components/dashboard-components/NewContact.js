import React, {useContext, useRef} from "react";
import Contacts from "../../contexts/contact-context";
import styles from "./new-contact.module.css";

const NewContact = (props) => {
    

    const emailRef = useRef();
    const nameRef = useRef();
    const { createContact } = useContext(Contacts)

  const clickHandler = () => {
    props.close();
  };

  const submitHandler = e => {
      e.preventDefault()
      console.log(emailRef)
      createContact(emailRef.current.value, nameRef.current.value)
      props.close()
  }



  return (
    <div className={styles["new-contact"]}>
      <form onSubmit={submitHandler}>
        <input required={true} ref={emailRef} type="email" placeholder="Enter contact email" />
        <input ref={nameRef} type="text" placeholder="Name" />
        <button type="submit">Add contact</button>
        <button required={true} onClick={clickHandler} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewContact;
