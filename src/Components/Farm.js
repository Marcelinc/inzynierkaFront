import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


const Farm = (props) => {

    const history = useHistory();
    const [hasFarm,setHasFarm] = useState(false);

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
        props.content('plot');
        window.history.pushState(null,'MyFarm','/gospodarstwo/dzialki');
    }

    const onManage = (e) => {
        props.content('manage');
        window.history.pushState(null,'MyFarm','/gospodarstwo/zarzadzanie');
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
                <h4>Kod gospodarstwa</h4>
                <input type='text'></input>
                <button>Dołącz</button>
            </section>
        </section>:
        <section className='data'>
            <div id='menu'>
                <div onClick={onGarage} className='tile'>Garaż <i className="icon-truck"></i></div>
                <div onClick={onCrops} className='tile'>Plony <i className="icon-garden"></i></div>
                <div onClick={onChemicals} className='tile'>Środki chemiczne <i className="icon-tint"></i></div>
                <div onClick={onWorkers} className='tile'>Pracownicy <i className="icon-users"></i> </div>
                <div onClick={onPlot} className='tile'>Działki <i className="icon-location"></i></div>
                <div onClick={onManage} className='tile'>Zarządzanie  <i className="icon-cogs"></i></div>
            </div>
        </section>
    )
}

export default Farm;