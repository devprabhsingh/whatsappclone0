import React, { Component, Fragment } from 'react'
import Chat from './Chat'

export default class Rooms extends Component {

   
    state={
        otheruseropened:{}
    }


    handleClick=(user)=>{
        this.setState({
            otheruseropened:user
        },()=>{
            this.props.getOpenedUser(this.state.otheruseropened)
        }) 

    }

    render() {
    const users = (this.props.users).filter(e => e.username !== this.props.currentUser)
        return (
            <Fragment>
                <div id="container">
                    <div>
            <div id="user-section">
                <p className="profile-pic">{(this.props.currentUser)[0]}</p>
                <p className="current-username">{this.props.currentUser}</p>
                <div id="features">
                <i className="fas fa-compact-disc"></i>
                <i className="far fa-comment-alt"></i>
                <i className="fas fa-ellipsis-v"></i>
                </div>

            </div>
            <div id="contacts-container">

                <div className="searchbox">
                <i className="fas fa-search"></i>
                <input placeholder="Search or start new chat"/>
                </div>

                <div id="all-contacts">
                     {users.map((user,index)=>
                            
                            <div key={index} className="contact" onClick={()=>this.handleClick(user)}>

                        <div className="box1">
                            <p className="profile-pic">{(user.username).charAt(0)}</p>
                        </div>

                        <div className="box2">
                            <div>
                                <p className="name">{user.username}</p>
                                <p id="lastmsg">
                                    wanna chat with me
                                </p>
                            </div>
                            <div className="timearrow">
                            <p className="time">12:10 AM</p>
                            <i className="fas fa-chevron-down"></i>
                            </div>
                        </div>

                    </div>
                     )} 
   
                </div>
            </div>
            </div>
            {this.props.users.length>=2 && Object.keys(this.state.otheruseropened).length >=1 ?
        <Chat otheruseropened = {this.state.otheruseropened}
      rMsgArr={this.props.rMsgArr}
       socket={this.props.socket}
       users={this.props.users}
       currentUser={this.props.currentUser}/> 
       :
     <div id="info-screen">
       <img alt="img" src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png"/>
      <p>waiting for other users to join the network...</p>
       </div>}
       </div>
            </Fragment>
        )
    }
}
