import React, { useState, useEffect } from 'react';
import WorkerInfo from './WorkerInfo';

const Workers = (props) => {

    const [trigger,setTrigger] = useState(false);
    const [loading,setloading] = useState(true);

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
                setloading(false);
                console.log(res.data)
            } else document.querySelector('.getDataStatus').innerHTML='Błąd podczas pobierania'
        })
        .catch(err => {console.log(err); document.querySelector('.getDataStatus').innerHTML='Błąd podczas pobierania'});
    }, [])

    const onAddClick = () => {

    }

    const filterHandler = () => {
        console.log('filtr');
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
                <button id='addCrops' onClick={onAddClick}>Pobierz kod gospodarstwa</button>
            </div>
            <div className='legend' id='workersLegend'>
                <span>Imię i Nazwisko</span>
                <span>Stanowisko</span>
            </div>
            <div id='workers'>
                <p className='filterInfo'></p>
                {loading && <p className='getDataStatus'>Ładowanie danych...</p>} 
                {displayed.map(worker => (
                    <div key={worker.id} className='unit' onClick={() => infoHandler(worker.id)}>
                        <span>{worker.name+' '+worker.surname}</span>
                        <span>{worker.job_title}</span>
                </div>))}
            </div>
        </div>
    </section>)
}

export default Workers;