import React, { Component } from 'react';
import './CSS/Start-interface.css';
import { refBosses } from './Tools/DataBase.js'
import LogIn  from './Login-SignUp/Login.js'
import SignUp  from './Login-SignUp/SignUp.js'


class StartInterface  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1: "#3C3B47",
            color2: "#3C3B47",
            StatePage: <div className="divStatePage"><h2>Create a Boss ID to enter the Boss page and if you already have it, you can login.</h2></div>,
            listOfBosses: [],
            pageTimeLoad: false,
        };
      }

    componentDidMount(){
        refBosses.on("value", (snapshot) => {
            let Bosses = snapshot.val();
            let listOfBosses = Bosses.map(val => {return val.BossId})
            this.setState({Bosses : Bosses})
            this.setState({listOfBosses: listOfBosses})
        });
        setTimeout(()=> {
            this.setState({pageTimeLoad: true})
        }, 700)
    }

    
    ChangeToLogin(){
        setTimeout(()=> {
            this.setState({color1: "#3BC079"});
            this.setState({color2: "#3C3B47"});
            this.setState({StatePage: <LogIn allUsers={this.state.Bosses} listUsers={this.state.listOfBosses}/>});
        }, 700)
    }

    ChangeToSingUp(){
        setTimeout(()=> {
            this.setState({color2: "#3BC079"});
            this.setState({color1: "#3C3B47"});
            this.setState({StatePage:<SignUp allUsers={this.state.Bosses} listUsers={this.state.listOfBosses}/>});
        }, 700)
    }

    render(){
        var pageLoad = <div style={{color: "white"}}>loading...</div>

        if(this.state.pageTimeLoad){
            pageLoad = <div>
                            <div 
                            style={{background: this.state.color1}} 
                            className="DivButton" 
                            onClick={()=>this.ChangeToLogin()}>
                                Log In
                            </div>
                            <div
                            style={{background: this.state.color2, margin: "0 0 0 6px"}} 
                            className="DivButton" 
                            onClick={()=>this.ChangeToSingUp()}>
                                Sign Up
                            </div>
                        </div>
        }else{
            pageLoad = <div style={{color: "white"}}>loading...</div>
        }

        return (
            <div className="DivBase ">
                <h3>Welcome to BossPage</h3>
                <div className="DivForm">
                    {pageLoad}
                    {this.state.StatePage}
                </div>
            </div>
        );
    }
}

export default StartInterface;