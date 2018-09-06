import React from 'react';
import NavBar  from '../Components/Tools/NavBar.js'
import AsideBar  from '../Components/Tools/AsideBar.js'
import Upload  from '../Components/Tools/Upload.js'

function  InterfaceBosses (props) {
  return (
      <div style={{height:"100%"}} >
        <NavBar numberUser={props.user}/>
        <AsideBar/>
        <Upload/>
      </div>
  );
}

export default InterfaceBosses;