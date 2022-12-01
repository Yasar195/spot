import React, { useEffect } from "react";
import '../styles/Enter.css';

const Requests = (props) => {

    const person = props.person
    const id = props.id
    const handleReject = props.handleReject

    
    return(
        <div className="enter flex items-center justify-evenly p-2 rounded-lg mb-2">
            <p className="text-sm text-white">{person} wants to connect</p>
            <div className="w-fit h-fit p-1 bg-slate-900 rounded-lg">
                <p className="text-xs text-white">Accept</p>
            </div>
            <div onClick={()=>handleReject(id)} className="w-fit h-fit p-1 bg-slate-900 rounded-lg">
                <p className="text-xs text-white">Reject</p>
            </div>
        </div>
    )
}

export default Requests;