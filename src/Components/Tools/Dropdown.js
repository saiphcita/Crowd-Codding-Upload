import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { dbUser } from './DataBase.js'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,

    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
  };  

  render() {
    // ESTILOS----------------------------------------
    var buttonStyle = {
        position: "inherit",
        backgroundColor: "#3DDFEA",
        color: "black",
        height: "100%",
        width: "100%",
        border: "0",
        borderRadius: "0",
        padding: "0",
        margin: "0"
    };
    var dropDownS = {
      backgroundColor: "#E4FFF7",
      color:"black",
      height: "auto",
      width: "340px",
      border: "2px solid black",
      borderRadius: "4px"
    };

    // ESTILOS------------------------------------------

    var fancyTimeFormat = (time) =>{  
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = ~~time % 60;
      var ret = "";

      if (hrs > 0) {  ret += "" + hrs + ":" + (mins < 10 ? "0" : "");  };
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    }

    return (
      <div style={{height:"100%", width:"100%"}}>
         <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{position:"inherit", height:"100%", width:"100%"}}>
          <DropdownToggle caret style={buttonStyle}>
            See
          </DropdownToggle>
          <DropdownMenu style={dropDownS}>
            <DropdownItem style={{color:"black"}} header>{"Post "+(this.props.numeroPost)}</DropdownItem>
            {
              this.props.arrayHistory.map((val, ind) => {
                return(
                  <DropdownItem disabled key={ind}>
                      <div style={{float:"left"}}>{val[0]}</div>
                      <div style={{float:"right"}}>{fancyTimeFormat(val[1])}</div> 
                  </DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}