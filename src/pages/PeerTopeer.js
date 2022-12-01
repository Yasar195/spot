import React, { useEffect, useState, useRef } from "react";
import '../styles/Enter.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate, useLocation } from "react-router-dom";
import Persons from "../components/Persons";
import Requests from "../components/Requests";
import Chat from "../components/Chat";

const PeerTopeer = () => {

    const [socket, setSocket] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const data = location.state
    const [persons, setPersons] = useState([])
    const [requests, setRequests] = useState([])
    const [state, setState] = useState('people')
    const chatRef = useRef(null);

    const open = {
        "type": "open",
        "name": data.name,
        "ip": data.ip,
    }

    const stateHandler = (state) => {
        setState(state)
    }

    const handleReject = (id) => {
        const rej = {
            "type": "reject",
            "id": id
        }
        socket.send(JSON.stringify(rej))
    }

    useEffect(()=> {
        const socket = new WebSocket('wss://spot-socket.onrender.com/socket/')
        setSocket(socket)
        socket.onopen = () => {
            socket.send(JSON.stringify(open))
        }
        socket.onmessage = (data) => {
            const response = JSON.parse(data.data)
            if(response.type === "people"){
                response.people.forEach(element => {
                    element.state = false
                });
                setPersons(response.people)
            }
            else if(response.type === "request"){
                setRequests(response.requests)
            }
            else if(response.type === "message"){
                chatRef.current.addAwaymsg(response)
            }
            else if(response.type === "reject"){
                console.log(response)
            }
        }
    }, [])

    return(
        <div className="relative w-full h-screen bg-slate-900">
            <Chat ref={chatRef} socket={socket}/>
            <div className="w-full h-1/5 p-8 flex align-center justify-evenly">
                <div onClick={()=> {
                    socket.close()
                    navigate('/')
                }} className="w-fit h-fit p-2 rounded-lg enter flex align-center justify-center">
                    <AiOutlineArrowLeft/>
                </div>
                <h1 className="text-sm text-white text-center">{data.name}</h1>
                <div onClick={()=> chatRef.current.toggleVisibility()} className="enter">
                    <p>Chat</p>
                </div>
            </div>
            <div className="relative w-full h-4/5">
                <div className="absolute top-0 w-full h-8 flex align-center justify-evenly">
                    <div onClick={()=>stateHandler("people")}>
                        <p className="text-white text-sm">People ({persons.length})</p>
                    </div>
                    <div onClick={()=>stateHandler("requests")}>
                        <p className="text-white text-sm">Requests ({requests.length})</p>
                    </div>
                </div>
                <div className="w-full h-full pb-8 pt-16 pl-16 pr-16">
                    {   
                        state === "people"? 
                            persons.map((person, index) => <Persons key={index} state={person.state} socket={socket} id={person.id} person={person.name}/>)
                        : 
                            requests.map((person, index)=> <Requests key={index} handleReject={handleReject} person={person.name} id={person.id}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default PeerTopeer;