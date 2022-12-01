import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Enter from "../components/Enter";
import '../styles/Home.css';
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    
    const [enter, setEnter] = useState(false);
    const [name, setName] = useState("")
    const [ip, setIp] = useState("")
    const navigate = useNavigate()

    const variants = {
        visible: {
            y: 0,
            transition: { duration: 0.1 }
        },
        hidden: {
            y: '100%',
        }
    }

    const handleEnter = () => {
        setEnter(!enter)
    }

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const resip = await axios.get('https://api.ipify.org/?format=json')
                setIp(resip.data.ip)
            }
            catch(error){
                console.log(error.response)
            }
        }

        fetchData()
    }, [])

    return(
        <div className="h-screen">
            <Nav/>
            <div className="w-full h-3/5 flex items-center justify-center">
                <Enter handleEnter = {handleEnter}/>
            </div>
            <div className="w-full h-1/5 flex items-center flex-col justify-evenly">
                <p className="text-sm text-rose-500	">NOTE</p>
                <p className="text-xs">connect all devices in the same wifi</p>
            </div>
            {
                enter && (
                    <motion.div
                         variants={variants}
                         initial="hidden"
                         animate="visible"
                         className="absolute z-10 top-1/4 w-full h-3/4 bg-slate-900 flex items-center justify-center">
                        <div className="w-2/4 h-4/5 flex items-center justify-evenly flex-col">
                            <p className="text-xs text-gray-300">Before entering</p>
                            <p className="text-gray-50">Give yourself a cool Username</p>
                            <input onChange={(event) => setName(event.target.value)} className="rounded  border-0 outline-0 py-1.5 w-2/4 px-3 text-xs" type="text" placeholder="John Doe"/>
                            <button onClick={()=> navigate("/peertopeer", {state: {name: name, ip: ip}})} className="rounded btn p-1 bg-white text-xs text-white w-2/4 border-0 outline-0">ENTER</button>
                            <p className="cursor-pointer text-gray-300 text-xs underline" onClick={()=> handleEnter()}>Go back</p>
                        </div>
                    </motion.div>
                )
            }
        </div>
    )
}

export default Home;