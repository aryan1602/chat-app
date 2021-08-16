import "./App.css";
import React from "react";
import { AuthContextProvider } from "./contexts/auth-context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import PrivateRouter from "./PrivateRouter";
import { ContactsProvider } from "./contexts/contact-context";
import { ConversationsProvider } from "./contexts/conversation-context";
import { SocketProvider } from "./contexts/socket-context";


const App = () => {
  return (
    <div className="app">
      <Router>
        
          <AuthContextProvider>
          <SocketProvider>
            <ContactsProvider>
              <ConversationsProvider>
                <Switch>
                  <PrivateRouter exact path="/" component={Dashboard} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
                </Switch>
              </ConversationsProvider>
            </ContactsProvider>
            </SocketProvider>
          </AuthContextProvider>
        
      </Router>
    </div>
  );
};

export default App;
