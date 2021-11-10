import React, { useState, useEffect } from 'react'

const MachineEdit = (props) => {
    const [production_date,setDate] = useState(props.machine.production_date);
    const [vehicle_type_id,setType] = useState(props.machine.vehicle_type.id);
    const [working_width,setWidth] = useState(props.machine.working_width)
    const [status_id,setStatus] = useState(props.machine.status.id);

    const [act_production_date,setActDate] = useState(props.machine.production_date);
    const [act_vehicle_type_id,setActType] = useState(props.machine.vehicle_type.id);
    const [act_working_width,setActWidth] = useState(props.machine.working_width)
    const [act_status_id,setActStatus] = useState(props.machine.status.id);

    const editHandler = () => {
        //Set body and validate
        let body= {'machine_id':props.machine.id};
        let validated = false;
        if(act_production_date!=production_date){
            body['production_date']=production_date;
            validated=true;
        }
        if(act_vehicle_type_id!=vehicle_type_id){
            body['vehicle_type_id']=vehicle_type_id;
            validated=true;
        } 
        if(act_working_width!=working_width){
            body['working_width']=working_width;
            validated=true;
        }
        if(act_status_id!=status_id){
            body['status_id']=status_id;
            validated=true;
        }

        if(validated){
            document.querySelector('#editMachineInfo').innerHTML='Zapisywanie zmian...';
            fetch(process.env.REACT_APP_SERVER+'/api/machine/update',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(body),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res.message);if(res.message === 'Success'){
                const updatedMachine = props.machine;
                Object.keys(body).forEach(key => {if(key!='machine_id') updatedMachine[key]=body[key]})
                props.setMachine(updatedMachine);
                props.setMode(false);
            }})
            .catch(err => {console.log(err);
                document.querySelector('#editMachineInfo').innerHTML='Wystąpił problem podczas edycji!';});
        }  else document.querySelector('#editMachineInfo').innerHTML='Wprowadź jakieś zmiany!';
    }


    return(<div className='popup'>
        <div className='popupGarageEdit'>
            <p>Edycja sprzętu</p> 
            <section className='popupForm'>
                <form className='editForm'>
                    <label>Rok produkcji <input type='date' value={production_date} onChange={(e) => setDate(e.target.value)}/></label>
                    <label>Szerokość robocza <input type='number' value={working_width} onChange={e => setWidth(e.target.value)}></input></label>
                    <label>Rodzaj pojazdu<select onChange={e => setType(e.target.value)}>
                        <option value={vehicle_type_id}>{props.machine.vehicle_type.name}</option>    
                    </select></label>
                    <label>Stan<select onChange={e => setStatus(e.target.value)}>
                        <option value={status_id}>{props.machine.status.status}</option>
                        <option value={2}>Niedostępny</option>      
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