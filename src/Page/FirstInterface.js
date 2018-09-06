import React, { Component } from 'react';
import { refBosses } from '../Components/Tools/DataBase.js'
import StartInterface from '../Components/Start-interface.js';
import ChooseInterface from '../Components/ChooseInterface.js';

class MainInterface extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    componentWillMount(){
        localStorage.getItem("BossId") && this.setState({workerId: localStorage.getItem("BossId")});
        localStorage.getItem("BossPassword") && this.setState({workerPassword: localStorage.getItem("BossPassword")});
    };

    componentDidMount(){
        localStorage.getItem("BossId") && this.setState({pageWorker:null});
        refBosses.on("value", (snapshot) => {
            let Bosses = snapshot.val();
            let listOfBosses = Bosses.map(val => {return val.BossId})
            if(listOfBosses.includes(this.state.workerId)){
                var numerOfUser = listOfBosses.indexOf(this.state.workerId)
                if(Bosses[numerOfUser].Password === this.state.workerPassword){
                    this.setState({numberOfUser: numerOfUser})
                    this.setState({pageWorker: true})
                }else{this.setState({pageWorker: false})}
            }else{
                this.setState({pageWorker:false});
            }
        });
    }

    render() {
        var page = <div/>
        if(this.state.pageWorker){
            page = <ChooseInterface user={this.state.numberOfUser}/>
        }else if (this.state.pageWorker === null){
            page = <div/>
        }else{
            page = <StartInterface />
        }
        return (page);
    };
}

export default MainInterface;