import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import InterfaceBosses from '../Page/InterfaceBosses.js';
import FirstInterface from '../Page/FirstInterface.js';

import PostAndCategory from '../Components/Tools/PostAndCategory.js';
import { refAllUsers } from '../Components/Tools/DataBase.js'

class RoutesID  extends Component {
  constructor(props) {
      super(props);
      this.state = {
        listUsers: []
      };
    }
    componentDidMount(){
      refAllUsers.on("value", (snapshot) => {
          let AllUsers = snapshot.val();
          let listOfUsers = AllUsers.map(val => {return val.UserInfo.Username})
          this.setState({listUsers: listOfUsers})
      });
    }

    render(){
      return(
        this.state.listUsers.map((val, i)=>{
          return <Route exact path={"/interface"+localStorage.getItem("acualInterface")+"/report-of-"+val} render={props =><PostAndCategory {...props} user={i}/>}  key={i}/>
        })
      )
    }

}

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {FirstInterface} />
        <Route exact path="/interface1" component= {InterfaceBosses} />
        <Route exact path="/interface2" component= {InterfaceBosses} />
        <Route exact path="/interface3" component= {InterfaceBosses} />
        <Route exact path="/interface4" component= {InterfaceBosses} />
        <RoutesID/>
      </Switch>
    </BrowserRouter>
  );
