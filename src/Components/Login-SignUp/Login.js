import React, { Component } from 'react';
import './Login.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

class LogIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            allUsers: this.props.allUsers,
            listUsers: this.props.listUsers,
            divErr: "",
          };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.user.length === 0 && this.state.password.length === 0){
            this.setState({divErr: <div style={{color: "red"}}>Write your Boss ID and your password*</div> })
        }else{
            if(this.state.user.length !== 0){
                if(!this.state.listUsers.includes(this.state.user.toLowerCase())){
                    this.setState({divErr: <div style={{color: "red"}}>Your Boss ID doesn't exist*</div> })
                }else{
                    if(this.state.password.length === 0){
                        this.setState({divErr: <div style={{color: "red"}}>Enter your password*</div> })
                    }else if(this.state.allUsers[this.state.numberForPassowrd].Password !== this.state.password){
                        this.setState({divErr: <div style={{color: "red"}}>Your password doesn't match*</div> })
                    }else{
                        this.setState({BossId: this.state.user.toLowerCase()});
                        this.setState({BossPassword: this.state.password});
                        window.location.reload();
                    };
                };
            }else{
                this.setState({divErr: <div style={{color: "red"}}>Enter your Boss ID*</div> })
            }
        };
    };
    
    handleChangeUser(e) {
        this.setState({ user: e.target.value.toLowerCase() });
        if(!this.state.listUsers.includes(e.target.value.toLowerCase())){
            this.setState({divErr: <div style={{color: "red"}}>Your Boss ID is incorrect*</div> })
        }else{
            this.setState({divErr: <div style={{color: "green"}}>Your Boss ID is correct</div> })
            this.setState({ user: e.target.value.toLowerCase() });
            this.setState({ numberForPassowrd: this.state.listUsers.indexOf(e.target.value.toLowerCase())});
        }
      };
      handleChangePassword(e) {
        this.setState({ password: e.target.value });
        if(this.state.listUsers.includes(this.state.user)){
            if(this.state.allUsers[this.state.numberForPassowrd].Password !== e.target.value){
                this.setState({divErr: <div style={{color: "red"}}>Your password is incorrect*</div> })
            }else{
                this.setState({divErr: <div style={{color: "green"}}>Your Password is correct</div> })
                this.setState({ password: e.target.value });
            };
        };
    };

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem("BossId", nextState.BossId);
        localStorage.setItem("BossPassword", nextState.BossPassword)
    }

    render(){
        var divStatus = <div style={{display: "inline-block", float: "right"}}>{this.state.divErr}</div>;
        var workerId = this.state.user.toLowerCase();
        var passwordId = this.state.password;
        if(this.state.listUsers.includes(workerId)){
            var number = this.state.listUsers.indexOf(workerId)
            if (this.state.allUsers[number].Password === passwordId){
                divStatus = <div style={{display: "inline-block", float: "right"}}><div style={{color: "green"}}>Welcome {workerId}</div></div>
            }
        };
        return (
            <div className="DivLogin">
                <Form>

                    <FormGroup>
                        <Label for="exampleUser">Boss ID</Label>
                        <Input 
                        onChange={this.handleChangeUser}  
                        type="BossId" 
                        name="BossId" 
                        id="exampleUser" 
                        placeholder="Write your Boss ID"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                        onChange={this.handleChangePassword}  
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="Write your password"
                        />
                    </FormGroup>   
                         
                </Form>
                <Button color="success" onClick={this.handleClick}>Start</Button>
                {divStatus}
            </div> 
        );
    }
}

export default LogIn;