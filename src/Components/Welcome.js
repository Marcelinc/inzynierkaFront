import React from "react"
import {Link, Redirect} from "react-router-dom"
import Footer from "./Footer"
import Navigation from "./Navigation"


const Welcome = (props) => {

    if(props.log)
        return <Redirect to='/uzytkownik' />

    return(
        <div className='content'>
            <Navigation log={props.log} setLog={props.setLog} title={props.title}/>
            <main className="welcome">
                <div id="welcomeContent">
                    <p>Jesteś rolnikiem i szukasz nowych rozwiązań?</p>
                    <p>Dołącz do nas!</p>
                    <Link to="/rejestracja"><button id="wreg">Załóż konto</button></Link>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Welcome;