import React, { Component } from 'react';
import '../CSS/UploadPost.css';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus'
import { refGeneralPosts } from './DataBase.js'

//Listando los posts
class ListPost extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    };
  
    render() {
      return (
          <div className="DivPost">
            <div className="titlePost">
              <li style={{width:"4%", maxWidth:"4%", textAlign:"center", padding:"0"}}>No.</li>
              <li style={{width:"96%", maxWidth:"96%"}}>Post</li>
            </div>
            {this.props.arrayP.map((val, ind) =>{
              return (
                <div key={ind} className="NPlist">
                  <li key={ind} style={{width:"4%", maxWidth:"4%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                  <li key={val} style={{width:"96%", maxWidth:"96%"}}>{val}</li>
                </div>
              )
            })}
          </div>
      );
    }
  }

//haciendo el upload
class UploadPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayPost: [],
            newPostList:[],
            newPosts: [],
            resultListPost: [],
            noCSV: false,
            numberState: 0,
            statePage: 0
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
                this.setState({numberState: 1})
                this.setState({statePage: 1})
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
                    //viendo cuantos existen
                    var listNew = []
                    for (let i = 0; i < lines.length; i++) {
                        if(!this.state.arrayPost.includes(lines[i])){
                            listNew.push(lines[i])
                        }
                    }
                    var resultPosts = this.state.arrayPost;
                    resultPosts = resultPosts.concat(listNew)

                    this.setState({resultListPost: resultPosts})
                    this.setState({newPosts: listNew})
                };
                reader.readAsText(input.files[0]);  
            }else{
                this.setState({newPostList: []})
                this.setState({noCSV: true})
                this.setState({numberState: 0})
                this.setState({statePage: 0})
            }
        }
    };

    UploadPosts(){
        refGeneralPosts.set(this.state.resultListPost)
        this.setState({
            newPostList:[],
            newPosts: [],
            resultListPost: []
        })
        this.setState({numberState: 0})
        this.setState({statePage: 5})
        document.getElementById("filePost").value = "";
    };

    RemoveList(){
        this.setState({
            newPostList:[],
            newPosts: [],
            resultListPost: []
        })
        this.setState({numberState: 0})
        this.setState({statePage: 0})
        document.getElementById("filePost").value = "";
    };

  render() {
      var initialButton = 
        <div className="ShowPosts">
            <div style={{display:"table-cell", verticalAlign:"middle"}}><button style={{marginRight:"1%"}} onClick={()=> this.setState({statePage: 2})}>See the Current Posts of the Database</button></div>
        </div>;
                
        var finalButton = 
        <div className="ShowPosts"> 
            <div style={{display:"table-row", height:"5%"}}>The Post List you have Uploaded Contains {this.state.newPostList.length-this.state.newPosts.length} Existing Post in the Database.</div>
            <div style={{display:"table-row", height:"6%", textDecorationLine:"underline", fontSize:"1.2rem"}}>You can Add {this.state.newPosts.length} Post of the New List of Posts that you have Uploaded, that List contains {this.state.newPostList.length} Post.</div>
            <div style={{display:"table-cell", verticalAlign:"middle"}}>
                <button style={{marginRight:"1%"}} onClick={()=> this.setState({statePage: 2})}>See the Current Posts of the Database</button>
                <button style={{margin:"0 1%"}} onClick={()=> this.setState({statePage: 3})}>See the new List of Posts that you have Uploaded</button>
                <button style={{marginLeft:"1%"}} onClick={()=> this.setState({statePage: 4})}>See the Result when you Adding the New Posts</button>
            </div>
        </div>;

      var afterAdd= 
      <div className="ShowPosts">
            <div style={{display:"table-row", height:"6%", fontSize:"1.2rem"}}> You have Added the List of Post. Now, The Database Currently have {this.state.arrayPost.length} Post.</div>
            <div style={{display:"table-cell", verticalAlign:"middle"}}><button style={{marginRight:"1%"}} onClick={()=> this.setState({statePage: 2})}>See the Current Posts of the Database</button></div>
        </div>;
        
      var statePostDiv = initialButton;
      
      var errorCSV = <div className="errorCSV">The Type of File you Upload is not Correct.</div>;

      var uploadCSV = 
        <div style={{display:"table-cell", verticalAlign:"middle"}}>
            <button onClick={this.UploadPosts.bind(this)} className="addListButton" style={{marginRight:"1%"}}>Add New List of Post</button>
            <button onClick={this.RemoveList.bind(this)} className="removeListButton" style={{marginLeft:"1%"}}>Remove the List</button>
        </div>;

      var stateCSV = <div/>
      if(this.state.newPostList.length !== 0){ stateCSV = uploadCSV };
      if(this.state.noCSV){ stateCSV = errorCSV };
      
      if(this.state.statePage === 0){
        statePostDiv = initialButton;          
      }else if(this.state.statePage === 1){
        statePostDiv = finalButton;
      }else if(this.state.statePage === 2){
        statePostDiv = 
                <div style={{height:"78%", maxHeight:"78%", width:"100%"}}>
                    <div style={{height:"8%", width:"100%"}}>
                        <button className="divGoBack" onClick={()=> this.setState({statePage: this.state.numberState})}>Go back</button>
                        <div style={{height:"100%", textAlign:"left", display:"table", float:"left", marginLeft:"32px"}}>
                            <div style={{display:"table-cell", verticalAlign:"middle", color:"#182AE2"}}>The Database Currently have {this.state.arrayPost.length} Post.</div>
                        </div>
                    </div>
                    <div style={{height:"92%"}}>
                        <ListPost arrayP={this.state.arrayPost}/>
                    </div>
                </div>
      }else if(this.state.statePage === 3){
        statePostDiv = 
                <div style={{height:"78%", maxHeight:"78%", width:"100%"}}>
                    <div style={{height:"8%", width:"100%"}}>
                        <button className="divGoBack" onClick={()=> this.setState({statePage: this.state.numberState})}>Go back</button>
                        <div style={{height:"100%", textAlign:"left", display:"table", float:"left", marginLeft:"32px"}}>
                            <div style={{display:"table-cell", verticalAlign:"middle", color:"#182AE2"}}>The New List of Posts you have Uploaded has {this.state.newPostList.length} Post.</div>
                        </div>
                    </div>
                    <div style={{height:"92%"}}>
                        <ListPost arrayP={this.state.newPostList}/>
                    </div>
                </div>
      }else if(this.state.statePage === 4){
        statePostDiv = 
                <div style={{height:"78%", maxHeight:"78%", width:"100%"}}>
                    <div style={{height:"8%", width:"100%"}}>
                        <button className="divGoBack" onClick={()=> this.setState({statePage: this.state.numberState})}>Go back</button>
                        <div style={{height:"100%", textAlign:"left", display:"table", float:"left", marginLeft:"32px"}}>
                            <div style={{display:"table-cell", verticalAlign:"middle", color:"#182AE2"}}>This would be the Result If you Add the {this.state.newPosts.length} Post to the Current Post that are the First {this.state.arrayPost.length} Post. If you do, the Database will contain {this.state.resultListPost.length} Post.</div>
                        </div>
                    </div>
                    <div style={{height:"92%"}}>
                        <ListPost arrayP={this.state.resultListPost}/>
                    </div>
                </div>
      }else if(this.state.statePage === 5){
        statePostDiv = afterAdd;
      }

    return (    
            <div style={{height: "100%", width:"100%"}}>

                <div className="DivUpload">
                    <div className="DivSelectCSV">
                        <label style={{margin:"1% 0 1% 1%"}}>Upload a CSV File for view the New List of Post.</label>
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
                    <div className="buttonsDivResponse">
                        {stateCSV}
                    </div>
                </div>

                {statePostDiv}

            </div>
    );
  }
}

export default UploadPost;