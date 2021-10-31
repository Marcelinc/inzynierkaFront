import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";


const LoginForm = (props) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [forgot,setForgot] = useState(false);

    useEffect(() => {
        return () => {
            setEmail('');
            setPassword('');
            setForgot(false);
        }
    }, []) 

    if(props.log)
        return <Redirect to="/user"/>

    if(forgot)
        return <Redirect to='/resetPassword' />

    const validation = () => {
        let validated  = true;

        //Password validation
        if(!password){
            validated=false;
            document.getElementById('loginPassword').innerHTML='Wprowadź hasło!';
        } else document.getElementById('loginPassword').innerHTML='';

        //Email validation
        if(!email || !email.match(/^[a-z0-9]+[\.]?[a-z0-9]+[\@][a-z]{2,10}[\.][a-z]{2,3}$/i)){
            validated=false;
            document.getElementById('loginEmail').innerHTML='Wprowadź poprawny email!';
        } else document.getElementById('loginEmail').innerHTML='';

        return validated;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        if(validation()){
            document.querySelector('#loginInfo').innerHTML='Logowanie...';
            fetch(process.env.REACT_APP_SERVER+"/api/login",{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                credentials: 'include',
                body: JSON.stringify({email,password})
            })
            .then(response => response.json())
            .then(res => {if(res.message === 'Success') props.setLog(true); 
                else {
                    document.querySelector('#loginInfo').innerHTML='Niepoprawny email lub hasło!'}
                    setPassword('');
                })
            .catch(err => {document.querySelector('#loginInfo').innerHTML='Błąd podczas logowania. Spróbuj później'; console.log(err)});
        }
    }

    const ForgotPassword = () => {
        setForgot(true);
    }

    return(
        <div className='content'>
            <Navigation log={props.log} setLog={props.setLog}/>
            <main>
                <section className='loginSection'>
                    <h3>Zaloguj się</h3>
                    <form onSubmit={submitHandler}>
                        <label>Email <input type="email" name="email" className='loginInput' 
                            value={email} onChange={e => setEmail(e.target.value)}></input>
                        </label>
                        <span className='info' id='loginEmail'></span>
                        <label>Hasło <input type="password" name="password" className='loginInput' 
                            value={password} onChange={e => setPassword(e.target.value)}></input>
                        </label>
                        <span className='info' id='loginPassword'></span>
                        <button id="logRegButton" type="submit">Zaloguj</button>
                        <span className='info' id='loginInfo'></span>
                    </form>
                    <p onClick={ForgotPassword}>Nie mogę się zalogować</p>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default LoginForm;
