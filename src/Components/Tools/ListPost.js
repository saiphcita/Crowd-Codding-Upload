import React, { Component } from 'react';
import '../CSS/ListPost.css';
import ModalExample  from './modal.js'

class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="DivPostCategory">
        {/* SECCION DEL NUMERO DE POSTS*/}
        <ul className="listNumberPost" >
          <li className="tittleListPC" style={{padding:"8px 5px 8px 3px"}}>No.</li>
            {this.props.arrayP.map((val, i) => {
              return <li key={i}>{i+1}</li>
            })}
        </ul>
        {/* SECCION DE LOS POSTS*/}
        <ul className="listPost">
          <li className="tittleListPC">Post</li>
            {this.props.arrayP.map((val, i) => {
            if(val.length > 125){
              return(
                <li key={i}>
                  {val.substring(0,125)}... 
                  <ModalExample post={val} ind={i+1} styleB="buttonShow"/>
                </li>)
            }else{
              return(
              <li key={i}>
                {val}
              </li>)
            }
          })}
        </ul>
      </div>
    );
  }
}

export default ListPost;