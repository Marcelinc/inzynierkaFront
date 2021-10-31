import React, { useState, useEffect } from 'react'

const MachineEdit = (props) => {
    const [production_date,setDate] = useState(props.machine.production_date);
    const [vehicle_type_id,setType] = useState(props.machine.vehicle_type.id);
    const [technical_examination_date,setTechDate] = useState(props.machine.technical_examination_date);
    const [machine_id,setId] = useState(props.machine.id);
    const [working_width,setWidth] = useState(props.machine.working_width)

    const editHandler = () => {
        document.querySelector('#editMachineInfo').innerHTML='Zapisywanie zmian...';
        fetch(process.env.REACT_APP_SERVER+'/api/machine/update',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'name':props.machine.name,machine_id,working_width,vehicle_type_id,'number':props.machine.number})
        })
        .then(response => response.json())
        .then(res => {console.log(res.message);if(res.message === 'Success') props.setMode(false);})
        .catch(err => {console.log(err);
            document.querySelector('#editMAchineInfo').innerHTML='Wystąpił problem podczas edycji!';});
    }


    return(<div className='popup'>
        <div className='popupGarageEdit'>
            <p>Edycja sprzętu</p> 
            <section className='popupForm'>
                <form className='editForm'>
                <label>Rok produkcji <input type='date' value={production_date} onChange={(e) => setDate(e.target.value)}/></label>
                    <label>Badanie techniczne<input type='date' value={technical_examination_date} onChange={
                        e => setTechDate(e.target.value)}></input></label>
                    <label>Szerokość robocza <input type='number' value={working_width} onChange={e => setWidth(e.target.value)}></input></label>
                    <label>Rodzaj pojazdu<select onChange={e => setType(e.target.value)}>
                        <option value={vehicle_type_id}>{props.machine.vehicle_type.name}</option>    
                    </select></label>
                
                </form>
                <section className='vehicle-actions'>
                    <button onClick={() => editHandler()}>Zapisz</button>
                    <button onClick={() => props.setMode(false)}>Anuluj</button>
                    <h3 className='info' id='editMachineInfo'></h3>
                </section>
            </section>
        </div>
    </div>)
}

export default MachineEdit;