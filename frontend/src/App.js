import './App.css';
import Rooms from './Rooms'
import Header from './Header'
import React from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
const socket = socketIOClient(ENDPOINT);

class App extends React.Component{

  state = { 
    currentUser:"",
    users:[],
    rMsgArr:[],
    newmsg:{},
    openedUser:{}
  }

  componentDidMount(){
    socket.on('usersList',(users)=>{
        this.setState({
            users
        })
    })

    socket.on('message',msg=>{

     this.setState({
       newmsg:msg,
        rMsgArr:[...this.state.rMsgArr,msg]
      })

    })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    if(this.state.newUser!==""){
      document.getElementById("container").style.display="flex";
      e.target.style.display="none";
  }
  socket.emit('joinRoom',this.state.currentUser)
  }

  
  handleChange=(e)=>{  
    this.setState({
      currentUser:e.target.value
    })
  }

 
  getOpenedUser=(user)=>{
    this.setState({
      openedUser:user
    })
  }

  render(){
  return (
    <div className="App">
      <Header newmsg={this.state.newmsg}
              users = {this.state.users}
              openedUser={this.state.openedUser}/>

      <form id="add-user" onSubmit={(e)=>this.handleSubmit(e)}>
        <input placeholder="Enter your name"
         value={this.state.currentUser}
         onChange={(e)=>this.handleChange(e)}
         autoFocus
         />
        <input type="submit" value="JOIN"/>
      </form>

     
     
  <Rooms  currentUser={this.state.currentUser}
          users={this.state.users}
          socket={socket}
          rMsgArr={this.state.rMsgArr}
          getOpenedUser={this.getOpenedUser}
          />
      </div> 

    );
  }
}

export default App;
