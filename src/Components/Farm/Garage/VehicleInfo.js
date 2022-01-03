import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router';
import { JobTitleContext } from '../../User';
import DeleteVehicle from './DeleteVehicle';
import UploadImage from './UploadImage';
import VehicleEdit from './VehicleEdit';

const VehicleInfo = (props) => {
    const job_title = useContext(JobTitleContext)

    const [triggerDeleteV,setTriggerDeleteV] = useState(false);
    const [editMode,setMode] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [vehicleId,setId] = useState();
    const [vehicle,setVehicle] = useState({});

    const [uploadImageInfo,setUploadInfo] = useState(false);

    useEffect(() => {
        let idState;
        if(window.history.state)
            idState = window.history.state.id;
        else idState = id;
        setId(idState);
        //send request
        fetch(process.env.REACT_APP_SERVER+`/api/vehicle/${idState}`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        }).then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setVehicle(res.data);
                setLoading(false);
            }else document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
        }).catch(err => console.log(err))

        console.log(job_title)

        return(() => {
            setVehicle({});
            setLoading(true);
        })
    }, [])

    const onReturnHandler = () => {
        props.setContent('garage');
        window.history.pushState(null,'MyFarm','/gospodarstwo/garaz');
    }

    const onEditClick = function (){
        setMode(true);
    }

    const onDeleteClick = (id) => {
        console.log('delete clicked '+id);
        setTriggerDeleteV(true);
    }

    const invokeImgDialog = () => {
        document.getElementById('getImage').click();
    }
    
    const changeImgHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image',e.target.files[0]);
        formData.append('vehicle_id',vehicleId);
        console.log('wybrano'); 

         //Get input file dialog
         //if(isPickedImg){
            fetch(process.env.REACT_APP_SERVER+'/api/vehicle/photo',{
                method: 'POST',
                headers: {'Accept': 'application/json'},
                body: formData,
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res); if(res.message==='The given data was invalid.') setUploadInfo(true)
                else if(res.message==='Success') setVehicle(res.data)})
            .catch(err => console.log(err))   
        //}
    }
       

    return(<section className='data'>
        <div>
            <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
            <div className='vehicleContent'>
                {loading ? <p id='getInfoStatus'>Ładowanie...</p> :<div>
                    <section className='overall-info'> 
                        <div className='vehicleImg'>
                            <img src={vehicle.image_path} alt='vehicle' onClick={invokeImgDialog}></img>
                            <span className='imgInfo'>Zmień zdjęcie</span>
                            <input type='file' id='getImage' onChange={changeImgHandler}/>
                        </div>
                        <div className='vehicle-infoname'>
                            <h1>{vehicle.name}</h1>
                            <p>Numer {vehicle.number}</p>
                        </div>
                    </section>
                    <section className='vehicle-info'>
                    <p><span>Rok produkcji</span> {vehicle.production_date}</p>
                        <p><span>Termin badania technicznego</span> {vehicle.technical_examination_date}</p>
                        <p><span>Rodzaj pojazdu</span> {vehicle.vehicle_type.name}</p>
                        <p><span>Status</span> {vehicle.status.status}</p>
                        <p><span>Pojemność</span> {vehicle.capacity}</p>
                        <p><span>Moc</span> {vehicle.power}</p>
                        <p><span>VIN</span> {vehicle.vin}</p>
                        <p><span>Stan paliwa </span> {vehicle.fuel_level.name}</p>
                        <p>Ostatnia aktualizacja <span>{vehicle.date_update_fuel_level}</span></p>
                        {(job_title === 'Pracownik biurowy' || job_title === 'Właściciel') && <section className='vehicle-actions'>
                            <button className='MachEdit' onClick={() => onEditClick()}>Edytuj</button>
                            <button className='MachDelete' onClick={() => onDeleteClick(vehicleId)}>Usuń</button>
                        </section>}
                    </section>
                </div>}
            </div>
            <DeleteVehicle trigger={triggerDeleteV} setTrigger={setTriggerDeleteV} id={vehicleId} setContent={onReturnHandler}/>
            {editMode && <VehicleEdit vehicle={vehicle} setMode={setMode} setVehicle={setVehicle}/>}
            <UploadImage trigger={uploadImageInfo} setTrigger={setUploadInfo}/>
        </div>
    </section>)
}

export default VehicleInfo;
