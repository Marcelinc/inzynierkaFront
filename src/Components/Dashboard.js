import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/user.css';
import Photo from '../img/userDefault.png';

const Dashboard = (props) => {

    const [hasUnread,setUnread] = useState(false);
    const [refresh,setRefresh] = useState(false);
    
    const history = useHistory();

    useEffect(() => {
        //get unread notifications status
        if(props.title === 'Pracownik biurowy' || props.title === 'Właściciel'){
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${props.farmId}/worker/${props.id}/notification/has-unread`,{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                'X-Requested-With':'XMLHttpRequest'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res); if(res.data === true) setUnread(true); else setUnread(false)})
            .catch(err => console.log(err))

            let updateRefresh = !refresh;
            setTimeout(() => setRefresh(updateRefresh),60000)
        }
        
    },[refresh])

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
        window.history.pushState(null,'MyFarm','/uzytkownik');
    }

    const onMojeZleceniaClick = (e) => {
        props.content('myorders');
        window.history.pushState(null,'MyFarm','/uzytkownik/zlecenia');
    }

    const onPowiadomieniaClick = (e) => {
        props.content('note');
        window.history.pushState(null,'MyFarm','/uzytkownik/powiadomienia')
    }
        
    return(<section className="dash" >
        <div className='profile'>
            <div className='photo'><img src={Photo} alt='userImg'></img></div>
            <div className='Username'>{props.name+' '+props.surname}</div>
        </div>
        <div className='user-nav'>
            <p className='dashLink' onClick={onDaneClick}>Dane osobowe</p>
            <p className='dashLink' onClick={onGospodarstwoClick}>Gospodarstwo</p>
            {props.title !== null && props.title !== 'Niezatrudniony' && <p className='dashLink' onClick={onMojeZleceniaClick}>Moje zlecenia</p>}
            {props.title !== null && <p className='dashLink' onClick={onStatsClick}>Statystyki</p>}
            {(props.title === 'Pracownik biurowy' || props.title === 'Właściciel') && <p className={hasUnread ? 'dashLink unseenLink' : 'dashLink'} onClick={() => {onPowiadomieniaClick(); setUnread(false)}}>Powiadomienia</p>}
            <p className='dashLink' onClick={onClickHandle}><Link to='/logowanie'/>Wyloguj</p>
        </div>
    </section>)
}

export default Dashboard;