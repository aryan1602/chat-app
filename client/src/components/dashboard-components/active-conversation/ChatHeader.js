import React from 'react'
import { auth } from '../../../firebase'
import styles from './chat-header.module.css'


const ChatHeader = () => {

    const logoutClickHandler = () => {
       auth.signOut()
        
    }


    return (
        <div className={styles['chat-header']}>
           <button onClick={logoutClickHandler}>Logout</button>
        </div>
    )
}

export default ChatHeader
