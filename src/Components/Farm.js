import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


const Farm = (props) => {

    const history = useHistory();
    const [access_code,setCode] = useState('');
    const [validated,setValidated] = useState(true);
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [hasFarm,setFarm] = useState(props.hasFarm)

    const [manageTileStyle,setManageTileStyle] = useState({});
    const [workersTileStyle,setWorkersTileStyle] = useState({});

    useEffect(() => {
        console.log(hasFarm)
        if(props.job_title !== 'Właściciel')
            setManageTileStyle({'opacity':'0.8','cursor':'default', 'color': '#22281b'}); 
        if(props.job_title === 'Pracownik rolny'){
            setWorkersTileStyle({'opacity':'0.8','cursor':'default', 'color': '#22281b'}); 
        }
    },[hasFarm])

    const joinHandler = () => {
        if(access_code){
            setLoading(true);
            setError(false)
            fetch(process.env.REACT_APP_SERVER+'/api/attach-worker',{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify({access_code}),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if(res.message ==='Success'){
                    if(res.id)
                        setFarm(true);
                        //props.content('farm');
                    window.location.reload();
                } else setError(true);
                setLoading(false)
            })
            setValidated(true)
        }
        else setValidated(false)
    }

    const onGarage = (e) =>{
        props.content('garage');
        window.history.pushState(null,'MyFarm','/gospodarstwo/garaz');
    }

    const onCrops = (e) => {
        if(props.job_title === 'Właściciel' || props.job_title === 'Pracownik biurowy'){
            props.content('crops');
            window.history.pushState(null,'MyFarm','/gospodarstwo/plony');
        }
    }

    const onChemicals = (e) => {
        props.content('chemicals');
        window.history.pushState(null,'MyFarm','/gospodarstwo/srodkiChemiczne');
    }

    const onWorkers = (e) => {
        if(props.job_title === 'Właściciel' || props.job_title === 'Pracownik biurowy'){
            props.content('workers');
            window.history.pushState(null,'MyFarm','/gospodarstwo/pracownicy');
        }
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
        window.history.pushState(null,'MyFarm','/kreatorGospodarstwa');
    }

    return(
        hasFarm === null ? <section className='farm'>
            <h2>Nie jesteś w żadnym gospodarstwie</h2>
            <p><Link to='#' onClick={onCreateFarm}>Załóż</Link> swoje gospodarstwo <br/> lub <br/> dołącz do istniejącego</p>
            <section id='farmCode'>
                <label>
                    <h4>Kod gospodarstwa</h4>
                    <input id='insertFarmCode' type='text'placeholder='Wprowadź kod' onChange={e => setCode(e.target.value)}></input>
                </label>
                <br/>
                <button onClick={joinHandler}>Dołącz</button>
                <br/>
                <span className='info'>{!validated ? 'Podaj kod!' : error ? 'Błąd podczas przetwarzania' : loading ? 'Przetwarzanie...' : ''}</span>
            </section>
        </section>:
        <section className='data'>
            <div id='menu'>
                <div onClick={onGarage} className='tile'>Garaż <i className="icon-truck"></i></div>
                <div onClick={onCrops} className='tile'  style={workersTileStyle}>Plony <i className="icon-garden"></i></div>
                <div onClick={onChemicals} className='tile'>Środki chemiczne <i className="icon-tint"></i></div>
                <div onClick={onWorkers} className='tile' style={workersTileStyle}>Pracownicy <i className="icon-users"></i> </div>
                <div onClick={onPlot} className='tile'>Działki <i className="icon-location"></i></div>
                <div onClick={onManage} className='tile' style={manageTileStyle}>Zarządzanie  <i className="icon-cogs"></i></div>
            </div>
        </section>
    )
}

export default Farm;