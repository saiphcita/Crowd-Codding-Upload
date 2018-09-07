import React, { Component } from 'react';
import './CSS/BossInterface.css';
import Upload from "./Tools/Upload.js"
import Report from "./Tools/Report.js"


class BossInterface extends Component {
    constructor(props) {
      super(props);
      this.state = {
        statePage: 0
      }
    };
    
    render() {
        //el inicio
        var buttons = 
            <div className="buttonsDivBoss">
                <div>
                    <button onClick={()=> this.setState({statePage: 1})} className="divSeeReport">See the Workers' Report</button>
                </div>
                <div>
                    <button onClick={()=> this.setState({statePage: 2})} className="divAdmin" style={{marginRight:"1%"}}>Manage the POSTS of the Interface {localStorage.getItem("acualInterface")}</button>
                    <button onClick={()=> this.setState({statePage: 0})} className="divAdmin" style={{marginLeft:"1%"}}>Manage the CATEGORIES of the Interface {localStorage.getItem("acualInterface")}</button>
                </div>
            </div>;

        //volver atras
        var goBack = 
            <div style={{height:"6%", width:"100%", marginBottom:"1%"}}>
                <button onClick={()=> this.setState({statePage: 0})} className="divGoBack">Go back</button>
            </div>;

        //para ver el reporte
        var reporte =
        <div style={{height:"92%"}}>
            {goBack}
            <div style={{height:"91.5%"}}><Report/></div>
        </div>;

        //el de administrar
        var administrar =
        <div style={{height:"92%"}}>
            {goBack}
            <div style={{height:"91.5%"}}><Upload/></div>
        </div>;

        var page = buttons

        if(this.state.statePage === 0){
            page = buttons
        }else if(this.state.statePage === 1){
            page = reporte
        }else if(this.state.statePage === 2){
            page = administrar
        }

        return (page);
    }
}

export default BossInterface;