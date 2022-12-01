import React, { useEffect } from "react";
import '../styles/Ms.css';
import '../styles/Enter.css';

const Hm = (props) => {

    const message = props.message
    const time = props.time

    return(
        <div className="relative flex items-center justify-end">
            <div className="msg hm right-0 p-2 max-w-screen-sm">
                <p className="msg text-white">{message}</p>
                <p className="font text-right text-white">{time}</p>
            </div>
        </div>
    )
}

export default Hm;