import React, { Component } from 'react';
import '../CSS/ListPost.css';

class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  render() {
    return (
        <div className="DivPostCategory">
          <div className="titleList">
            <li style={{width:"4%", maxWidth:"4%"}}>No.</li>
            <li style={{width:"96%", maxWidth:"96%"}}>Post</li>
          </div>
          {this.props.arrayP.map((val, ind) =>{
            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"4%", maxWidth:"4%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val} style={{width:"96%", maxWidth:"96%"}}>{val}</li>
              </div>
            )
          })}
        </div>
    );
  }
}

export default ListPost;