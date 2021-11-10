import React, { useState } from 'react';

const AddPlot = (props) => {

    const [farm_id,setFarm] = useState(props.farmId);

    const [registration_number,setNumber] = useState('');
    const [localization,setLocalization] = useState('');
    const [plant_type_id,setActCrop] = useState(1);
    const [plant_seed_date,setDate] = useState('');
    const [area,setArea] = useState(0);

    const addHandler = (e) => {
        e.preventDefault();
        document.querySelector('#addPlotInfo').innerHTML='';

        if(validation()){
            document.querySelector('#addPlotInfo').innerHTML='Dodawanie...';
            //Send request
            fetch(process.env.REACT_APP_SERVER+'/api/field/create',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({farm_id,registration_number,localization,plant_type_id,plant_seed_date}),
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
            }})
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
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Numer ewidencyjny* <input type='text' onChange={e => setNumber(e.target.value)}/>
                        <span className='info' id='numberInfo'></span></label>
                    <label>Lokalizacja* <input type='text' onChange={e => setLocalization(e.target.value)}/>
                        <span className='info' id='localizationInfo'></span></label>
                    <label>Powierzchnia <input type='text' onChange={e => setArea(e.target.value)}/>
                        <span className='info'></span></label>
                    <label>Aktualna roślina
                        <select onChange={e => setActCrop(e.target.value)}>
                            <option value={1}>Pszenica</option>
                            <option value={2}>Owies</option>
                        </select>
                    </label>
                    <label>Data siewu <input type='date' onChange={e => setDate(e.target.value)}/>
                        <span className='info' id='dateInfo'></span></label>
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addPlotInfo'></h3>
            </section>
        </section>
    </div> : "")
}

export default AddPlot;