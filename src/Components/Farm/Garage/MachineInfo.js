import React, {useEffect, useState} from 'react';
import DeleteMachine from './DeleteMachine';
import MachineEdit from './MachineEdit';

const MachineInfo = (props) => {
    const [triggerDeleteM,setTriggerDeleteM] = useState(false);
    const [editMode,setMode] = useState(false);

    useEffect(() => {
        
        console.log(props.machine)
    }, [])

    const onReturnHandler = () => {
        props.setDataType('list');
    }

    const onEditClick = function (id){
        console.log('edit clicked '+id);
    }

    const onDeleteClick = (id) => {
        console.log('delete clicked '+id);
        setTriggerDeleteM(true);
    }

    return(<div>
        <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
        <div className='vehicleContent'>
        <section className='overall-info'>
            <div className='vehicleImg'>
                <img src={props.machine.image_path} alt='machine'></img>
                <span className='imgInfo'>Zmień zdjęcie</span>
            </div>
            <div className='vehicle-infoname'>
                <h1>{props.machine.name}</h1>
                <p>Numer {props.machine.number}</p>
            </div>
        </section>
        <section className='vehicle-info'>
                <p><span>Rok produkcji</span> {props.machine.production_year}</p>
                <p><span>Rodzaj pojazdu</span> {props.machine.vehicle_type_id}</p>
                <p><span>Szerokość </span> {props.machine.working_width}</p>
                <section className='vehicle-actions'>
                    <button className='MachEdit' onClick={() => setMode(true)}>Edytuj</button>
                    <button className='MachDelete' onClick={() => onDeleteClick(props.machine.id)}>Usuń</button>
                </section>
        </section>
        </div>
        <DeleteMachine trigger={triggerDeleteM} setTrigger={setTriggerDeleteM} setMachine={props.setMachines} machines={props.machines} 
            setDataType={props.setDataType} id={props.machine.id}/>
        {editMode && <MachineEdit machine={props.machine} setMode={setMode}/>}
    </div>)
}

export default MachineInfo;
