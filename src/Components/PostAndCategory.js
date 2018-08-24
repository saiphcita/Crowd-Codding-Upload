import React, { Component } from 'react';
import './CSS/PostAndCategory.css';
import ModalExample  from './Tools/modal.js'
import { dbUser, refAllUsers } from './Tools/DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      value: [],
      category: [],
      listUsers: [],
    };
  }

  componentDidMount() {
    var refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
    var refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      this.setState({value: posts.map(val => {return val.category})})
    });
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      this.setState({listUsers: AllUsers})

      let PostOfUser = AllUsers.map( val => val.User.PostAndCategory.Post)
      this.setState({PostOfUser: PostOfUser})
    });
  }

  render() {
    return (
      <div className="DivPostCategory">
        {/* SECCION DEL NUMERO DE POSTS*/}
        <ul className="listNumberPost" style={{width: this.state.widthPost }}>
          <li className="tittleListPC" style={{padding:"8px 5px 8px 3px"}}>No.</li>
            {this.state.post.map((val, i) => {
              return <li key={i}>{i+1}</li>
            })}
        </ul>
        {/* SECCION DE LOS POSTS*/}
        <ul className="listPost" style={{width: this.state.widthPost }}>
          <li className="tittleListPC">Post</li>
            {this.state.post.map((val, i) => {
            if(val.post.length > 145){
              return(
                <li key={i}>
                  {val.post.substring(0,145)}... 
                  <ModalExample post={val.post} ind={i+1} styleB="buttonShow"/>
                </li>)
            }else{
              return(
              <li key={i}>
                {val.post}
              </li>)
            }
          })}
        </ul>
      </div>
    );
  }
}

export default PostAndCategory;