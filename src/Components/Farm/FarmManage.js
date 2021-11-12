import React, {useEffect, useState} from 'react';
import { FarmCode } from './FarmCode';
import FarmDelete from './FarmDelete';
import FarmInfoEdit from './FarmInfoEdit';

const FarmManage = (props) => {

    const [editMode,setMode] = useState(false);
    const [deleteTrigger,setTrigger] = useState(false);
    const [getCodeTrigger,setCodeTrigger] = useState(false);
    const [farm_id,setFarmId] = useState(props.farmId);

    const [farmInfo,setFarm] = useState({});

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}`,{
            headers:{'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res); if(res.message === 'Success') setFarm(res.data)})
        .catch(err =>console.log(err))
    },[])
    
    const setToUserPage = () => {
        props.setContent('');
    }



    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Zarządzanie gospodarstwem</h3>
            <div id='farmInfo'>
                <span>Nazwa: {farmInfo.name}</span>
                <span>Miejscowość: {farmInfo.town}</span>
                <span>Ulica: {farmInfo.street}</span>
                <span>Nr. domu: {farmInfo.house_number}</span>
                <span>Budżet: {farmInfo.budget} zł</span>
                <span>Data założenia: {farmInfo.created_at}</span>
            </div>
            <div id='farmCodeManage'>
                <p>Kod dostępu: <button className='farmManageButton' onClick={() => setCodeTrigger(true)}>Generuj nowy</button></p>
                
            </div>
            <div id='farmDelete'>
                <button className='farmManageButton'onClick={() => setMode(true)}>Edytuj dane</button>
                <button className='farmManageButton' onClick={() => setTrigger(true)}>Usuń</button>
            </div>
        </div>
        <FarmDelete trigger={deleteTrigger} setTrigger={setTrigger} id={farm_id} setContent={setToUserPage}/>
        {getCodeTrigger && <FarmCode id={farm_id} setTrigger={setCodeTrigger}/>}
        {editMode && <FarmInfoEdit farm={farmInfo} setFarm={setFarm} setMode={setMode}/>}
    </section>)
}

export default FarmManage;