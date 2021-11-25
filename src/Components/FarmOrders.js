import React, { useState, useEffect } from "react";
import { AddFarmOrder } from "./Farm/AddFarmOrder";

const FarmOrders = (props) => {

    const [trigger,setTrigger] = useState(false);
    const [farm_id,setFarm] = useState(props.farmId);
    const [loading,setLoading] = useState(true);

    const [orders,setOrders] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-all-orders`,{
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            console.log(res.data)
            if(res.message === 'Success')
                setOrders(res.data);
            setLoading(false);
        }).catch(err => console.log(err));
    },[])

    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('farmOrder');
        window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/zlecenie/${id}`);
    }

    const addOrderHandler = () => {
        setTrigger(true);
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Zlecenia</h3>
            <div id='garageMenu'>
                <div id='options'>
                <label><input type='checkbox' name='machineFilter' checked={true} />Zakończone</label>
                <label><input type='checkbox' name='machineFilter' checked={true} />Przyjęte</label>
                <label><input type='checkbox' name='machineFilter' checked={true} />Wolne</label>
                </div>
                <div className='addButtons'>
                    <span className='addContent' onClick={addOrderHandler}>+Zlecenie</span>
                </div>
            </div>
            <div className='legend' id='ordersLegend'>
                <span>Nazwa</span>
                <span>Przewidywany czas rozpoczęcia</span>
                <span>Status</span>
            </div>
            <div id='orders'>
                {!loading ? orders.map(o => <div key={o.id} className='mOrder unit' onClick={() => infoHandler(o.id)}>
                    <span>{o.work_type.name}</span>
                    <span>Przewidywany czas rozpoczęcia{o.id}</span>
                    <span>{o.order_status.human_readable_name}</span>
                </div>) : <p>Ładowanie...</p>}
            </div>
            <AddFarmOrder trigger={trigger} setTrigger={setTrigger} farmId={props.farmId} orders={orders} setOrders={setOrders}/>
        </div>
    </section>)
}

export default FarmOrders;