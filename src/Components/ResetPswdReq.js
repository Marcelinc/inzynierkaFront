import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from './Footer';
import Navigation from './Navigation';

const ResetPswdReq = (props) => {

    const [email,setEmail] = useState('');

    const sendRequest = () => {
        console.log(email);
    }

    if(props.log)
        return <Redirect to='/user'/>

    return(
    <div className='content'>
        <Navigation log={props.log} setLog={props.setLog}/>
        <main>
            <section className='loginSection'>
                <h2>Zresetuj hasło</h2>
                <form>
                    <label>
                        Email
                        <input type='text' onChange={e => setEmail(e.target.value)}/>
                    </label>
                </form>
                <button id="logRegButton" onClick={sendRequest}>Prześlij</button>
            </section>
        </main>
        <Footer/>
    </div>)
}

export default ResetPswdReq;