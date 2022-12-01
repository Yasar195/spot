import React, { useEffect, useState } from "react";
import des from '../assets/dec.png';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Des = () => {

    const location = useLocation()
    const data = location.state
    const navigate = useNavigate()

    const [socket, setSocket] = useState()

    const open = {
        "type": "register",
        "action": "open",
        "name": data.name,
    }

    const close = {
        "action": "close"
    }

    useEffect(()=> {
        const socket = new WebSocket('ws://localhost:5000/socket/')
        setSocket(socket)
        socket.onopen = () => {
            socket.send(JSON.stringify(open))
        }
    }, [])

    return(
        <div className="w-full h-screen bg-slate-900">
            <div className="w-full h-2/5 flex justify-center">
                <img src={des} alt="des"/>
            </div>
            <div className="w-full h-3/5 flex items-center justify-center">
                <div className="h-full w-2/4 flex items-center justify-evenly flex-col">
                    <p className="text-white text-sm">Welcome {data.name}</p>
                    <Link to="/peertopeer" state={{socket: socket}}><button className="bg-slate-900 text-white p-3 px-10 text-sm rounded shadow-xl">DIRECT CHAT</button></Link>
                    <button className="bg-slate-900 text-white p-3 px-10 text-sm rounded shadow-xl">BROADCAST</button>
                    <p onClick={()=> {
                        //socket.close()
                        navigate("/")
                    }} className="cursor-pointer text-gray-300 text-xs underline">Go back</p>
                </div>
            </div>
        </div>
    )
}

export default Des;