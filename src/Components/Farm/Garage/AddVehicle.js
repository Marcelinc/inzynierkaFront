import React, { useState, useEffect } from 'react';

const AddVehicle = (props) => {

    const [name,setName] = useState('');
    const [production_date,setDate] = useState('');
    const [technical_examination_date,setTechDate] = useState('');
    //const [number,setNumber] = useState(0);
    const [vehicle_type_id,setType] = useState(1);
    const [status_id,setStatus] = useState(1);
    const [fuel_level_id,setFuelLevel] = useState(1);
    const [farm_id,setFarm] = useState(props.farmId);
    const [capacity,setCapacity] = useState(0);
    const [power,setPower] = useState(0);
    const [vin,setVin] = useState('');
    const [image,setImage] = useState('');


    const addHandler = (event) => {
        event.preventDefault();
        document.querySelector('#addVehicleInfo').innerHTML='';
        if(validation()){
            document.querySelector('#addVehicleInfo').innerHTML='Dodawanie...';
            //Create request body
            let body = {name,production_date,technical_examination_date,
                vehicle_type_id,status_id,fuel_level_id,farm_id};
            if(capacity) body['capacity']=capacity;
            if(power) body['power']=power;
            if(vin) body['vin']=vin;
            if(image) body['image']=image;
            //Send request
            fetch(process.env.REACT_APP_SERVER+'/api/vehicle/create',{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                    'Accept':'application/json'},
                body: JSON.stringify(body),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res.data);
                if(res.message === 'Success'){
                    const updateVehicles= [...props.vehicles,res.data];
                    props.setVehicles(updateVehicles);
                    props.setTrigger(false);
                    clearFormData();
                }
            })
            .catch(err => {console.log(err);
            document.querySelector('#addVehicleInfo').innerHTML='Błąd podczas dodawania';});
        }
    }

    const validation = () => {
        let validate = true;;

        //Name validation
        if(!name){
            validate=false;
            document.querySelector('#vehicleName').innerHTML='Podaj nazwę!'
        } else document.querySelector('#vehicleName').innerHTML='';

        //Production date validation
        let date = new Date();
        let productionDate = new Date(production_date);
        
        if(!production_date){
            validate=false;
            document.querySelector('#vehicleYear').innerHTML='Wprowadź datę!'
        } else document.querySelector('#vehicleYear').innerHTML='';

        if(productionDate.getTime()>date.getTime()){
            validate=false;
            document.querySelector('#vehicleYear').innerHTML='Wprowadź minioną datę!'
        } 

        //Tech date validation
        let techDate = new Date(technical_examination_date);
        if(!technical_examination_date){
            validate=false;
            document.querySelector('#vehicleTechDate').innerHTML='Wprowadź datę!'
        } else document.querySelector('#vehicleTechDate').innerHTML='';

        if(techDate.getTime()<date.getTime()){
            validate=false;
            document.querySelector('#vehicleTechDate').innerHTML='Wprowadź przyszłą datę!'
        } 
        return validate;
    }

    const clearFormData = () => {
        setName('');setDate('');setTechDate('');setType(1);setStatus(1);setFuelLevel(1);
        setCapacity(0);setPower(0);setVin('');setImage('');
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie pojazdu</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                <label>Nazwa* <input type='text' onChange={e => setName(e.target.value)}/>
                        <span id='vehicleName' className='info'></span></label>
                    <label>Rok produkcji* <input type='date' onChange={e => setDate(e.target.value)}/>
                        <span id='vehicleYear' className='info'></span></label>
                    <label>Badanie techniczne* <input type='date' onChange={e => setTechDate(e.target.value)}/>
                        <span id='vehicleTechDate' className='info'></span></label>
                    <label>Rodzaj pojazdu 
                        <select onChange={e => setType(e.target.value)}>
                            <option value='1'>Ciągnik</option>
                            <option value='2'>Opryskiwacz</option>
                            <option value='3'>Pług</option>
                        </select>
                    </label>
                    <label>Status
                        <select onChange={e => setStatus(e.target.value)}>
                            <option value='1'>Dostępny</option>
                            <option value='2'>Niedostępny</option>
                            <option value='3'>Zepsuty</option>
                        </select>            
                    </label>
                    <label>Stan paliwa 
                        <select onChange={e => setFuelLevel(e.target.value)}>
                            <option value='1'>Pełny zbiornik</option>
                            <option value='2'>Połowa zbiornika</option>
                            <option value='3'>Wymaga zatankowania</option>
                        </select>
                    </label>
                    <label>Pojemność <input type='number' onChange={e => setCapacity(e.target.value)}/>
                        <span id='vehicleCapacity' className='info'></span></label>
                    <label>Moc <input type='number' onChange={e => setPower(e.target.value)}/>
                        <span id='vehiclePower' className='info'></span></label>
                    <label>VIN <input type='text' onChange={e => setVin(e.target.value)}/>
                        <span id='vehicleVin' className='info'></span></label>
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => {props.setTrigger(false); clearFormData();}}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addVehicleInfo'></h3>
            </section>
        </section>
    </div> : "")
}

export default AddVehicle;