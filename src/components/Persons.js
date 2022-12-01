import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '../styles/Enter.css';

const Persons = forwardRef((props, ref) => {

    const person = props.person
    const socket = props.socket
    const id = props.id

    const [requested, setRequested] = useState(false)

    const handleRequest = () => {
        const req = {
            "type" : "",
            "id" : id
        }
        if(!requested){
            req.type = "offer"
            setRequested(true)
        }
        else {
            req.type = "cancel"
            setRequested(false)    
        }
        socket.send(JSON.stringify(req))
    }

    useEffect(() => {
        setRequested(props.state)
    }, [])

    return(
        <div className="relative enter flex items-center justify-evenly p-2 rounded-lg mb-2">
            <p className="text-sm text-white">{person}</p>
            <div onClick={handleRequest} className="absolute right-2 w-fit h-fit p-1 bg-slate-900 rounded-lg">
                <p className="text-xs text-white">{requested ? "Undo": "Connect"}</p>
            </div>
        </div>
    )
})

export default Persons;