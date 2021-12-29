import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from './Footer';
import Navigation from './Navigation';

const ResetPswdReq = (props) => {

    const [email,setEmail] = useState('');
    const [resetSuccess,setResetSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    const sendRequest = () => {
        console.log(email);
        if(email !== '')
        {
            setLoading(true);
            fetch(process.env.REACT_APP_SERVER+"/api/send-reset-password-email",{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify({email})
            })
            .then(response => response.json())
            .then(res => {
                setLoading(false);
                if(res.message && res.message === 'Success'){
                    setResetSuccess(true);
                } 
            })
        }  
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
                        <input type='text' className='loginInput' onChange={e => setEmail(e.target.value)}/>
                    </label>
                </form>
                <button id="logRegButton" onClick={sendRequest}>Prześlij</button>
                <br/>
                <span className='info' id='resetInfo'>{loading ? 'Przetwarzanie...' : resetSuccess ? 'Na podany adres wysłano wskazówki zmiany hasła' : ''}</span>
            </section>
        </main>
        <Footer/>
    </div>)
}

export default ResetPswdReq;