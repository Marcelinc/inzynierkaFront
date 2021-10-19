import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Zlecenia = (props) => {

    return(
        <div className='content'>
            <Navigation log={props.log} setLog={props.setLog}/>
            <main><h2>Zlecenia</h2></main>
            <Footer/>
        </div>
    )
}

export default Zlecenia;