import React, { Component } from 'react';
import '../CSS/Report.css';
import { refGeneralPosts, refAllUsers, refReport } from './DataBase.js'

class PostUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPost: [],
      listUserName: [],
      listUserPost: []
    }
  };

  componentDidMount(){
    refGeneralPosts.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({listPost: posts})
    });
    refAllUsers.on("value", (snapshot) => {
      let users = snapshot.val();
      let listUserName = users.map(val => {return val.UserInfo.Username.charAt(0).toUpperCase() +val.UserInfo.Username.slice(1)})
      this.setState({listUserName: listUserName})
      let listUserPost = users.map(val => {return val.PostAndCategory.Post})
      this.setState({listUserPost: listUserPost})
    });
  }

  render() {
    return (
        <div className="DivPostCategory2">
          <div className="titleList2">
            <li style={{width:"3%", maxWidth:"3%", padding:"0", textAlign:"center"}}>No.</li>
            <li style={{width:"35%", maxWidth:"35%"}}>List of Posts</li>
            {this.state.listUserName.map((val, ind) =>{
              return ( <li key={ind} style={{width:62/(this.state.listUserName.length)+"%", maxWidth:62/(this.state.listUserName.length)+"%", padding:"0", textAlign:"center"}}>{val}</li>)
            })}
          </div>
          {this.state.listPost.map((val, index) =>{
            return (
              <div key={index} className="NCClist2">
                <li style={{width:"3%", maxWidth:"3%", textAlign:"center", padding:"0"}}>{index+1}</li>
                <li style={{width:"35%", maxWidth:"35%"}}>{val}</li>
                {this.state.listUserPost.map((val, ind) =>{
                  if(val[index].category === "Select Category"){
                    return (<li key={ind} style={{width:62/(this.state.listUserName.length)+"%", maxWidth:62/(this.state.listUserName.length)+"%"}}/>)
                  }else{
                    return (<li key={ind} style={{width:62/(this.state.listUserName.length)+"%", maxWidth:62/(this.state.listUserName.length)+"%", fontSize:"0.8rem"}}>{val[index].category}</li>)
                  }
                })}
              </div>
            )
          })}
        </div>
    );
  }
}

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: [],
      statePage: false
    }
  };

  componentDidMount(){
      refReport.on("value", (snapshot) => {
        let report = snapshot.val();
        this.setState({report: report})

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, 0, 4));
        this.setState({dataStr: dataStr})
    });
  }

  render() {
    var buttonState = "See the list of Post that Users have Worked"
    var reportPrint = 
        <div className="DivReport">
          <div className="tittleReport">
              <li style={{width:"20%", maxWidth:"20%"}}>Workers</li>
              <li style={{width:"20%", maxWidth:"20%"}}>Selected</li>
              <li style={{width:"20%", maxWidth:"20%"}}>State</li>
              <li style={{width:"40%", maxWidth:"40%"}}>See Work</li>
          </div>
          {this.state.report.map((val, ind) =>{
          return (
              <div key={ind} className="listReport">
                  <li style={{width:"20%", maxWidth:"20%", textAlign:"left"}}>{val["1-Worker"]}</li>
                  <li style={{width:"20%", maxWidth:"20%"}}>{val["3-Selected"]}</li>
                  <li style={{width:"20%", maxWidth:"20%"}}>{val["4-State"]}</li>
                  <li style={{width:"40%", maxWidth:"40%", textAlign:"left"}}>see Posts of {val["1-Worker"]}</li>
              </div>
          )
          })}
        </div>;
    var pageReport =  reportPrint;
    if(!this.state.statePage){
      buttonState = "See the list of Post that Users have Worked"
      pageReport =  reportPrint;
    }else{
      buttonState = "See the Normal Report"
      pageReport =  <PostUsers />
    }

    return (
      <div style={{height:"100%", width:"100%"}}>
          <div style={{height:"6%", marginBottom:"1%", textAlign:"center"}}>
            <button onClick={()=> this.setState({statePage: !this.state.statePage})} className="buttonChangeS">{buttonState}</button>
            <a href={this.state.dataStr} download={"ReportInterface"+localStorage.getItem("acualInterface")+".json"}><button className="buttonDownload">Download Report</button></a>
          </div>
          {pageReport}
      </div>
    );
  }
}

export default Report;