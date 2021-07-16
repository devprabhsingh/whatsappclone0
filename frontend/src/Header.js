import React, { Component } from 'react'

export default class Header extends Component {


    render() {
        if(Object.keys(this.props.newmsg).length !== 0)
        var user = this.props.users.filter(u=>u.id===(this.props.newmsg).from)[0].username
        
        if(Object.keys(this.props.openedUser).length !== 0 && this.props.openedUser.id===this.props.newmsg.from)
        document.getElementById("newmsg").innerHTML=""

        return (
            <div id="header">
                <p id="app-title">WhatsApp-Clone</p>  
                <p id="newmsg">{Object.keys(this.props.newmsg).length !== 0 ? `${user} sent a new message` :""}</p>  
            </div>
        )
    }
}
