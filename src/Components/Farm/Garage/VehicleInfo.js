import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import DeleteVehicle from './DeleteVehicle';
import VehicleEdit from './VehicleEdit';

const VehicleInfo = (props) => {
    const [triggerDeleteV,setTriggerDeleteV] = useState(false);
    const [editMode,setMode] = useState(false);
    const history = useHistory();

    useEffect(() => {
        
        console.log(props.vehicle)
    }, [])

    const onReturnHandler = () => {
        props.setDataType('list');
        history.push('/gospodarstwo/garaz');
    }

    const onEditClick = function (){
        setMode(true);
    }

    const onDeleteClick = (id) => {
        console.log('delete clicked '+id);
        setTriggerDeleteV(true);
    }

    return(<div>
        <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
        <div className='vehicleContent'>
        <section className='overall-info'>
            <div className='vehicleImg'>
                <img src={props.vehicle.image_path} alt='vehicle'></img>
            </div>
            <div className='vehicle-infoname'>
                <h1>{props.vehicle.name}</h1>
                <p>Numer {props.vehicle.number}</p>
            </div>
        </section>
             <section className='vehicle-info'>
             <p><span>Rok produkcji</span> {props.vehicle.production_date}</p>
                <p><span>Termin badania technicznego</span> {props.vehicle.technical_examination_date}</p>
                <p><span>Rodzaj pojazdu</span> {props.vehicle.vehicle_type.name}</p>
                <p><span>Status</span> {props.vehicle.status.status}</p>
                <p><span>Pojemność</span> {props.vehicle.capacity}</p>
                <p><span>Moc</span> {props.vehicle.power}</p>
                <p><span>VIN</span> {props.vehicle.vin}</p>
                <p><span>Stan paliwa </span> {props.vehicle.fuel_level.name}</p>
                <p>Ostatnia aktualizacja <span>{props.vehicle.date_update_fuel_level}</span></p>
                <section className='vehicle-actions'>
                    <button className='MachEdit' onClick={() => onEditClick()}>Edytuj</button>
                    <button className='MachDelete' onClick={() => onDeleteClick(props.vehicle.id)}>Usuń</button>
                </section>
            </section>
        </div>
        <DeleteVehicle trigger={triggerDeleteV} setTrigger={setTriggerDeleteV} setVehicle={props.setVehicles} vehicles={props.vehicles}
            setDataType={props.setDataType} id={props.vehicle.id}/>
        {editMode && <VehicleEdit vehicle={props.vehicle} setMode={setMode}/>}
    </div>)
}

export default VehicleInfo;
