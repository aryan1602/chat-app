import React, {useState} from 'react'
import styles from './sidebar-header.module.css'


const SidebarHeader = (props) => {
    const [isConvoActive, setIsCovoActive] = useState(true);

    const clickHandler = () => {
        setIsCovoActive(prevState => {
            props.onChange(!isConvoActive)
            return !isConvoActive
        })
    }
    


    return (
        <div className={styles['sidebar-header']}>
            <button disabled={isConvoActive} onClick={clickHandler} className={isConvoActive ? styles.active : styles.inactive}>
            Conversations
            </button>
            <button disabled={!isConvoActive} onClick={clickHandler} className={!isConvoActive ? styles.active : styles.inactive}>
            Contacts
            </button>

            
        </div>
    )
}

export default SidebarHeader
