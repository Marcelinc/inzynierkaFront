import React, {useState, useEffect, useContext} from 'react';
import { useHistory, useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import CropDelete from './CropDelete';
import { JobTitleContext } from '../../User';

const CropInfo = (props) => {

    const [triggerDelete,setTriggerDelete] = useState(false);
    const [editMode,setMode] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [crop_id,setId] = useState(null);
    const [crop,setCrop] = useState({});
    const [farm_id,setFarm] = useState(props.farmId)

    const job_title = useContext(JobTitleContext)

    useEffect(() => {
        if(job_title === 'Pracownik biurowy' || job_title === 'Właściciel'){
            let idState;
            if(window.history.state)
                idState = window.history.state.id;
            else idState = id;
            setId(idState);
            //send request
            fetch(process.env.REACT_APP_SERVER+`/api/farm-crop/farm/${farm_id}/crop/${idState}`,{
                headers: {'Content-Type':'application/json',
                    'Accept':'application/json'},
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res);
                if(res.message === 'Success') {
                    setCrop(res.data);
                    setLoading(false);
                }else document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
            }).catch(err => console.log(err))
        }
        return(() => {
            setCrop({});
            setLoading(true);
        })
    }, [])

    const onReturnHandler = () => {
        props.setContent('crops');
        window.history.pushState(null,'MyFarm','/gospodarstwo/plony');
    }

    if(job_title !== 'Pracownik biurowy' && job_title !== 'Właściciel')
        return <Redirect to='/gospodarstwo'/>

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
                        <p><span>Ilość</span> {crop.quantity}</p>
                        <p><span>Jednostka</span> {crop.unit}</p>
                        <section className='vehicle-actions'>
                            <button className='MachDelete' onClick={() => setTriggerDelete(true)}>Usuń</button>
                        </section>
                    </section>
                </div>}
            </div>
            <CropDelete trigger={triggerDelete} setTrigger={setTriggerDelete} setContent={onReturnHandler} id={crop.id} />
        </div>
    </section>)
}

export default CropInfo;