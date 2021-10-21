import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
import '../css/user.css';
import Photo from '../img/userDefault.png';

const Dashboard = (props) => {
    
    const history = useHistory();

    const onClickHandle = () => {
        fetch(process.env.REACT_APP_SERVER+"/api/logout",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })
        .then(() => {props.setLogIn(false); history.push('/logowanie');});
    }

    const onGospodarstwoClick = (e) => {
        props.content('farm');
        window.history.pushState(null,'MyFarm','/gospodarstwo');
    }

    const onStatsClick = (e) => {
        props.content('stats');
        window.history.pushState(null,'MyFarm','/statystyki');
    }

    const onDaneClick = (e) => {
        props.content('');
        window.history.pushState(null,'MyFarm','/user');
    }

    const onMojeZleceniaClick = (e) => {
        props.content('zlecenia');
        window.history.pushState(null,'MyFarm','/user/zlecenia');
    }

    const onPowiadomieniaClick = (e) => {
        props.content('note');
        window.history.pushState(null,'MyFarm','/user/powiadomienia')
    }
        
    return(<section className="dash" >
        <div className='profile'>
            <div className='photo'><img src={Photo} alt='userImg'></img></div>
            <div className='Username'>{props.name+' '+props.surname}</div>
        </div>
        <div className='user-nav'>
            <p className='dashLink' onClick={onDaneClick}>Dane osobowe</p>
            <p className='dashLink' onClick={onGospodarstwoClick}>Gospodarstwo</p>
            {props.title !== null && <p className='dashLink' onClick={onMojeZleceniaClick}>Moje zlecenia</p>}
            {props.title !== 'Pracownik rolny' && props.title !== null && <p className='dashLink' onClick={onStatsClick}>Statystyki</p>}
            {props.title !== 'Pracownik rolny' && props.title !== null && <p className='dashLink' onClick={onPowiadomieniaClick}>Powiadomienia</p>}
            <p className='dashLink' onClick={onClickHandle}><Link to='/logowanie'/>Wyloguj</p>
        </div>
    </section>)
}

export default Dashboard;