import React, { useState, useEffect } from 'react';
import { FarmCode } from '../FarmCode';
import WorkerInfo from './WorkerInfo';

const Workers = (props) => {

    const [triggergetCode,setTrigger] = useState(false);
    const [loading,setloading] = useState(true);
    const [error,setError] = useState(false);

    const [workers,setWorkers] = useState([]);
    const [displayed,setDisplayed] = useState([]);

    const [farm_id,setId] = useState(props.farmId);

    
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-workers`,{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                setWorkers(res.data);
                setDisplayed(res.data);
                console.log(res.data)
            } else setError(true);
            setloading(false);
        })
        .catch(err => console.log(err));
    }, [])

    const onGetCodeHandler = () => {
        setTrigger(true)
    }

    const filterHandler = (event) => {
        let reg = new RegExp(event.target.value,'i');
        let selectedWorkers = workers.filter(w => w.name.match(reg)||w.surname.match(reg));
        setDisplayed(selectedWorkers);
        if(selectedWorkers.length === 0){
            document.querySelector('.filterInfo').innerHTML='Brak szukanych plonów';
            document.querySelector('.filterInfo').style.display='inherit';
        }else{
            document.querySelector('.filterInfo').innerHTML='';
            document.querySelector('.filterInfo').style.display='none';
        } 
    }

    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('worker');
        window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/pracownik/${id}`);
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Pracownicy</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' className='searchButton' onChange={filterHandler}/>
                </div>
                <button id='addCrops' onClick={onGetCodeHandler}>Pobierz kod gospodarstwa</button>
            </div>
            <div className='legend' id='workersLegend'>
                <span>Imię i Nazwisko</span>
                <span>Stanowisko</span>
            </div>
            <div id='workers'>
                <p className='filterInfo'></p>
                {loading && <p className='getDataStatus'>Ładowanie danych...</p>} 
                {!loading && error && <p className='getDataStatus'>Błąd podczas pobierania</p>}
                {displayed.map(worker => (
                    <div key={worker.id} className='unit' onClick={() => infoHandler(worker.id)}>
                        <span>{worker.name+' '+worker.surname}</span>
                        <span>{worker.job_title}</span>
                </div>))}
            </div>
        </div>
        {triggergetCode && <FarmCode id={farm_id} setTrigger={setTrigger}/>}
    </section>)
}

export default Workers;