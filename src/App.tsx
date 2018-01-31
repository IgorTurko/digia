import * as React from "react";

import UserList from "./components/userList/UserList";

import "./App.css";

export default class App extends React.Component {    
    render() {        
        return (
            <div className="App">
                <UserList />
            </div>
        );
    }
}