import React, { Component } from 'react';
import '../CSS/PostAndCategory.css';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { dbUser, refAllUsers } from './DataBase.js'

class SelectForWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      listUserName: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    refAllUsers.on("value", (snapshot) => {
      let users = snapshot.val();
      let listUserName = users.map(val => {return val.UserInfo.Username})
      this.setState({listUserName: listUserName})
    });
  };  

  render() {
    var dropDownS = {
      backgroundColor: "#fff",
      height: "auto",
      width: "auto",
      border: "none",
      borderRadius: "6px",
      padding: "0",
    };
    return (
      <div>
          <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="buttonDropWorker">
            <DropdownToggle caret>
              {this.props.wokerId}
            </DropdownToggle>
            <DropdownMenu style={dropDownS}>
              {
                this.state.listUserName.map((val, ind) => {
                  var url = "/interface"+localStorage.getItem("acualInterface")+"/report-of-"+val;
                  if(val === this.props.wokerId.toLowerCase()){
                    return(
                      <DropdownItem key={ind} disabled style={{padding:"5px 12px"}}>
                        {val}
                      </DropdownItem>
                    )
                  }else{
                    return(
                      <DropdownItem key={ind} style={{color:"black", backgroundColor:"white", padding:"5px 12px", borderRadius:"0"}}>
                        <Link to={url}>{val}</Link>
                      </DropdownItem>
                    )
                  }
                })
              }
            </DropdownMenu>
          </ButtonDropdown>
      </div>
    );
  }
}

class NavBarBoss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BossId: ""
    };
  }

  componentDidMount(){
    var bossId = localStorage.getItem("BossId")
    this.setState({BossId: bossId.charAt(0).toUpperCase() +bossId.slice(1)})
  };

  logOut(){
    localStorage.setItem("BossId", undefined);
    localStorage.setItem("BossPassword", undefined)
    localStorage.setItem("acualInterface", "0");
    window.location.reload();
  };

  render(){
    return (
        <div className="NavBoss">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divBossrName">{this.state.BossId}</div>
            <div className="divBossrName">- Interface {localStorage.getItem("acualInterface")}</div>
            <Link to="/"><button className="buttonNavBoss" onClick={this.logOut}>Log Out</button></Link>
            <Link to={"/interface"+ localStorage.getItem("acualInterface")}><button className="buttonNavBoss">Go Back</button></Link>
            <SelectForWorker wokerId={this.props.wokerId}/>
          </header>
        </div>
    );
  }
};

class ListPostCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      code: "",
      timeWork: "",
    }
  };

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.user+"/PostAndCategory/Post");    
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
    });
    const refUserworkerCode = dbUser.ref("Report/"+this.props.user+"/5-WorkCode")
    refUserworkerCode.on("value", (snapshot) => {
      let code  = snapshot.val();
      this.setState({code : code})
    });
    const refUserTime = dbUser.ref("Report/"+this.props.user+"/6-TimeWork")
    refUserTime.on("value", (snapshot) => {
      let time  = snapshot.val();
      this.setState({timeWork : time})
    });
  }

  render() {
    return (
      <div style={{height:"100%"}}>
        <div className="NavWorker">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divWorkerN">The Categorized Posts of {this.props.wokerId}</div>
            <div className="divWorkerN" style={{color:"black"}}>Time Worked: {this.state.timeWork}</div>
            <div style={{float:"right", padding:"2px", marginRight:"4%"}}>Work-Code: {this.state.code}</div>
          </header>
        </div>
        <div className="DivPostCategory">
          <div className="titleList">
            <li style={{width:"4%", maxWidth:"4%"}}>No.</li>
            <li style={{width:"80%", maxWidth:"80%", textAlign:"left", paddingLeft:"8px"}}>Posts</li>
            <li style={{width:"16%", maxWidth:"16%"}}>Category</li>
          </div>
          {this.state.post.map((val, ind) =>{
            var category = <li style={{width:"16%", maxWidth:"16%"}}>{val.category}</li>
            if(val.category === "Select Category"){
              category = <li style={{width:"16%", maxWidth:"16%", textAlign:"left", paddingLeft:"8px"}}>Unselected</li>
            }else{
              category = <li style={{width:"16%", maxWidth:"16%"}}>{val.category}</li>
            }
            return (
              <div key={ind} className="NCClist">
                <li style={{width:"4%", maxWidth:"4%"}}>{ind+1}</li>
                <li style={{width:"80%", maxWidth:"80%", textAlign:"left", paddingLeft:"8px"}}>{val.post}</li>
                {category}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wokerId: ""
    };
  };

  componentDidMount() {
    const refUser = dbUser.ref("Users/"+this.props.user+"/UserInfo/Username");
    refUser.on("value", (snapshot) => {
      let name = snapshot.val();
      name = name.charAt(0).toUpperCase()+name.slice(1)
      this.setState({wokerId : name})
    });  
  }

  render() {
    return (
      <div style={{width:"100%", height:"100%"}}>
        <div style={{width:"100%", height:"8%"}}>
          <NavBarBoss wokerId={this.state.wokerId}/>
        </div>
        <div style={{width:"100%", height:"92%"}}>
          <ListPostCategory user={this.props.user} wokerId={this.state.wokerId}/>
        </div>
      </div>
    );
  }
}

export default PostAndCategory;