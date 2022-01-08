import React, { useState, useEffect } from 'react';

const AddPlot = (props) => {

    const [farm_id,setFarm] = useState(props.farmId);

    const [registration_number,setNumber] = useState('');
    const [localization,setLocalization] = useState('');
    const [plant_type_id,setActCrop] = useState(1);
    const [plant_seed_date,setDate] = useState('');
    const [area,setArea] = useState(0);

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [plant_types,setPlant_types] = useState([]);

    useEffect(() => {
        if(props.job_title === 'Pracownik biurowy' || props.job_title === 'Właściciel' || props.job_title === 'Pracownik rolny'){
            setLoading(true);
            fetch(process.env.REACT_APP_SERVER+'/api/lookup-table/plant-type/getAll',{
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res); 
                if(res.message === 'Success') {
                    console.log(res.data)
                    setPlant_types(res.data);
                } else setError(true);
                setLoading(false);
            })
            .catch(err => console.log(err))
        }
    },[])

    const addHandler = (e) => {
        e.preventDefault();
        document.querySelector('#addPlotInfo').innerHTML='';

        if(validation()){
            document.querySelector('#addPlotInfo').innerHTML='Dodawanie...';
            //Send request
            fetch(process.env.REACT_APP_SERVER+'/api/field/create',{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify({farm_id,registration_number,localization,plant_type_id,plant_seed_date,area}),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {if(res.message==='Success'){
                console.log(res) 
                const updatedPlots = [...props.plots,res.data];
                props.setPlots(updatedPlots);
                const updatedDisplay = [...props.display,res.data];
                props.setDisplayed(updatedDisplay);
                props.setTrigger(false);
                clearFormData();
                } else document.querySelector('#addPlotInfo').innerHTML='Błąd podczas dodawania';
            })
            .catch(err => {console.log(err);document.querySelector('#addPlotInfo').innerHTML='Błąd podczas dodawania';})
        }   
    }

    const validation = () => {
        let validate=true;

        if(!registration_number){
            validate=false;
            document.querySelector('#numberInfo').innerHTML='Wprowadź numer!'
        } else document.querySelector('#numberInfo').innerHTML='';

        if(!localization){
            validate=false;
            document.querySelector('#localizationInfo').innerHTML='Podaj lokalizacje!'
        } else document.querySelector('#localizationInfo').innerHTML=''

        if(plant_seed_date){
            let actDate = new Date();
            let seedDate = new Date(plant_seed_date);
            if(actDate < seedDate){
                validate=false;
                document.querySelector('#dateInfo').innerHTML='Wprowadź przeszłą datę!';
            } else document.querySelector('#dateInfo').innerHTML='';
        }

        return validate;
    }

    const clearFormData = () => {
        setNumber('');setLocalization('');setActCrop(1);setDate(0);
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie działki</p>
            {loading ? 'Wczytywanie...' : error ? 'Błąd podczas wczytywania. Spróbuj później.' : <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Numer ewidencyjny* <input type='text' onChange={e => setNumber(e.target.value)}/>
                        <span className='info' id='numberInfo'></span></label>
                    <label>Lokalizacja* <input type='text' onChange={e => setLocalization(e.target.value)}/>
                        <span className='info' id='localizationInfo'></span></label>
                    <label>Powierzchnia <input type='text' onChange={e => setArea(e.target.value)}/>
                        <span className='info'></span></label>
                    <label>Aktualna uprawa
                        <select onChange={e => setActCrop(e.target.value)}>
                            {plant_types.length > 0 && plant_types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                        </select>
                    </label>
                    <label>Data siewu <input type='date' onChange={e => setDate(e.target.value)}/>
                        <span className='info' id='dateInfo'></span></label>
                </form>
            </section>}
            {loading || error ? '' : <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addPlotInfo'></h3>
            </section>}
        </section>
    </div> : "")
}

export default AddPlot;