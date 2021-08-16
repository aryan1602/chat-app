import React, {useState} from 'react'
import ContactsContent from './ContactsContent';
import ConvoContent from './ConvoContent';
import Modal from './Modal';
import NewContact from './NewContact';
import NewConvo from './NewConvo';
import styles from './sidebar.module.css'
import SidebarHeader from './SidebarHeader'




const Sidebar = () => {
    const [isConvoActive, setIsCovoActive] = useState(true);
    const [showContactModal, setShowContactModal] = useState(false)
    const [showConvoModal, setShowConvoModal] = useState(false)

    const contactClickHandler = () =>{
        setShowContactModal(true)
    }

    const convoClickHandler = () => {
       setShowConvoModal(true)
    }

    const closeContactModal = () => {
        setShowContactModal(false)
    }

    const closeConvoModal = () => {
        setShowConvoModal(false)
    }

    


    return (
        <div className={styles.sidebar}>
            <SidebarHeader onChange={setIsCovoActive}/>
            {isConvoActive ? <ConvoContent />: <ContactsContent/>}
            {isConvoActive && <button onClick={convoClickHandler} className={styles.btn}>New Connversation</button>}
            {!isConvoActive && <button onClick={contactClickHandler} className={styles.btn}>Add New Contact</button>}
            {showContactModal && <Modal> <NewContact close={closeContactModal} /> </Modal>}
            {showConvoModal && <Modal><NewConvo close={closeConvoModal} /></Modal>}
        </div>
    )
}

export default Sidebar
