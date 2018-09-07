import React from 'react';
import NavBar  from '../Components/Tools/NavBar.js'
import BossInterface  from '../Components/BossInterface.js'

function  InterfaceBosses (props) {
  return (
      <div style={{height:"100%"}} >
        <NavBar numberUser={props.user}/>
        <BossInterface />
      </div>
  );
}

export default InterfaceBosses;