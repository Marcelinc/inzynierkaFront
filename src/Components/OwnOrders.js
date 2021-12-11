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

    const [interruptedFilter,setInterrupted] = useState(true);
    const [finishedFilter,setFinished] = useState(true);
    const [inProgressFilter,setInProgress] = useState(true);

    const history = useHistory();

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/worker/${user_id}/order/get-interrupted-finished-in-progress`,{
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            //console.log(res.data)
            if(res.message === 'Success'){
                setOrders(res.data);
                setDisplayed(res.data);
            } else setError(true);
            setLoading(false);
        }).catch(err => console.log(err));

        return(() => {
            setLoading(true);
            setError(false);
            setOrders([]);
            setDisplayed([]);
            setInterrupted(true);
            setFinished(true);
            setInProgress(true);
            setUserId(0);
            setFarm(0);
        })
    },[])
    
    const infoHandler = (id) => {
        props.setContent('myorder');
        window.history.pushState({'id':id},'MyFarm',`/uzytkownik/zlecenie/${id}`);
    }

    const filterHandler = (e) => {
        let updated;
        let {name,checked} = e.target;
        //console.log(name+': '+checked)
        if(name === 'finishedFilter'){
            setFinished(checked);
            if(checked){
                updated = orders.filter(order => order.order_status.id === 4);
                //console.log(displayed.concat(updated))
                setDisplayed(displayed.concat(updated));
            }else{
                updated = displayed.filter(order => order.order_status.id !== 4);
                //console.log(updated);
                setDisplayed(updated);
            } 
        } 
        else if(name === 'interruptedFilter'){
            setInterrupted(checked);
            if(checked){
                updated = orders.filter(order => order.order_status.id === 3);
                //console.log(displayed.concat(updated))
                setDisplayed(displayed.concat(updated));
            }
            else{
                updated = displayed.filter(order => order.order_status.id !== 3);
                //console.log(updated);
                setDisplayed(updated);
            }
        }
        else if(name === 'inProgressFilter'){
            setInProgress(checked);
            if(checked){
                updated = orders.filter(order => order.order_status.id === 2);
                //console.log(displayed.concat(updated))
                setDisplayed(displayed.concat(updated));
            }
            else{
                updated = displayed.filter(order => order.order_status.id !== 2);
                //console.log(updated);
                setDisplayed(updated);
            }
        }
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Moje zlecenia</h3>
            <div id='garageMenu'>
                <div id='farmOrdersOptions'>
                <label><input type='checkbox' name='interruptedFilter' checked={interruptedFilter} onChange={filterHandler} />Przerwane</label>
                <label><input type='checkbox' name='finishedFilter' checked={finishedFilter} onChange={filterHandler} />Zakończone</label>
                <label><input type='checkbox' name='inProgressFilter' checked={inProgressFilter} onChange={filterHandler} />Przyjęte</label>
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
                    <span className='mOrderDate'>{o.reserved_from}</span>
                    <span className='mOrderStatus'>{o.order_status.human_readable_name}</span>
                </div>)}
                {!loading && !displayed.length && <p className='getDataStatus'>Brak zleceń do wyświetlenia</p>}
                {error && <p className='getDataStatus'>Błąd podczas ładowania danych</p>}
                {loading && <p className='getDataStatus'>Ładowanie...</p>}
            </div>
        </div>
    </section>)
}

export default OwnOrders;