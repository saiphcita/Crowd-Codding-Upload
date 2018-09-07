import React, { Component } from 'react';
import '../CSS/PostAndCategory.css';
import { Link } from 'react-router-dom';
import { dbUser } from './DataBase.js'

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
  }

  logOut(){
    localStorage.setItem("BossId", undefined);
    localStorage.setItem("BossPassword", undefined)
    localStorage.setItem("acualInterface", "0");
    window.location.reload();
}


  render(){
    return (
        <div className="NavBoss">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divBossrName">{this.state.BossId}</div>
            <Link to="/"><button onClick={this.logOut}>Log Out</button></Link>
            <Link to={"/interface"+ localStorage.getItem("acualInterface")}><button>Go Back</button></Link>
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
      wokerId: ""
    }
  };

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.user+"/PostAndCategory/Post");    
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
    });
    const refUser = dbUser.ref("Users/"+this.props.user+"/UserInfo/Username");
    refUser.on("value", (snapshot) => {
      let name = snapshot.val();
      name = name.charAt(0).toUpperCase()+name.slice(1)
      this.setState({wokerId : name})
    });  
  }

  render() {
    return (
      <div style={{height:"100%"}}>
        <div className="NavWorker">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divWorkerN">The Categorized Post of {this.state.wokerId}</div>
          </header>
        </div>
        <div className="DivPostCategory">
          <div className="titleList">
            <li style={{width:"4%", maxWidth:"4%"}}>No.</li>
            <li style={{width:"80%", maxWidth:"80%", textAlign:"left", paddingLeft:"8px"}}>Post</li>
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
      post: [],
    }
  };

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/0/PostAndCategory/Post");    
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
    });
  };

  render() {
    return (
      <div style={{width:"100%", height:"100%"}}>
        <div style={{width:"100%", height:"8%"}}>
          <NavBarBoss/>
        </div>
        <div style={{width:"100%", height:"92%"}}>
          <ListPostCategory user={this.props.user}/>
        </div>
      </div>
    );
  }
}

export default PostAndCategory;