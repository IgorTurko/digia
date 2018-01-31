import * as React from "react";

import { UserList } from "./userList/UserList";

import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <UserList />
            </div>
        );
    }
}

export default App;
