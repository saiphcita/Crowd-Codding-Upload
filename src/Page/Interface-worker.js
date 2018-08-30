import React from 'react';
import NavBar  from '../Components/NavBar.js'
import AsideBar  from '../Components/AsideBar.js'
import Upload  from '../Components/Upload.js'

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