import React, { useState } from 'react';
import { useHistory } from 'react-router';
import AcceptedOrder from './Farm/AcceptedOrder';
import FinishedOrder from './Farm/FinishedOrder';
import PendingOrder from './Farm/PendingOrder';

const OwnOrderInfo = (props) => {

    const [status,setStatus] = useState('pending');
    
    const history = useHistory();

    const onReturnHandler = () => {
        props.setContent('myorders');
        window.history.pushState(null,'MyFarm','/uzytkownik/zlecenia');
    }

    return(<section className='data'><div className='farmOrder'>
        <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
        <div className='order-content'>
        <section className='overall-info'>
            <div className='vehicle-infoname'>
                <h1>Numer zlecenia: 86</h1>
            </div>
        </section>
                {status==='finished' && <FinishedOrder/>}
                {status === 'accepted' && <AcceptedOrder/>}
                {status === 'pending' && <PendingOrder/>}
        </div>
    </div></section>)
}

export default OwnOrderInfo;