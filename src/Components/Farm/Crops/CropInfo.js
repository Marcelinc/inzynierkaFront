import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import CropDelete from './CropDelete';
import CropEdit from './CropEdit';

const CropInfo = (props) => {

    const [triggerDelete,setTriggerDelete] = useState(false);
    const [editMode,setMode] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [crop_id,setId] = useState(null);
    const [crop,setCrop] = useState({});

    useEffect(() => {
        let idState;
        if(window.history.state)
            idState = window.history.state.id;
        else idState = id;
        setId(idState);
        //send request
        fetch(process.env.REACT_APP_SERVER+`/api/farm-crop/get`,{
            method:'POST',
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            body: JSON.stringify({'crop_id':idState}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setCrop(res.data);
                setLoading(false);
            }else document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
        }).catch(err => console.log(err))
    }, [])

    const onReturnHandler = () => {
        props.setContent('crops');
        window.history.pushState(null,'MyFarm','/gospodarstwo/plony');
    }

    return(<section className='data'>
        <div>
            <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
            <div className='vehicleContent'>
                {loading ? <p id='getInfoStatus'>Ładowanie...</p> : <div>
                    <section className='overall-info'>
                        <div className='vehicle-infoname'>
                            <h1>{crop.crop}</h1>
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
                </div>}
            </div>
            <CropDelete trigger={triggerDelete} setTrigger={setTriggerDelete} setDataType={props.setType} />
            {editMode && <CropEdit setMode={setMode}/>}
        </div>
    </section>)
}

export default CropInfo;