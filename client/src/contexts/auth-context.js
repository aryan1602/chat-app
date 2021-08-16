import React, {useState, useEffect} from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()


export const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => { //this function returns a method which when called unsubscribes 
            setCurrentUser(user) // the user.
            
            setLoading(false) //this enables to render the children only after the user has been created.
        })

        return unsubscribe
    }, [])

   

    const values = {
        currentUser,
        signup,
        login
    }


    return (
        <AuthContext.Provider value={values}>{!loading && props.children}</AuthContext.Provider>
    )
}

export default AuthContext
