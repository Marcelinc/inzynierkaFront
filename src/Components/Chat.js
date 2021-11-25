import React from "react";
import Navigation from "./Navigation";

const Chat = (props) => {
    return(<div className='content'>
        <Navigation log={props.log} setLog={props.setLog} title={props.title}/>
        <div className='chatContent'>
            <section className='chatBar'>
                <h3>Kontakty</h3>
            </section>
            <section class='data'>
                <h3>Czat</h3>
            </section>  
        </div>
    </div>)
}

export default Chat;