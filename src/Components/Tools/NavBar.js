import React, { Component } from 'react';
import '../CSS/NavBar.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BossId: ""
    };
  }

  componentWillMount(){
    localStorage.getItem("BossId") && this.setState({BossId: localStorage.getItem("BossId").charAt(0).toUpperCase() + localStorage.getItem("BossId").slice(1)});
  };

  logOut(){
    localStorage.setItem("BossId", undefined);
    localStorage.setItem("BossPassword", undefined)
    localStorage.setItem("acualInterface", "0");
    window.location.reload();
  };

  ChangeInt(){
    localStorage.setItem("acualInterface", "0") ;
  };

  render(){
    return (
        <div className="NavStyle">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divBossid">{this.state.BossId}</div>
            <div className="divBossid">- Interface {localStorage.getItem("acualInterface")}</div>
            <Link to="/"><button onClick={this.logOut}>Log Out</button></Link>
            <Link to="/"><button onClick={this.ChangeInt}>Change Interface</button></Link>
          </header>
        </div>
    );
  }
};

export default NavBar;