import React, { useState, useEffect } from "react";
import { AddFarmOrder } from "./Farm/AddFarmOrder";

const FarmOrders = (props) => {

    const [trigger,setTrigger] = useState(false);
    const [farm_id,setFarm] = useState(props.farmId);
    const [title,setTitle] = useState(props.title);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const [orders,setOrders] = useState([]);
    const [displayed,setDisplayed]  = useState([]);

    const [finishedFilter,setFinished] = useState(true);
    const [pendingFilter,setPending] = useState(true);
    const [inprogressFilter,setInProgress] = useState(true);

    useEffect(() => {
        setFinished(true);
        setPending(true);
        setInProgress(true)
        console.log(title)
        if(title === 'Pracownik biurowy' || title === 'Właściciel'){
            console.log('pierwszy');
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-all-orders`,{
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
        }
        else if(title === 'Pracownik rolny')
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-pending-orders`,{
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
        props.setContent('farmOrder');
        window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/zlecenie/${id}`);
    }

    const addOrderHandler = () => {
        setTrigger(true);
    }

    const filterHandler = (e) => {
        let updated;
        let {name,checked} = e.target;
        console.log(name+': '+checked)
        if(name === 'finishedFilter'){
            setFinished(checked);
            if(checked){
                updated = orders.filter(order => order.order_status.id === 4 || order.order_status.id === 3);
                console.log(displayed.concat(updated))
                setDisplayed(displayed.concat(updated));
            }else{
                updated = displayed.filter(order => (order.order_status.id !== 4 && order.order_status.id !== 3));
                console.log(updated);
                setDisplayed(updated);
            } 
        } 
        else if(name === 'acceptedFilter'){
            setInProgress(checked);
            if(checked){
                updated = orders.filter(order => order.order_status.id === 2);
                console.log(displayed.concat(updated))
                setDisplayed(displayed.concat(updated));
            }
            else{
                updated = displayed.filter(order => order.order_status.id !== 2);
                console.log(updated);
                setDisplayed(updated);
            }
        }
        else if(name === 'pendingFilter'){
            setPending(checked);
            if(checked){
                updated = orders.filter(order => order.order_status.id === 1);
                console.log(displayed.concat(updated))
                setDisplayed(displayed.concat(updated));
            }
            else{
                updated = displayed.filter(order => order.order_status.id !== 1);
                console.log(updated);
                setDisplayed(updated);
            }
        }
    }

    return(<section className='data'>
        <div className='equipment-content'>
            {(title === 'Pracownik biurowy' || title === 'Właściciel') && <h3>Zlecenia</h3>}
            <div id='garageMenu'>
                {(title === 'Pracownik biurowy' || title === 'Właściciel') && <div id='options'>
                <label><input type='checkbox' name='finishedFilter' checked={finishedFilter} onChange={filterHandler} />Zakończone</label>
                <label><input type='checkbox' name='acceptedFilter' checked={inprogressFilter} onChange={filterHandler} />Przyjęte</label>
                <label><input type='checkbox' name='pendingFilter' checked={pendingFilter} onChange={filterHandler} />Wolne</label>
                </div>}
                {(title === 'Pracownik biurowy' || title === 'Właściciel') ? <div className='addButtons'>
                    <span className='addContent' onClick={addOrderHandler}>+Zlecenie</span>
                </div> : 'Zlecenia'}
            </div>
            <div className='legend' id='ordersLegend'>
                <span>Numer</span>
                <span className='mOrderName'>Nazwa</span>
                <span className='mOrderDate'>Przewidywany czas rozpoczęcia</span>
                <span className='mOrderStatus'>Status</span>
            </div>
            <div id='orders'>
                {!loading && displayed.map((o,index) => <div key={index} className='mOrder unit' onClick={() => infoHandler(o.id)}>
                    <span className='mOrderName'>{o.number}</span>
                    <span className='mOrderName'>{o.work_type.name}</span>
                    <span className='mOrderDate'>Przewidywany czas rozpoczęcia{o.id}</span>
                    <span className='mOrderStatus'>{o.order_status.human_readable_name}</span>
                </div>)}
                {!loading && !displayed.length && <p className='getDataStatus'>Brak zleceń do wyświetlenia</p>}
                {error && <p className='getDataStatus'>Błąd podczas ładowania danych</p>}
                {loading && <p className='getDataStatus'>Ładowanie...</p>}
            </div>
            <AddFarmOrder trigger={trigger} setTrigger={setTrigger} farmId={props.farmId} orders={orders} setOrders={setOrders} 
                pendingFilter={pendingFilter} setDisplayed={setDisplayed} displayed={displayed} filterHandler={filterHandler}/>
        </div>
    </section>)
}

export default FarmOrders;