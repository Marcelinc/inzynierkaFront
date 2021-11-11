import React, {useState} from 'react';
import { FarmCode } from './FarmCode';
import FarmDelete from './FarmDelete';

const FarmManage = (props) => {

    const [editMode,setMode] = useState(false);
    const [deleteTrigger,setTrigger] = useState(false);
    const [getCodeTrigger,setCodeTrigger] = useState(false);
    const [farm_id,setFarmId] = useState(props.farmId);

    const setToUserPage = () => {
        props.setContent('');
    }

    

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Zarządzanie gospodarstwem</h3>
            <div id='farmInfo'>
                <span>Nazwa: Moje gospodarstwo</span>
                <span>Miejscowość: Podlesie</span>
                <span>Ulica: </span>
                <span>Nr. domu: </span>
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
    </section>)
}

export default FarmManage;