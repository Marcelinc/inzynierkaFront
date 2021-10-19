import React, {useState} from 'react';
import CropDelete from './CropDelete';
import CropEdit from './CropEdit';

const CropInfo = (props) => {

    const [triggerDelete,setTriggerDelete] = useState(false);
    const [editMode,setMode] = useState(false);

    return(<div><p className='backToList' onClick={() => props.setType('list')}>Powrót do listy</p>
        <div className='vehicleContent'>
        <section className='overall-info'>
            <div className='vehicle-infoname'>
                <h1>Pszenica</h1>
            </div>
        </section>
            <section className='vehicle-info'>
                <p><span>Rok produkcji</span> props.vehicle.production_date</p>
                <p><span>Termin badania technicznego</span> props.vehicle.technical_examination_date</p>
                <p><span>Rodzaj pojazdu</span> props.vehicle.vehicle_type_id</p>
                <p><span>Status</span> props.vehicle.status_id</p>
                <p><span>Pojemność</span> props.vehicle.capacity</p>
                <p><span>Moc</span> props.vehicle.power</p>
                <p><span>VIN</span> props.vehicle.vin</p>
                <p><span>Stan paliwa </span> props.vehicle.fuel_level_id</p>
                <section className='vehicle-actions'>
                    <button className='MachEdit' onClick={() => setMode(true)}>Edytuj</button>
                    <button className='MachDelete' onClick={() => setTriggerDelete(true)}>Usuń</button>
                </section>
            </section>
        </div>
        <CropDelete trigger={triggerDelete} setTrigger={setTriggerDelete} setDataType={props.setType} />
        {editMode && <CropEdit setMode={setMode}/>}
    </div>)
}

export default CropInfo;