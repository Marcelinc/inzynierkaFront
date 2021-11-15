import React from "react";
import Navigation from "./Navigation";

const Chat = (props) => {
    return(<div className='content'>
        <Navigation log={props.log} setLog={props.setLog} title={props.title}/>    
        <h3>Czat</h3>
    </div>)
}

export default Chat;