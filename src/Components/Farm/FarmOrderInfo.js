import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AcceptedOrder from './AcceptedOrder';
import FinishedOrder from './FinishedOrder';
import PendingOrder from './PendingOrder';

const FarmOrderInfo = (props) => {

    const [status,setStatus] = useState('');
    const [loading,setLoading] = useState(true);

    const {id} = useParams();
    const [farm_id,setFarm] = useState(props.farmId)

    const [order,setOrder] = useState({});
    
    const history = useHistory();

    useEffect(() => {
        let idState;
        if(window.history.state)
            idState = window.history.state.id;
        else idState = id;
        //send request
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/order/${idState}`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setOrder(res.data);
                setLoading(false);
                setStatus(res.data.order_status.name);
            }else document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
        }).catch(err => {console.log(err); document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!'})
    }, [])

    const onReturnHandler = () => {
        props.setContent('farmOrders');
        window.history.pushState(null,'MyFarm','/gospodarstwo/zlecenia');
    }

    return(<section className='data'><div className='farmOrder'>
        <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
        <div className='order-content'>
        
        <section className='overall-info'>
            <div className='vehicle-infoname'>
                {!loading && <h1>Numer zlecenia: {order.number}</h1>}
            </div>
        </section>
            {loading ? <p id='getInfoStatus'>Ładowanie...</p> : 
                (status==='finished' || status==='interrupted') ? <FinishedOrder order={order}/> : 
                status === 'in_progress' ? <AcceptedOrder order={order}/> :
                status === 'pending' && <PendingOrder order={order} farmId={farm_id} userId={props.userId}/>}
        </div>
    </div></section>)
}

export default FarmOrderInfo;