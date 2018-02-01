import * as React from "react";

import UserList from "./components/userList/UserList";
import "./App.css";

const logo = require("./logo.jpg");

export default class App extends React.Component {    
    render() {        
        return (
            <div className="App">
                <div className="App__header">
                    <img src={logo} />
                    Nord Software
                </div>
                <UserList />
            </div>
        );
    }
}