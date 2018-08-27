import React, { Component } from 'react';
import './CSS/Upload.css';
import Icon from 'react-icons-kit';
import {plus} from 'react-icons-kit/fa/plus'
// import { refGeneralCategory, refGeneralPosts } from './Tools/DataBase.js'
import ListPost  from './Tools/ListPost.js'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hola:[]
        };
    }

    convertFile(e){
        const input = document.getElementById('filePost');
        const reader = new FileReader();

        reader.onload = () => {
            let text = reader.result;
            let allTextLines = text.split(/\r|\n|\r/);
            let headers = allTextLines[0].split(',');
            let lines = [];

            for (let i = 0; i < allTextLines.length; i++) {
                let data = allTextLines[i].split(',')
                if (data.length === headers.length) {
                    let tarr = []
                    for (let j = 0; j < headers.length; j++) {
                        tarr.push(data[j])
                    }
                    if(tarr[0].length !== 0){
                        if(tarr[0].length > 4){
                            lines.push(tarr.toString())
                        }
                    }
                };
            };
            lines.shift()
            this.setState({hola: lines})
        };
        reader.readAsText(input.files[0]);  
    };

  

  render() {

      var listPostDiv = <div/>
      if(this.state.hola.length !== 0){
        listPostDiv = <ListPost arrayP={this.state.hola}/>
      }

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
                        <input type="file" name="filePost" id="filePost" className="inputfile" onChange={(e)=>this.convertFile(e)}/>
                    </div>
                </div>

                {/* <div className="DivUpload">
                    <label style={{margin:"8px"}}>Upload a CSV File for add Categorys to the list of Category.</label>
                    <div className="SelectFile">
                        <label htmlFor="fileCate">
                            <div style={{marginRight:"5px", display:"inline-block", verticalAlign:"middle"}}>
                                <Icon size={16} icon={plus}/>
                            </div>
                            <span>Select your file</span>
                        </label>
                        <input type="file" name="fileCate" id="fileCate" className="inputfile" onChange={(e)=>convertFile(e)}/>
                    </div>
                </div> */}

                {listPostDiv}

            </div>
    );
  }
}

export default Upload;