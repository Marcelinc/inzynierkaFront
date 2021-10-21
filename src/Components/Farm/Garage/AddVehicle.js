import React, { useState, useEffect } from 'react';

const AddVehicle = (props) => {

    const [name,setName] = useState('');
    const [production_date,setDate] = useState('');
    const [technical_examination_date,setTechDate] = useState('');
    const [number,setNumber] = useState(0);
    const [vehicle_type_id,setType] = useState(1);
    const [status_id,setStatus] = useState(1);
    const [fuel_level_id,setFuelLevel] = useState(1);
    const [farm_id,setFarm] = useState(0);

    useEffect(() => {
        setFarm(props.farmId);
    },[])

    const addHandler = () => {
        console.log(name)
        console.log(production_date);
        console.log(technical_examination_date)
        console.log(number)
        console.log(vehicle_type_id);
        console.log(status_id);
        console.log(fuel_level_id);
        console.log('farm_id'+farm_id);

        fetch(process.env.REACT_APP_SERVER+'/api/vehicle/create',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name,production_date,technical_examination_date,number,vehicle_type_id,status_id,fuel_level_id,farm_id})
        })
        .then(response => response.json())
        .then(res => {console.log(res.data);
            const updateVehicles= [...props.vehicles,res.data];
            props.setVehicles(updateVehicles);
        })
        props.setTrigger(false)
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie pojazdu</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Nazwa <input type='text' onChange={e => setName(e.target.value)}/></label>
                    <label>Rok produkcji <input type='date' onChange={e => setDate(e.target.value)}/></label>
                    <label>Termin badania technicznego <input type='date' onChange={e => setTechDate(e.target.value)}/></label>
                    <label>Numer <input type='number' onChange={e => setNumber(e.target.value)}/></label>
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
                    <label>Pojemność <input type='text'/></label>
                    <label>Moc <input type='text'/></label>
                    <label>VIN <input type='text'/></label>
                    <label>Zdjęcie <input type='file'/></label>
                   
                    
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
            </section>
        </section>
    </div> : "")
}

export default AddVehicle;