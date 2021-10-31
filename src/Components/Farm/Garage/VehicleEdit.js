import React, { useState } from 'react'

const VehicleEdit = (props) => {
    const [production_date,setDate] = useState(props.vehicle.production_date);
    const [type,setNumber] = useState(props.vehicle.vehicle_type.id);
    const [technical_examination_date,setTechDate] = useState(props.vehicle.technical_examination_date);
    const [status,setStatus] = useState(props.vehicle.status_id);
    const [capacity,setCapacity] = useState(props.vehicle.capacity);
    const [power,setPower] = useState(props.vehicle.power);
    const [vin,setVin] = useState(props.vehicle.vin);
    const [date_update_fuel_level,setFuel] = useState(props.vehicle.fuel_level.id);

    const editHandler = () => {
        document.querySelector('#editVehicleInfo').innerHTML='Zapisywanie zmian...';
        fetch(process.env.REACT_APP_SERVER+'/api/vehicle/update',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'name':props.vehicle.name,'vehicle_id':props.vehicle.id,})
        })
        .then(response => response.json())
        .then(res => {console.log(res.message);if(res.message === 'Success') props.setMode(false);})
        .catch(err => {console.log(err);
            document.querySelector('#editVehicleInfo').innerHTML='Wystąpił problem podczas edycji!';});
    }


    return(<div className='popup'>
        <div className='popupGarageEdit'> 
            <p>Edycja pojazdu</p>       
            <section className='popupForm'>
                <form className='editForm'>
                <label>Rok produkcji <input type='date' value={production_date} onChange={(e) => setDate(e.target.value)}/></label>
                    <label>Badanie techniczne <input type='date' value={technical_examination_date} onChange={
                        e => setTechDate(e.target.value)}></input></label>
                    <label>Rodzaj pojazdu <select onChange={e => setNumber(e.target.value)}>
                        <option value={type}>{props.vehicle.vehicle_type.name}</option>
                    </select></label>
                    <label>Status <select onChange={e => setStatus(e.target.value)}>
                        <option value={status}>{props.vehicle.status.status}</option>    
                    </select></label>
                    <label>Pojemność <input type='number' value={capacity ? capacity:''} onChange={e => setCapacity(e.target.value)}/></label>
                    <label>Moc <input type='number' value={power ? power : ''} onChange={e => setPower(e.target.value)}/></label>
                    <label>VIN <input type='text' value={vin ? vin : ''} onChange={e => setVin(e.target.value)}/></label>
                    <label>Stan paliwa <select onChange={e => setFuel(e.target.value)}>
                        <option value={date_update_fuel_level}>{props.vehicle.fuel_level.name}</option>    
                    </select></label>
                </form>
                <section className='vehicle-actions'>
                    <button onClick={() => editHandler()}>Zapisz</button>
                    <button onClick={() => props.setMode(false)}>Anuluj</button>
                    <h3 className='info' id='editVehicleInfo'></h3>
                </section>
            </section>
        </div>
    </div>)
}

export default VehicleEdit;