import React, { Component } from 'react';
import { refAllUsers } from '../Components/Tools/DataBase.js'
import StartInterface from '../Components/Start-interface.js';
import WorkerPage from '../Components/Interface-worker.js';

class MainInterface extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    componentWillMount(){
        localStorage.getItem("workerId") && this.setState({workerId: localStorage.getItem("workerId")});
        localStorage.getItem("workerPassword") && this.setState({workerPassword: localStorage.getItem("workerPassword")});
    };

    componentDidMount(){
        localStorage.getItem("workerId") && this.setState({pageWorker:null});
        refAllUsers.on("value", (snapshot) => {
            let AllUsers = snapshot.val();
            let listOfUsers = AllUsers.map(val => {return val.UserInfo.Username})
            if(listOfUsers.includes(this.state.workerId)){
                var numerOfUser = listOfUsers.indexOf(this.state.workerId)
                if(AllUsers[numerOfUser].UserInfo.Password === this.state.workerPassword){
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
            page = <WorkerPage user={this.state.numberOfUser}/>
        }else if (this.state.pageWorker === null){
            page = <div/>
        }else{
            page = <StartInterface />
        }
        return (page);
    };
}

export default MainInterface;