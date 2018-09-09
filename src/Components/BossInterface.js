import React, { Component } from 'react';
import './CSS/BossInterface.css';
import UploadPost from "./Tools/UploadPost.js"
// import UploadCategory from "./Tools/UploadCategory.js"
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
                    <button onClick={()=> this.setState({statePage: 3})} className="divAdmin" style={{marginLeft:"1%"}}>Manage the CATEGORIES of the Interface {localStorage.getItem("acualInterface")}</button>
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

        //Para administrar
        var uploadPost =
        <div style={{height:"92%"}}>
            {goBack}
            <div style={{height:"91.5%"}}><UploadPost/></div>
        </div>;

        var uploadCategory =
            <div style={{height:"92%"}}>
                {goBack}
                <div style={{height:"91.5%"}}> In Progress </div>
            </div>;

        var page = buttons

        if(this.state.statePage === 0){
            page = buttons
        }else if(this.state.statePage === 1){
            page = reporte
        }else if(this.state.statePage === 2){
            page = uploadPost
        }else if(this.state.statePage === 3){
            page = uploadCategory
        }

        return (page);
    }
}

export default BossInterface;