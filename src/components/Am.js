import React from "react";
import '../styles/Ms.css';
import '../styles/Enter.css';

const Am = (props) => {

    const message = props.message
    const name = props.name
    const time = props.time

    return(
        <div className="relative flex items-center justify-start">
            <div className="relative msg am left-0 p-2 max-w-screen-sm">
                <p className="font text-black">{name}</p>
                <p className="mt-1 text-black msg">{message}</p>
                <p className="relative text-right right-0 text-black font">{time}</p>
            </div>
        </div>
    )
}

export default Am;