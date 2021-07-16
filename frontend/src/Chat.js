import React, { Component } from 'react'
import moment from 'moment';

export default class Chat extends Component {


    componentDidMount(){
        
        let recievedMsg = this.props.rMsgArr.filter(msg=>msg.from===this.props.otheruseropened.id)
        recievedMsg.map(msg=>{
            return this.showOtherUserMsg(msg)
        })

    }

    componentDidUpdate(prevProps){


        if(this.props.otheruseropened.id!==prevProps.otheruseropened.id){
            
            if(window.confirm(`If you want to start chatting with ${this.props.otheruseropened.username} 
            your all chat data with ${prevProps.otheruseropened.username} will be cleared?`))
                document.getElementById("chat-area").innerHTML=""   
        
        }
          
        let recievedMsg = this.props.rMsgArr.filter(msg=>msg.from===this.props.otheruseropened.id)
        recievedMsg.map(msg=>{
            return this.showOtherUserMsg(msg)
        })

       
        

      }

   
    

    clearOldMsg=()=>{
        // clears the old messages
        let elms = document.getElementsByClassName("o-msg-box")
                if(elms){
                    for(let i=0;i<elms.length;i++){
                        elms[i].style.display="none"
                    }
                }
    }
    
    showOtherUserMsg=(rMsg)=>{ 

        // showing other user message in chat area
        const msg = document.createElement('p');
        msg.textContent = rMsg.msg;
        msg.setAttribute('class','other-message');

        const time = document.createElement('sub');
        time.textContent = rMsg.time;

        msg.appendChild(time);
        const div = document.createElement('div');
        div.setAttribute('class','o-msg-box');
        div.appendChild(msg);
        document.getElementById("chat-area").appendChild(div);

        //scrolling down after showing message in dom
        document.getElementById("chat-area").scrollTop = document.getElementById("chat-area").scrollHeight;
    }


    handleSubmit=(e)=>{
        if(e.key==='Enter'|| e.keyCode===13)
           this.handleUserMsg();     
    }

    handleUserMsg = ()=>{

        if(document.getElementById('user-msg').value!==""){

        // finding currentUser id
        let user = this.props.users.filter(user=>user.username===this.props.currentUser)
        console.log(user)

        // displaying the message in chat area 
        const msg = document.createElement('p');
        msg.textContent = document.getElementById('user-msg').value;
        msg.setAttribute('class','my-message');
        
        const time = document.createElement('sub');
        time.textContent = moment(new Date()).format('h:mm a');

        msg.appendChild(time);
        const div = document.createElement('div');
        div.setAttribute('class',`msg-box ${this.props.otheruseropened.id}`);
        div.appendChild(msg);
        document.getElementById("chat-area").appendChild(div);

        //scrolling down after showing message in dom
        document.getElementById("chat-area").scrollTop = document.getElementById("chat-area").scrollHeight;

        
        //submitting the message to server
        this.props.socket.emit('msg',{
        msg:document.getElementById('user-msg').value,
        time:moment(new Date()).format('h:mm a'),
        to:this.props.otheruseropened.id,
        from:user[0].id
    })

        //clearing the input field
        document.getElementById('user-msg').value=""
        //setting focus
        document.getElementById("user-msg").focus();
    }
    }


    
    render() {
        const firstLetter = (this.props.otheruseropened.username)[0];
        return (
        
            <div id="chat-section">

                <div id="chat-header">

                    <div id="info1">
                        <p className="profile-pic">{firstLetter}</p>
                        <div>
                            <p className="name">{this.props.otheruseropened.username}</p>
                            <p className="time">12:10 AM</p>
                        </div>
                    </div>

                    <div id="info2">
                    <i className="fas fa-search"></i>
                    <i className="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                
                <div id="chat-area">
                    { this.clearOldMsg() }
                   
                </div>

                <div className="msg-send-box">
                    <i className="far fa-smile"></i>
                    <i className="fas fa-paperclip"></i> 

                    <input placeholder="Type a message"
                    onKeyUp={(e)=>{this.handleSubmit(e)}}
                    id="user-msg"/> 

                    <i className="far fa-paper-plane" onClick={this.handleUserMsg}></i>
                    <i className="fas fa-microphone"></i>
                </div>
            </div>
        )
    }
}
