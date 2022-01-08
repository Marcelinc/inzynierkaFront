import React, {useEffect, useState} from 'react';

const AcceptedOrder = (props) => {

    const [statuses,setStatuses] = useState(props.statusesMV);
    const [fuelStatuses,setFuelStatuses] = useState(props.fuelStatuses);

    //sended data
    const [feedback,setFeedback] = useState('');
    const [farm_id,setFarm] = useState(props.farmId);
    const [order_id,setOrder] = useState(props.order.id)
    const [worker_id,setWorker] = useState(props.userId);
    const [fuel_level_id,setFuel] = useState(1);
    const [vehicle_status_id,setVehicle] = useState(1);
    const [machine_status_id,setMachine] = useState(1);
    const [crop_amount,setCropAmount] = useState(0);

    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [finished,setFinished] = useState(false);
    const [rejected,setRejected] = useState(false);

    useEffect(() => {
        console.log('accepted')
        console.log(farm_id)
    },[])

    const onCancelClick = () => {
        setError(false);
        setLoading(true);
        let body = {'fuel_level_id':fuel_level_id,'vehicle_status_id':vehicle_status_id,'machine_status_id':machine_status_id};
        if(feedback)
            body['feedback']=feedback;
        //sendinterrupt request
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/order/${order_id}/worker/${worker_id}/interrupt-order`,{
            method:'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body:JSON.stringify(body),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                setRejected(true);
            } else setError(true);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    const onFinishClick = () => {
        setError(false);
        setLoading(true);
        let body = {'fuel_level_id':fuel_level_id,'vehicle_status_id':vehicle_status_id,'machine_status_id':machine_status_id};
        if(feedback)
            body['feedback']=feedback;
        if(crop_amount > 0 && props.order.work_type.name === 'Zbiór'){
            body['crop_amount'] = crop_amount;
        }
        //send finish request
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/order/${order_id}/worker/${parseInt(worker_id)}/finish-order`,{
            method:'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body:JSON.stringify(body),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                setFinished(true);
            } else setError(true);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    return(<section className='order-info '>
        <div className='orderDTO'>
            <span>Zadanie: {props.order.work_type.name}</span>
            {(props.order.work_type.name === 'Sadzenie' || props.order.work_type.name === 'Zbiór' || props.order.work_type.name === 'Siew') && <span>Plon: {props.order.dose && props.order.dose.farm_crop.crop}</span>}
            {(props.order.work_type.name === 'Sadzenie' || props.order.work_type.name === 'Siew') && <span>Ilość: {props.order.dose && props.order.dose.seed_quantity+props.order.dose.farm_crop.short_unit}</span>}
            <span>Wykonawca: {props.order.user && props.order.user.name+' '+props.order.user.surname}</span>
            <span>Miejsce: {props.order.field.localization}</span>
            <span>Czas rozpoczęcia: {props.order.started_at}</span>
            <form>
                {props.order.work_type.name === 'Zbiór' && <label className='orderForm'>Ilość zbioru [{props.order.dose && props.order.dose.farm_crop.short_unit}]
                    <input type='number' value={crop_amount} onChange={e => setCropAmount(e.target.value)}></input>
                </label>}
                <label className='orderForm'>Stan paliwa {props.order.vehicles.length ? props.order.vehicles[0].name : ''}
                    <select onChange={e => setFuel(e.target.value)}>
                        {fuelStatuses.map(status => <option key={status.id} value={status.id}>{status.name}</option> )}
                    </select>
                </label>
                <label className='orderForm'>Status pojazdu {props.order.vehicles.length ? props.order.vehicles[0].name : ''}
                    <select onChange={e => setVehicle(e.target.value)}>
                        {statuses.map(status => <option key={status.id} value={status.id}>{status.status}</option>)}    
                    </select>
                </label>
                <label className='orderForm'>Status maszyny {props.order.machines.length ? props.order.machines[0].name : ''}
                    <select onChange={e => setMachine(e.target.value)}>
                        {statuses.map(status => <option key={status.id} value={status.id}>{status.status}</option>)}     
                    </select>
                </label>
            </form>
        </div>
        <div id='feedbackInput'>
            <label><p>Informacje zwrotne</p><textarea id='feedback' value={feedback} onChange={e => setFeedback(e.target.value)}/></label>
        </div>
        {props.order.user !== null && !finished && !rejected && !loading && <section className='order-actions'>
            <button className='MachEdit' onClick={() => onCancelClick()}>Przerwij</button>
            <button className='MachDelete' onClick={() => onFinishClick()}>Zakończ</button>
        </section>}
        <p className='getDataStatus'>{error ? 'Błąd podczas przetwarzania!' : loading ? 'Zatwierdzanie...' : 
            finished ? 'Zakończono zlecenie' : rejected ? 'Przerwano zlecenie' : ''}</p>
    </section>)
}

export default AcceptedOrder;