import React, { Component } from 'react';
import './CSS/Upload.css';
import Icon from 'react-icons-kit';
import {plus} from 'react-icons-kit/fa/plus'
// import { refGeneralCategory, refGeneralPosts } from './Tools/DataBase.js'

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onChange(e){
      let file = e.target.files;
      console.log(file)
  }

  render() {
    return (
            <div>

                <div className="DivUpload">
                    <label style={{margin:"8px"}}>Upload a CSV File for add Posts to the list of Post.</label>
                    <div className="SelectFile">
                        <label htmlFor="filePost">
                            <div style={{marginRight:"5px", display:"inline-block", verticalAlign:"middle"}}>
                                <Icon size={16} icon={plus}/>
                            </div>
                            <span>Select your file</span>
                        </label>
                        <input type="file" name="filePost" id="filePost" className="inputfile" onChange={(e)=>this.onChange(e)}/>
                    </div>
                </div>

                <div className="DivUpload">
                    <label>Upload a CSV File for add Categorys to the list of Category.</label>
                    <div className="SelectFile">
                        <label htmlFor="fileCate">
                            <div style={{marginRight:"5px", display:"inline-block", verticalAlign:"middle"}}>
                                <Icon size={16} icon={plus}/>
                            </div>
                            <span>Select your file</span>
                        </label>
                        <input type="file" name="fileCate" id="fileCate" className="inputfile" onChange={(e)=>this.onChange(e)}/>
                    </div>
                </div> 

            </div>
    );
  }
}

export default Upload;