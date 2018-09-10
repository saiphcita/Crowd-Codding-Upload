import React, { Component } from 'react';
import '../CSS/UploadCategory.css';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus'
import { refGeneralCategory } from './DataBase.js'

//Listando las categorias
class Categories extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    };
  
    render() {
      return (
          <div className="DivCategory">
            <div className="titleCategory">
                <li style={{width:"4%", maxWidth:"4%", textAlign:"center", padding:"0"}}>No.</li>
                <li style={{width:"16%", maxWidth:"16%"}}>Category</li>
                <li style={{width:"44%", maxWidth:"44%"}}>Definition</li>
                <li style={{width:"36%", maxWidth:"36%"}}>Example</li>
            </div>
            {this.props.arrayC.map((val, ind) =>{
              return (
                <div key={ind} className="NClist">
                    <li style={{width:"4%", maxWidth:"4%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                    <li style={{width:"16%", maxWidth:"16%"}}>{val.categoryName}</li>
                    <li style={{width:"44%", maxWidth:"44%"}}>{val.categoryDefinition}</li>
                    <li style={{width:"36%", maxWidth:"36%"}}>{val.categoryExample}</li>
                </div>
              )
            })}
          </div>
      );
    }
  }

//haciendo el upload
class UploadCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayCategory: [],
            arrayCategoryName: [],

            newCategoryList:[],
            newCategories: [],

            resultListCategory: [],
            noCSV: false,
            numberState: 0,
            statePage: 0
        };
    }

    componentDidMount(){
        refGeneralCategory.on("value", (snapshot) => {
            let arrayCategory = snapshot.val();
            let arrayCategoryName = arrayCategory.map(val => val.categoryName)
            this.setState({arrayCategoryName: arrayCategoryName})
            this.setState({arrayCategory: arrayCategory})
        });
    }

    convertFile(event){
        const reader = new FileReader();
        const input = document.getElementById('fileCategory');
        if(event.target.files.length !== 0){
            var extension = event.target.files[0].name.split('.')[1]
            if(extension === "csv"){
                this.setState({numberState: 1})
                this.setState({statePage: 1})
                this.setState({noCSV: false})
                reader.onload = () => {
                    let text = reader.result;
                    let allTextLines = text.split(/\r|\n|\r/);
                    let headers = allTextLines[0].split(',')
                    let lines = [];
                    for (let i = 0; i < allTextLines.length; i++) {
                        let data = allTextLines[i].split('","')
                        if (data.length === headers.length) {
                            let tarr = []
                            for (let j = 0; j < headers.length; j++) {
                                tarr.push(data[j].replace(/['"]+/g, ''))
                            }
                            var objectTarr = {
                                "categoryName":tarr[0],
                                "categoryDefinition":tarr[1],
                                "categoryExample":tarr[2]
                            }
                            if(tarr.length === 3){
                                lines.push(objectTarr)
                            }else{
                                this.setState({numberState: 0})
                                this.setState({statePage: 1})
                            }
                        };
                    };
                    this.setState({newCategoryList: lines})
                    //viendo cuantos existen
                    var newCategoriesName = lines.map(val => val.categoryName);
                    var listNew = []
                    for (let i = 0; i < newCategoriesName.length; i++) {
                        if(!this.state.arrayCategoryName.includes(newCategoriesName[i])){
                            listNew.push(lines[i])
                        }
                    }
                    this.setState({newCategories: listNew})

                    var resultCategories = this.state.arrayCategory;
                    resultCategories = resultCategories.concat(listNew)
                    this.setState({resultListCategory: resultCategories})
                };
                reader.readAsText(input.files[0]);  
            }else{
                this.setState({newCategoryList: []})
                this.setState({noCSV: true})
                this.setState({numberState: 0})
                this.setState({statePage: 0})
            }
        }
    };

    UploadCategories (){
        refGeneralCategory.set(this.state.resultListCategory)
        this.setState({
            newCategoryList:[],
            newCategories: [],
            resultListCategory: []
        })
        this.setState({numberState: 0})
        this.setState({statePage: 5})
        document.getElementById("fileCategory").value = "";
    };

    RemoveList(){
        this.setState({
            newCategoryList:[],
            newCategories: [],
            resultListCategory: []
        })
        this.setState({numberState: 0})
        this.setState({statePage: 0})
        document.getElementById("fileCategory").value = "";
    };

  render() {
      var initialButton = 
        <div className="ShowCategories">
            <div style={{display:"table-cell", verticalAlign:"middle"}}><button style={{marginRight:"1%"}} onClick={()=> this.setState({statePage: 2})}>See the Current Categories of the Database</button></div>
        </div>;
                
        var finalButton = 
        <div className="ShowCategories"> 
            <div style={{display:"table-row", height:"5%"}}>The Categories you have Uploaded Contains {this.state.newCategoryList.length-this.state.newCategories.length} Existing Categories in the Database.</div>
            <div style={{display:"table-row", height:"6%", textDecorationLine:"underline", fontSize:"1.2rem"}}>You can Add {this.state.newCategories.length} new Categories of {this.state.newCategoryList.length} Categories that you Uploaded.</div>
            <div style={{display:"table-cell", verticalAlign:"middle"}}>
                <button style={{marginRight:"1%"}} onClick={()=> this.setState({statePage: 2})}>See the Current Categories of the Database</button>
                <button style={{margin:"0 1%"}} onClick={()=> this.setState({statePage: 3})}>See the new Categories that you have Uploaded</button>
                <button style={{marginLeft:"1%"}} onClick={()=> this.setState({statePage: 4})}>See the Result if you Add the New Categories</button>
            </div>
        </div>;

      var afterAdd= 
      <div className="ShowCategories">
            <div style={{display:"table-row", height:"6%", fontSize:"1.2rem"}}> You have Added the Categories. Now, The Database Currently have {this.state.arrayCategory.length} Categories.</div>
            <div style={{display:"table-cell", verticalAlign:"middle"}}><button style={{marginRight:"1%"}} onClick={()=> this.setState({statePage: 2})}>See the Current Categories of the Database</button></div>
        </div>;
        
      var stateCategoryDiv = initialButton;
      
      var errorCSV = <div className="errorCSV">The Type of File you Upload is not Correct.</div>;

      var uploadCSV = 
        <div style={{display:"table-cell", verticalAlign:"middle"}}>
            <button onClick={this.UploadCategories.bind(this)} className="addListButton" style={{marginRight:"1%"}}>Add New Categories</button>
            <button onClick={this.RemoveList.bind(this)} className="removeListButton" style={{marginLeft:"1%"}}>Remove Categories</button>
        </div>;

      var stateCSV =
        <div style={{display:"table-cell", verticalAlign:"middle"}}>
            <button onClick={(e) => {e.preventDefault(); window.open("https://docs.google.com/spreadsheets/d/1CibdK7uAWheXm8Scp8BQnLdG6GSdFntvU_GvGKrIrXo/edit#gid=0"); }}
            className="linkButton">
                Use this Categories Spreadsheet as an Example to Upload your CSV file
            </button>
        </div>;

      if(this.state.newCategoryList.length !== 0){ stateCSV = uploadCSV };
      if(this.state.noCSV){ stateCSV = errorCSV };
      
      if(this.state.statePage === 0){
        stateCategoryDiv = initialButton;          
      }else if(this.state.statePage === 1){
        stateCategoryDiv = finalButton;
      }else if(this.state.statePage === 2){
        stateCategoryDiv = 
                <div style={{height:"78%", maxHeight:"78%", width:"100%"}}>
                    <div style={{height:"8%", width:"100%"}}>
                        <button className="divGoBack" onClick={()=> this.setState({statePage: this.state.numberState})}>Go back</button>
                        <div style={{height:"100%", textAlign:"left", display:"table", float:"left", marginLeft:"32px"}}>
                            <div style={{display:"table-cell", verticalAlign:"middle", color:"#182AE2"}}>The Database Currently have {this.state.arrayCategory.length} Categories.</div>
                        </div>
                    </div>
                    <div style={{height:"92%"}}>
                        <Categories arrayC={this.state.arrayCategory}/>
                    </div>
                </div>
      }else if(this.state.statePage === 3){
        stateCategoryDiv = 
                <div style={{height:"78%", maxHeight:"78%", width:"100%"}}>
                    <div style={{height:"8%", width:"100%"}}>
                        <button className="divGoBack" onClick={()=> this.setState({statePage: this.state.numberState})}>Go back</button>
                        <div style={{height:"100%", textAlign:"left", display:"table", float:"left", marginLeft:"32px"}}>
                            <div style={{display:"table-cell", verticalAlign:"middle", color:"#182AE2"}}>You have Uploaded {this.state.newCategoryList.length} Categories.</div>
                        </div>
                    </div>
                    <div style={{height:"92%"}}>
                        <Categories arrayC={this.state.newCategoryList}/>
                    </div>
                </div>
      }else if(this.state.statePage === 4){
        stateCategoryDiv = 
                <div style={{height:"78%", maxHeight:"78%", width:"100%"}}>
                    <div style={{height:"8%", width:"100%"}}>
                        <button className="divGoBack" onClick={()=> this.setState({statePage: this.state.numberState})}>Go back</button>
                        <div style={{height:"100%", textAlign:"left", display:"table", float:"left", marginLeft:"32px"}}>
                            <div style={{display:"table-cell", verticalAlign:"middle", color:"#182AE2"}}>This would be the Result If you Add the {this.state.newCategories.length} Categories to the Current {this.state.arrayCategory.length} Categories in the Database. If you do, the Database will contain {this.state.resultListCategory.length} Categories.</div>
                        </div>
                    </div>
                    <div style={{height:"92%"}}>
                        <Categories arrayC={this.state.resultListCategory}/>
                    </div>
                </div>
      }else if(this.state.statePage === 5){
        stateCategoryDiv = afterAdd;
      }

    return (    
            <div style={{height: "100%", width:"100%"}}>

                <div className="DivUpload">
                    <div className="DivSelectCSV">
                        <label style={{margin:"1% 0 1% 1%"}}>Upload the New Categories in a CSV File.</label>
                        <div className="SelectFile">
                            <label htmlFor="fileCategory">
                                <div style={{marginRight:"5px", display:"inline-block", verticalAlign:"middle"}}>
                                    <Icon size={16} icon={plus}/>
                                </div>
                                <span>Select your file</span>
                            </label>
                            <input type="file"  name="fileCategory" id="fileCategory" className="inputfile" onChange={(event)=>this.convertFile(event)}/>
                        </div>
                    </div>
                    <div className="buttonsDivResponse">
                        {stateCSV}
                    </div>
                </div>

                {stateCategoryDiv}

            </div>
    );
  }
}

export default UploadCategory;