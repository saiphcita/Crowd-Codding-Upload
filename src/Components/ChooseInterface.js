import React, { Component } from 'react';
import './CSS/Choose-Interface.css';
import { Link } from 'react-router-dom';

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
        var goButton = <div/>
        if(this.state.acualInterface !== "0"){
            goButton = <Link to={"/interface"+this.state.acualInterface}><button className="Gobutton">Go Interface {this.state.acualInterface}</button></Link>
        }
        return (
            <div style={{textAlign:"center", paddingTop:"16px"}}>
                <h3>Choose the interface you manage.</h3>
                <div className="DivAllButtons">
                    <button onClick={() => {this.setState({acualInterface: 1}); window.location.reload();}}>Interface 1</button>  
                    <button onClick={() => {this.setState({acualInterface: 2}); window.location.reload();}}>Interface 2</button>  
                    <button onClick={() => {this.setState({acualInterface: 3}); window.location.reload();}}>Interface 3</button>  
                    <button onClick={() => {this.setState({acualInterface: 4}); window.location.reload();}}>Interface 4</button>  
                </div>
                {goButton} 
            </div>
        );
    }
}

export default ChooseInterface;