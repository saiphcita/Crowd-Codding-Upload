import React from 'react';
import NavBar  from './Tools/NavBar.js'
import AsideBar  from './Tools/AsideBar.js'
import Upload  from './Tools/Upload.js'

function  WorkerPage (props) {
  return (
      <div style={{height:"100%"}} >
        <NavBar numberUser={props.user}/>
        <AsideBar/>
        <Upload/>
      </div>
  );
}

export default WorkerPage;