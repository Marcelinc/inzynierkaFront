import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AcceptedOrder from './Farm/AcceptedOrder';
import FinishedOrder from './Farm/FinishedOrder';
import PendingOrder from './Farm/PendingOrder';

const OwnOrderInfo = (props) => {

    const [status,setStatus] = useState('');
    const [loading,setLoading] = useState(true);

    const {id} = useParams();
    const [farm_id,setFarm] = useState(props.farmId)

    const [order,setOrder] = useState({});
    
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
                {status==='finished' && <FinishedOrder order={order}/>}
                {status === 'accepted' && <AcceptedOrder/>}
                {status === 'pending' && <PendingOrder order={order} farmId={farm_id} userId={props.userId}/>}
        </div>
    </div></section>)
}

export default OwnOrderInfo;