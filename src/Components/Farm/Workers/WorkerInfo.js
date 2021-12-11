import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import Photo from './../../../img/userDefault.png';
import WorkerChangeJob from './WorkerChangeJob';
import WorkerFire from './WorkerFire';

const WorkerInfo = (props) => {
    const [triggerFireW,setTriggerFire] = useState(false);
    const [editMode,setMode] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [worker_id,setId] = useState(null);
    const [worker,setWorker] = useState({});
    const [farm_id,setFarmId] = useState(props.farmId);

    const [buttonStyle,setStyle] = useState({});
    const [disabledButton,setDisabled] = useState(false);

    useEffect(() => {
        //Prepare request data
        let idState;
        if(window.history.state)
            idState = window.history.state.id;
        else idState = id;
        setId(idState);
        //send request
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/worker/${idState}`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setWorker(res.data);
                res.data.job_title === 'Właściciel' && setStyle({'opacity':'0.5'});
                res.data.job_title === 'Właściciel' && setDisabled(true);
                setLoading(false);
                console.log(buttonStyle)
            }else if(document.querySelector('#getInfoStatus')) 
                document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
        }).catch(err => {console.log(err);  if(document.querySelector('#getInfoStatus'))
            document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!'})

        return(() => {
            setWorker({})
            setLoading(true)
        })
    }, [])

    const onReturnHandler = () => {
        props.setContent('workers');
        window.history.pushState(null,'MyFarm','/gospodarstwo/pracownicy');
    }

    return(<section className='data'>
        <div>
            <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
            <div className='vehicleContent'>
                {loading ? <p id='getInfoStatus'>Ładowanie...</p> :<div>
                    <div className='userInfo'>
                        <h3>Dane osobowe</h3>
                        <div className='userInfoContent'>
                            <div>
                                <img className='userPhoto' src={Photo} alt='userImage'></img>
                            </div>
                            <div className='userData'>
                                <p className='uData'>Imie: {worker.name}</p>
                                <p className='uData'>Nazwisko: {worker.surname}</p>
                                <p className='uData'>Kraj: {worker.country.name}</p>
                                <p className='uData'>Aktualne stanowisko: {worker.job_title}</p>  
                            </div>
                        </div>     
                    </div>
                    <div className='userContact'>
                        <h3>Dane kontaktowe</h3>
                        <p className='uData'>Email: {worker.email}</p>
                        <p className='uData'>Miejscowość: {worker.town}</p>
                        <p className='uData'>Ulica: {worker.street}</p>
                        <p className='uData'>Nr.domu: {worker.house_number}</p>
                        <p className='uData'>Nr. mieszkania: {worker.flat_number}</p>
                    </div>
                    <div className='userInfoButtons'>
                        <button onClick={() => setMode(true)} disabled={disabledButton} style={buttonStyle} >Zmień stanowisko</button>
                        <button onClick={() => setTriggerFire(true)}>Zwolnij</button>
                    </div>
                </div>}
            </div>
            
            <WorkerFire trigger={triggerFireW} setTrigger={setTriggerFire} id={worker.id} 
                name={worker.name+' '+worker.surname} return={onReturnHandler}/>
            {editMode && <WorkerChangeJob id={worker.id} farm={farm_id} setMode={setMode} worker={worker} 
                setWorker={setWorker} actualTitle={worker.job_title} title={props.title}/>}
        </div>
    </section>)
}

export default WorkerInfo;