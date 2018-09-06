import React, { Component } from 'react';
import './SignUp.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { refBosses } from '../Tools/DataBase.js'

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            confirmPassword: "",
            replyErr: null,
            allUsers: this.props.allUsers,
            listUsers: this.props.listUsers
          };

          this.handleChangeUser = this.handleChangeUser.bind(this);
          this.handleChangePassword = this.handleChangePassword.bind(this);
          this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.user.length === 0 || this.state.password.length === 0 || this.state.confirmPassword.length === 0){
            this.setState({replyErr: "You must fill all the fields*"})
        }else{
            if(this.state.listUsers.includes(this.state.user.toLowerCase())){
                this.setState({replyErr: "This Boss ID already exists*"})
            }else{
                if(this.state.password !== this.state.confirmPassword){
                    this.setState({replyErr: "Your password doesn't match*"})
                }else{
                    var usuarios = this.state.allUsers
                    var NewUser = {
                        "BossId": this.state.user.toLowerCase(),
                        "Password": this.state.password
                    }
                    usuarios.push(NewUser)
                    this.setState({allUsers: usuarios})
                    this.setState({listUsers: this.state.allUsers.map(val => {return val.BossId})})
                    //save the new user
                    refBosses.set(this.state.allUsers)
                    this.setState({BossId: this.state.user})
                    this.setState({BossPassword: this.state.password});
                    window.location.reload();
                }
            }
        }
    };
    
    handleChangeUser(e) {
        this.setState({ user: e.target.value.toLowerCase()});
        if(e.target.value.length !== 0){
            if(this.state.listUsers.includes(e.target.value.toLowerCase())){
                this.setState({replyErr: "This Boss ID already exists*"})
            }else{
                this.setState({replyErr: <div style={{color: "green"}}>Your Boss ID is correct.</div>})
            }
        }else{
            this.setState({replyErr: "Write your new Boss ID"})
        }
      };

    handleChangePassword(e) {
        this.setState({replyErr: ""})
        this.setState({ password: e.target.value });
    };

    handleChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
        if(this.state.password !== e.target.value){
            this.setState({replyErr: "Your password doesn't match*"})
        }else{
            this.setState({replyErr: <div style={{color: "green"}}>Your Password is correct.</div>})
            this.setState({ confirmPassword: e.target.value });
        }
    };

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem("BossId", nextState.BossId);
        localStorage.setItem("BossPassword", nextState.BossPassword)
    }

    render(){
        var divStatus = <div className="replyErr">{this.state.replyErr}</div>;
        var workerId = this.state.user;
        var passwordId = this.state.password;
        var confirmPasswordId = this.state.confirmPassword;
        if(workerId.length !== 0){
            if(!this.state.listUsers.includes(workerId)){
                if(passwordId.length !== 0 || confirmPasswordId.length !== 0){
                    if (confirmPasswordId === passwordId){
                        divStatus = <div className="replyErr"><div style={{color: "green"}}>Your Boss Id and your Password are correct</div></div>
                    }
                }
            }
        };

        return (
            <div className="DivSignup">
                <Form >
                    <FormGroup>
                        <Label for="exampleUser">New Boss ID</Label>
                        <Input
                        onChange={this.handleChangeUser} 
                        type="Boss ID" 
                        name="Boss ID" 
                        id="newUser" 
                        placeholder="Write your Boss ID"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">New Password</Label>
                        <Input
                        onChange={this.handleChangePassword} 
                        type="password" 
                        name="password" 
                        id="newPassword" 
                        placeholder="Write a password"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Confirm Password</Label>
                        <Input
                        onChange={this.handleChangeConfirmPassword}
                        type="password" 
                        name="password" 
                        id="confirmPassword" 
                        placeholder="Write again a password"
                        />
                    </FormGroup> 

                </Form>
                <Button style={{float: "right"}} color="success" onClick={this.handleClick}>Submit</Button>
                {divStatus}
            </div> 
        );
    };
};

export default SignUp;