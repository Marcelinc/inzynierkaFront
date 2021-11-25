import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


const Farm = (props) => {

    const history = useHistory();
    const [farmCode,setCode] = useState('');
    const [validated,setValidated] = useState(true);

    const [tileStyle,setStyle] = useState({});

    useEffect(() => {
        if(props.job_title !== 'Właściciel')
            setStyle({'opacity':'0.8','cursor':'default', 'color': '#22281b'}); 
    },[])

    const joinHandler = () => {
        if(farmCode){
            console.log('send request');
            setValidated(true)
        }
            
        else setValidated(false)

    }

    const onGarage = (e) =>{
        props.content('garage');
        window.history.pushState(null,'MyFarm','/gospodarstwo/garaz');
    }

    const onCrops = (e) => {
        props.content('crops');
        window.history.pushState(null,'MyFarm','/gospodarstwo/plony');
    }

    const onChemicals = (e) => {
        props.content('chemicals');
        window.history.pushState(null,'MyFarm','/gospodarstwo/srodkiChemiczne');
    }

    const onWorkers = (e) => {
        props.content('workers');
        window.history.pushState(null,'MyFarm','/gospodarstwo/pracownicy');
    }

    const onPlot = (e) => {
        props.content('plots');
        window.history.pushState(null,'MyFarm','/gospodarstwo/dzialki');
    }

    const onManage = (e) => {
        if(props.job_title === 'Właściciel'){
            props.content('manage');
            window.history.pushState(null,'MyFarm','/gospodarstwo/zarzadzanie');
        }
    }

    const onCreateFarm = (e) => {
        props.content('creator')
        history.push('/kreatorGospodarstwa');
    }

    return(
        props.hasFarm === null ? <section className='farm'>
            <h2>Nie jesteś w żadnym gospodarstwie</h2>
            <p><Link to='#' onClick={onCreateFarm}>Załóż</Link> swoje gospodarstwo <br/> lub <br/> dołącz do istniejącego</p>
            <section id='farmCode'>
                <labe>
                    <h4>Kod gospodarstwa</h4>
                    <input id='insertFarmCode' type='text'placeholder='Wprowadź kod' onChange={e => setCode(e.target.value)}></input>
                </labe>
                <br/>
                <button onClick={joinHandler}>Dołącz</button>
                <br/>
                <span className='info'>{validated ? '' : 'Podaj kod!'}</span>
            </section>
        </section>:
        <section className='data'>
            <div id='menu'>
                <div onClick={onGarage} className='tile'>Garaż <i className="icon-truck"></i></div>
                <div onClick={onCrops} className='tile'>Plony <i className="icon-garden"></i></div>
                <div onClick={onChemicals} className='tile'>Środki chemiczne <i className="icon-tint"></i></div>
                <div onClick={onWorkers} className='tile'>Pracownicy <i className="icon-users"></i> </div>
                <div onClick={onPlot} className='tile'>Działki <i className="icon-location"></i></div>
                <div onClick={onManage} className='tile' style={tileStyle}>Zarządzanie  <i className="icon-cogs"></i></div>
            </div>
        </section>
    )
}

export default Farm;