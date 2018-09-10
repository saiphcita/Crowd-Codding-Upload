import React, { Component } from 'react';
import './CSS/Choose-Interface.css';

class ChooseInterface  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acualInterface: "0"
        };
    }

    componentWillMount(){
        localStorage.getItem("acualInterface") && this.setState({acualInterface: localStorage.getItem("acualInterface")})
    };

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem("acualInterface", nextState.acualInterface)
    }

    render(){   
        return (
            <div style={{textAlign:"center", paddingTop:"32px"}}>
                <h3>Choose the interface you'll manage.</h3>
                <div className="DivAllButtons">
                    <button onClick={() => {this.setState({acualInterface: 1}); window.location.href="/interface1";}}>Interface 1</button>  
                    <button onClick={() => {this.setState({acualInterface: 2}); window.location.href="/interface2";}}>Interface 2</button>  
                    <button onClick={() => {this.setState({acualInterface: 3}); window.location.href="/interface3";}}>Interface 3</button>  
                    <button onClick={() => {this.setState({acualInterface: 4}); window.location.href="/interface4";}}>Interface 4</button>  
                </div>
            </div>
        );
    }
}

export default ChooseInterface;