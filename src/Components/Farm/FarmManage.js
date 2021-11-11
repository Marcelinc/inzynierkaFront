import React, {useState} from 'react';
import FarmDelete from './FarmDelete';

const FarmManage = (props) => {

    const [editMode,setMode] = useState(false);
    const [deleteTrigger,setTrigger] = useState(false);

    const setToUserPage = () => {
        props.setContent('');
    }

    const getCodeHandler = () => {
        //fetch(process.env.REACT_APP_SERVER+'/api/farm/')
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
                <p>Kod dostępu: <button className='farmManageButton'>Generuj nowy</button></p>
                
            </div>
            <div id='farmDelete'>
                <button className='farmManageButton'onClick={() => setMode(true)}>Edytuj dane</button>
                <button className='farmManageButton' onClick={() => setTrigger(true)}>Usuń</button>
            </div>
        </div>
        <FarmDelete trigger={deleteTrigger} setTrigger={setTrigger} id={1} setContent={setToUserPage}/>
    </section>)
}

export default FarmManage;