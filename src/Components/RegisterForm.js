import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";


const RegisterForm = (props) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [registered,setRegistered] = useState(false);
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [town,setTown] = useState('');

    const [countryList,setCountryList] = useState([{id:0,name:'Ładowanie..'}]);
    const [country_id,setCountry] = useState(0);

    useEffect(() => {
        //Get country list
        fetch(process.env.REACT_APP_SERVER+'/api/lookup-table/country/getAll',{
            method:'POST',
            headers: {'Content-Type':'application/json'}
        })
        .then(response => response.json())
        .then(res => {setCountryList(res.data); setCountry(1); 
            if(document.getElementById('countrySelect')) document.getElementById('countrySelect').disabled=false; })
        .catch(err => console.log(err));
    },[])

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(country_id);
        if(validation()){
            document.querySelector('#registerInfo').innerHTML='Przetwarzanie...';
            fetch(process.env.REACT_APP_SERVER+"/api/register",{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify({email,password,name,surname,town,country_id})
            })
            .then(response => {console.log(response.ok);if(response.ok) setRegistered(true);
                return response.json()
            })
            .then(res => {
                if(res.errors){
                    if(res.errors.email[0] === 'The email has already been taken.') 
                    if(document.querySelector('#registerInfo')) 
                        document.querySelector('#registerInfo').innerHTML='Konto o podanym adresie już istnieje!'
                    else if(res.errors.email[0] === 'The email field is required.')
                        if(document.querySelector('#registerInfo')) 
                            document.querySelector('#registerInfo').innerHTML='Nie podano adresu email!'
                } 
            })
            .catch(err => {
                if(document.querySelector('#registerInfo')) 
                    document.querySelector('#registerInfo').innerHTML='Błąd podczas rejestracji. Spróbuj później'; console.log('error: '); console.log(err)
            });}
    }

    const validation = () => {
        let validated = true;

        //Email validation
        if(!email || !email.match(/^[a-z0-9]+[\.]?[a-z0-9]+[\@][a-z]{2,6}[\.][a-z]{2,3}$/i)){
            validated = false;
            document.getElementById('emailValidate').innerHTML='Wprowadź poprawny email!';
        } else document.getElementById('emailValidate').innerHTML='';

        //Password validation
        if(password.length < 8){
            validated=false;
            document.getElementById('passwordValidate').innerHTML='Hasło musi zawierać co najmniej 8 znaków!';
        } else document.getElementById('passwordValidate').innerHTML='';

        if(!password){
            validated=false;
            document.getElementById('passwordValidate').innerHTML='Wprowadź hasło!';
        }

        //Name validation
        if(name.match(/[^a-zóżź]/i)){
            validated=false;
            document.getElementById('nameValidate').innerHTML='Niepoprawne imię';
        } else document.getElementById('nameValidate').innerHTML='';

        if(name.length < 3){
            validated=false;
            document.getElementById('nameValidate').innerHTML='Imie musi składać się z co najmniej 3 znaków!';
        }

        if(!name){
            validated=false;
            document.getElementById('nameValidate').innerHTML='Wprowadź imie!';
        }

        //Surname validation
        if(surname.match(/[^a-zóżź]/i)){
            validated=false;
            document.getElementById('surnameValidate').innerHTML='Niepoprawne nazwisko';
        } else document.getElementById('surnameValidate').innerHTML='';

        if(surname.length < 3){
            validated=false;
            document.getElementById('surnameValidate').innerHTML='Nazwisko musi składać się z co najmniej 3 znaków!';
        }

        if(!surname){
            validated=false;
            document.getElementById('surnameValidate').innerHTML='Wprowadź nazwisko!';
        }

        //Town validation
        if(town.match(/[^a-zó]/i)){
            validated=false;
            document.getElementById('townValidate').innerHTML='Niepoprawne miasto';
        } else document.getElementById('townValidate').innerHTML='';

        if(town.length < 3 || town.length > 40){
            validated = false;
            document.getElementById('townValidate').innerHTML='Długość nazwy miasta musi wynosić od 3 do 40 znaków!';
        }

        if(!town){
            validated=false;
            document.getElementById('townValidate').innerHTML='Wprowadź miasto!';
        }
        if(!country_id){
            validated=false;
            document.getElementById('countryValidate').innerHTML='Wprowadź miasto!';
        }

        return validated;
    }

    if(registered)
        return <Redirect to="/logowanie"/>

    if(props.log)
        return <Redirect to='/uzytkownik'/>

    return(
        <div className='content'>
            <Navigation log={props.log} setLog={props.setLog}/>
            <main>
                <section className='loginSection'>
                    <h3>Zajerestruj się</h3>
                    <form className='registerForm' onSubmit={submitHandler}>
                        <label><span className='registerLabel'>Email</span> <input type="text" name="email" className='registerInput' onChange={e => setEmail(e.target.value)}></input></label>
                        <span className='info' id='emailValidate'></span>
                        <label><span className='registerLabel'>Hasło</span> <input type="password" name="password" className='registerInput' onChange={e => setPassword(e.target.value)}></input></label>
                        <span className='info' id='passwordValidate'></span>
                        <label><span className='registerLabel'>Imie</span> <input type="text" name="name" className='registerInput' onChange={e => setName(e.target.value)}></input></label>
                        <span className='info' id='nameValidate'></span>
                        <label><span className='registerLabel'>Nazwisko</span> <input type="text" name="surname" className='registerInput' onChange={e => setSurname(e.target.value)}></input></label>
                        <span className='info' id='surnameValidate'></span>
                        <label><span className='registerLabel'>Miasto</span> <input type="text" name="town" className='registerInput' onChange={e => setTown(e.target.value)}></input></label>
                        <span className='info' id='townValidate'></span>
                        <label><span className='registerLabel'>Kraj</span> 
                            <select type="text" name="country_id" onChange={e => setCountry(e.target.value)}>
                                {countryList.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}
                            </select>
                        </label>
                        <span className='info' id='countryValidate'></span>
                        <button id="logRegButton" type="submit">Rejestruj</button>
                        <span className='info' id='registerInfo'></span>
                    </form>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default RegisterForm;
