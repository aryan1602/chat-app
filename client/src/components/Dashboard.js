import React from 'react'
import ChatArea from './dashboard-components/ChatArea'
import styles from './dashboard.module.css'
import Sidebar from './dashboard-components/Sidebar'




const Dashboard = () => {
    
   

    return (
        <div className={styles.dashboard}>
            <Sidebar />
            <ChatArea />
        </div>
    )
}

export default Dashboard
