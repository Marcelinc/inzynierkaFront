import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import DeleteMachine from './DeleteMachine';
import UploadImage from './UploadImage';
import MachineEdit from './MachineEdit';
import { JobTitleContext } from '../../User';

const MachineInfo = (props) => {

    const job_title = useContext(JobTitleContext);

    const [triggerDeleteM,setTriggerDeleteM] = useState(false);
    const [editMode,setMode] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [machineId,setId] = useState();
    const [machine,setMachine] = useState({});

    const [uploadImageInfo,setUploadInfo] = useState(false);

    useEffect(() => {
        if(job_title === 'Pracownik biurowy' || job_title === 'Właściciel' || job_title === 'Pracownik rolny'){
            let idState;
            if(window.history.state)
                idState = window.history.state.id;
            else idState = id;
            setId(idState);
            //send request
            fetch(process.env.REACT_APP_SERVER+`/api/machine/${idState}`,{
                headers: {'Content-Type':'application/json',
                    'Accept':'application/json'},
                credentials:'include'
            }).then(response => response.json())
            .then(res => {console.log(res);
                if(res.message === 'Success') {
                    setMachine(res.data);
                    setLoading(false);
                }else document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
            }).catch(err => console.log(err))
        }
        return(() => {
            setMachine({});
            setLoading(true);
        })
    }, [])

    const onReturnHandler = () => {
        props.setContent('garage');
        window.history.pushState(null,'MyFarm','/gospodarstwo/garaz');
    }

    const onDeleteClick = (id) => {
        console.log('delete clicked '+id);
        setTriggerDeleteM(true);
    }

    const invokeImgDialog = () => {
        document.getElementById('getImage').click();
    }
    
    const changeImgHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image',e.target.files[0]);
        formData.append('machine_id',machineId);
        console.log('wybrano'); 

         //Get input file dialog
         //if(isPickedImg){
            fetch(process.env.REACT_APP_SERVER+'/api/machine/photo',{
                method: 'POST',
                headers: {'Accept': 'application/json'},
                body: formData,
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res); if(res.message==='The given data was invalid.') setUploadInfo(true); 
                else if(res.message==='Success') setMachine(res.data)})
            .catch(err => console.log(err))   
        //}
    }

    if(job_title !== 'Pracownik biurowy' && job_title !== 'Właściciel' && job_title !== 'Pracownik rolny')
        return <Redirect to='/gospodarstwo' />

    return(<section className='data'>
        <div>
            <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
            <div className='vehicleContent'>
                {loading ? <p id='getInfoStatus'>Ładowanie...</p> : <div>
                    <section className='overall-info'>
                        <div className='vehicleImg'>
                            <img src={machine.image_path} alt='machine' onClick={invokeImgDialog}></img>
                            <span className='imgInfo'>Zmień zdjęcie</span>
                            <input type='file' id='getImage' onChange={changeImgHandler}/>
                        </div>
                        <div className='vehicle-infoname'>
                            <h1>{machine.name}</h1>
                            <p>Numer {machine.number}</p>
                        </div>
                    </section>
                    <section className='vehicle-info'>
                            <p><span>Rok produkcji</span> {machine.production_date}</p>
                            <p><span>Rodzaj sprzętu</span> {machine.vehicle_type.name}</p>
                            <p><span>Szerokość </span> {machine.working_width}</p>
                            <p><span>Stan</span>{machine.status.status}</p>
                            {(job_title === 'Pracownik biurowy' || job_title === 'Właściciel') &&  <section className='vehicle-actions'>
                                <button className='MachEdit' onClick={() => setMode(true)}>Edytuj</button>
                                <button className='MachDelete' onClick={() => onDeleteClick(machine.id)}>Usuń</button>
                            </section>}
                    </section>
                </div>}
            </div>
            <DeleteMachine trigger={triggerDeleteM} setTrigger={setTriggerDeleteM} id={machine.id} setContent={onReturnHandler}/>
            {editMode && <MachineEdit machine={machine} setMode={setMode} setMachine={setMachine}/>}
            <UploadImage trigger={uploadImageInfo} setTrigger={setUploadInfo}/>
        </div>
    </section>)
}

export default MachineInfo;
