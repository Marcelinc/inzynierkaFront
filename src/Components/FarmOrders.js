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
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/order/get-pending`,{
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
        let {name,checked} = e.target;
        console.log(name+': '+checked)
        if(name === 'finishedFilter'){
            setFinished(checked);
            if(checked){
                //
            }else{

            } document.querySelectorAll('.machine').forEach(unit => unit.style.display='none');
            //document.querySelectorAll('.machine').forEach(unit => unit.remove());
        } 
        else if(name === 'acceptedFilter'){
            setInProgress(checked);
            if(checked)
            document.querySelectorAll('.vehicle').forEach(unit => unit.style.display='grid');//renderMachines(vehicles,'vehicle');
            else document.querySelectorAll('.vehicle').forEach(unit => unit.style.display='none');
        }
        else {

        }
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Zlecenia</h3>
            <div id='garageMenu'>
                <div id='options'>
                <label><input type='checkbox' name='finishedFilter' checked={finishedFilter} onChange={filterHandler} />Zakończone</label>
                <label><input type='checkbox' name='acceptedFilter' checked={inprogressFilter} onChange={filterHandler} />Przyjęte</label>
                <label><input type='checkbox' name='pendingFilter' checked={pendingFilter} onChange={filterHandler} />Wolne</label>
                </div>
                <div className='addButtons'>
                    <span className='addContent' onClick={addOrderHandler}>+Zlecenie</span>
                </div>
            </div>
            <div className='legend' id='ordersLegend'>
                <span>Numer</span>
                <span className='mOrderName'>Nazwa</span>
                <span className='mOrderDate'>Przewidywany czas rozpoczęcia</span>
                <span className='mOrderStatus'>Status</span>
            </div>
            <div id='orders'>
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
            <AddFarmOrder trigger={trigger} setTrigger={setTrigger} farmId={props.farmId} orders={orders} setOrders={setOrders}/>
        </div>
    </section>)
}

export default FarmOrders;