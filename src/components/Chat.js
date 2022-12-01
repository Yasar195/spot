import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import send from '../assets/sent.png';
import Am from './Am';
import Hm from './Hm';
import '../styles/Enter.css';
import '../styles/Chat.css';

const Chat = forwardRef((props, ref) => {

    const socket = props.socket
    
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const addMsg = (obj) => {
        const messageBody = document.querySelector('.msgbox');
        console.log(messageBody.scrollHeight)
        console.log(messageBody.clientHeight)
        if(messageBody.clientHeight < messageBody.scrollHeight){
            messageBody.scrollBy = messageBody.scrollHeight - messageBody.clientHeight;
            console.log('fired')
        }
        setMessages((messages) => [...messages, obj])
    }

    useImperativeHandle(ref, ()=> ({
        addAwaymsg(obj){
            const msgobj = {
                "from": "am",
                "name": obj.name,
                "message": obj.message,
                "time": new Date().toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"})
            }
            addMsg(msgobj)
        },
        toggleVisibility(){
            toggle()
        }
    }))

    const toggle = () => {
        const element = document.querySelector('.ch')
        element.classList.toggle('visible')
        element.classList.toggle('invisible')
    }

    const sendHandler = () => {
        const msgobj = {
            "from": "hm",
            "message": message,
            "time": new Date().toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"})
        }
        addMsg(msgobj)
        const req = {
            "type": "message",
            "message": message
        }
        socket.send(JSON.stringify(req))
        document.querySelector('input').value = ""
    }

    const handleKey = (e) => {
        setMessage(e.target.value)
    } 

    return(
        <div className="ch invisible absolute w-full h-full bg-black">
            <div className="h-full w-full p-2">
                <div className="header flex items-center justify-end">
                    <div onClick={()=> toggle()} className="enter rounded-full w-fit h-fit p-2">
                        <p className="text-white text-xs">X</p>
                    </div>
                </div>
                <div className="bg-slate-800 w-full rounded-lg p-2 msgbox">
                    {
                        messages.map((msgObj, index) => {
                            if(msgObj.from === "am"){
                                return (<Am key={index} name={msgObj.name} message={msgObj.message} time={msgObj.time}/>)
                            }
                            else{
                                return (<Hm key={index} message={msgObj.message} time={msgObj.time}/>)
                            }
                        })
                    }
                </div>
                <div className="input w-full flex items-center justify-evenly">
                    <input onChange={(e)=> handleKey(e)} className="input w-4/5 border-2 border-white outline-0 rounded-2xl bg-transparent p-3 text-white text-xs" type="text" placeholder="Enter message"/>
                    <div onClick={sendHandler} className="flex align-center justify-center p-4">
                        <img className="h-6" src={send} alt="send"/>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Chat;