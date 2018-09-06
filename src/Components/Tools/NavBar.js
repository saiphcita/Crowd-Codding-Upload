import React, { Component } from 'react';
import '../CSS/NavBar.css';
import {refAllUsers} from './DataBase.js'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workerName: ""
    };
  }

  componentDidMount(){
    refAllUsers.on("value", (snapshot) => {
        let AllUsers = snapshot.val();
        let listOfUsers = AllUsers.map(val => {return val.UserInfo.Username})
        this.setState({workerName: listOfUsers[this.props.numberUser].charAt(0).toUpperCase() + listOfUsers[this.props.numberUser].slice(1)})
    });
  }

  logOut(){
    localStorage.setItem("workerId", undefined);
    localStorage.setItem("workerPassword", undefined)
    window.location.reload();
  }

  render(){
    return (
        <div className="NavStyle">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divWorkerName">{this.state.workerName}</div>
            <button onClick={this.logOut}>Log Out</button>  
          </header>
        </div>
    );
  }
};

export default NavBar;