import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import OwnOrderInfo from './OwnOrderInfo';

const OwnOrders = (props) => {

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const [user_id,setUserId] = useState(props.userId);
    const [farm_id,setFarm] = useState(props.farmId);

    const [orders,setOrders] = useState([]);
    const [displayed,setDisplayed]  = useState([]);

    const history = useHistory();

    useEffect(() => {
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/worker/${user_id}/order/get-interrupted-finished-in-progress`,{
                headers: {'Content-Type':'application/json','Accept':'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                console.log(res.data)
                if(res.message === 'Success'){
                    setOrders(res.data);
                    setDisplayed(res.data);
                } else setError(true);
                setLoading(false);
            }).catch(err => console.log(err));
    },[])
    
    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('myorder');
        window.history.pushState({'id':id},'MyFarm',`/uzytkownik/zlecenie/${id}`);
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Moje zlecenia</h3>
            <div id='garageMenu'>
                <div id='farmOrdersOptions'>
                <label><input type='checkbox' name='vehicleFilter' checked={true} />Przerwane</label>
                <label><input type='checkbox' name='machineFilter' checked={true} />Zakończone</label>
                <label><input type='checkbox' name='machineFilter' checked={true} />Przyjęte</label>
            </div>
            </div>
            <div className='legend' id='ordersLegend'>
                <span>Numer</span>
                <span className='mOrderName'>Nazwa</span>
                <span className='mOrderDate'>Przewidywany czas rozpoczęcia</span>
                <span className='mOrderStatus'>Status</span>
            </div>
            <div id='myOrders'>
                {!loading && displayed.map(o => <div key={o.id} className='mOrder unit' onClick={() => infoHandler(o.id)}>
                    <span className='mOrderName'>{o.number}</span>
                    <span className='mOrderName'>{o.work_type.name}</span>
                    <span className='mOrderDate'>Przewidywany czas rozpoczęcia{o.id}</span>
                    <span className='mOrderStatus'>{o.order_status.human_readable_name}</span>
                </div>)}
                {!loading && !displayed.length && <p className='getDataStatus'>Nie dodano zleceń</p>}
                {error && <p className='getDataStatus'>Błąd podczas ładowania danych</p>}
                {loading && <p className='getDataStatus'>Ładowanie...</p>}
            </div>
        </div>
    </section>)
}

export default OwnOrders;