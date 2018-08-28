import React, { Component } from 'react';
import './CSS/Upload.css';
import Icon from 'react-icons-kit';
import {plus} from 'react-icons-kit/fa/plus'
import { refGeneralPosts } from './Tools/DataBase.js'
import ListPost  from './Tools/ListPost.js'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPostList:[],
            noCSV: false,
        };
    }

    componentDidMount(){
        refGeneralPosts.on("value", (snapshot) => {
            let arrayPost = snapshot.val();
            this.setState({arrayPost: arrayPost})
        });
    }

    convertFile(event){
        const reader = new FileReader();
        const input = document.getElementById('filePost');
        if(event.target.files.length !== 0){
            var extension = event.target.files[0].name.split('.')[1]
            if(extension === "csv"){
                this.setState({noCSV: false})
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
                    this.setState({newPostList: lines})
                };
                reader.readAsText(input.files[0]);  
            }else{
                this.setState({newPostList: []})
                this.setState({noCSV: true})
            }
        }
    };

    UploadPosts(){
        var oldArrayPost = this.state.arrayPost
        var newPosts = this.state.newPostList
        var listNew = []
        for (let i = 0; i < newPosts.length; i++) {
            if(!oldArrayPost.includes(newPosts[i])){
                listNew.push(newPosts[i])
            }
        }
        var newArrayPost = oldArrayPost.concat(listNew);
        refGeneralPosts.set(newArrayPost)
    };


  render() {
      var listPostDiv = <div/>
      var errorCSV = <div/>
      if(this.state.newPostList.length !== 0){
        var uploadCSV = <div className="uploadCSV"><button onClick={this.UploadPosts.bind(this)}>Upload</button></div>
        listPostDiv = <ListPost arrayP={this.state.newPostList}/>
      }
      if(this.state.noCSV){
        errorCSV = <div className="errorCSV">The Type of File you Upload is not Correct.</div>
      }

    return (
            <div>
                <div className="DivUpload">
                    <label style={{margin:"8px"}}>Upload a CSV File for view your new list of Post.</label>
                    <div className="SelectFile">
                        <label htmlFor="filePost">
                            <div style={{marginRight:"5px", display:"inline-block", verticalAlign:"middle"}}>
                                <Icon size={16} icon={plus}/>
                            </div>
                            <span>Select your file</span>
                        </label>
                        <input type="file"  name="filePost" id="filePost" className="inputfile" onChange={(event)=>this.convertFile(event)}/>
                    </div>
                </div>
                <div className="buttonsDiv">
                    {uploadCSV}
                    {errorCSV}
                </div>
                {listPostDiv}
            </div>
    );
  }
}

export default Upload;

/*<div className="DivUpload">
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
</div> */