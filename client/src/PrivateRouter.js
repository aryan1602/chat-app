import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from './contexts/auth-context'

const PrivateRouter = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(AuthContext)

    return (
        <Route
        {...rest}
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}

        />
    )
}

export default PrivateRouter
