import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import AcceptedOrder from './Farm/AcceptedOrder';
import FinishedOrder from './Farm/FinishedOrder';
import PendingOrder from './Farm/PendingOrder';

const OwnOrderInfo = (props) => {

    const [status,setStatus] = useState('');
    const [loadingOrder,setLoadingOrder] = useState(true);
    const [loadingVehicleStatus,setLoadingVStatus] = useState(true);
    const [loadingFuelStatus,setLoadingFuelStatus] = useState(true);
    const [error,setError] = useState(false);

    const {id} = useParams();
    const [farm_id,setFarm] = useState(props.farmId)

    const [order,setOrder] = useState({});
    const [statuses,setStatuses] = useState([]);
    const [fuelStatuses,setFuelStatuses] = useState([]);
    
    const history = useHistory();

    useEffect(() => {
        let idState;
        if(window.history.state)
            idState = window.history.state.id;
        else idState = id;
        //Get order data
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/order/${idState}`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setOrder(res.data);
                setStatus(res.data.order_status.name);
            }else setError(true);
            setLoadingOrder(false);
        }).catch(err => console.log(err))

        //Get vehicle/machine statuses
        fetch(process.env.REACT_APP_SERVER+`/api/lookup-table/status/getAll`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setStatuses(res.data);
                console.log(res.data)
            }else setError(true);
            setLoadingVStatus(false);
        }).catch(err => console.log(err))

        //Get fuel statuses
        fetch(process.env.REACT_APP_SERVER+`/api/lookup-table/fuel-level/getAll`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setFuelStatuses(res.data);
                console.log(res.data)
            }else setError(true);
            setLoadingFuelStatus(false);
        }).catch(err => console.log(err))

    }, [])

    const onReturnHandler = () => {
        props.setContent('myorders');
        window.history.pushState(null,'MyFarm','/uzytkownik/zlecenia');
    }

    return(<section className='data'><div className='farmOrder'>
        <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
        <div className='order-content'>
        <section className='overall-info'>
            <div className='vehicle-infoname'>
                {!loadingOrder && !loadingVehicleStatus && !loadingFuelStatus && <h1>Numer zlecenia: {order.number}</h1>}
            </div>
        </section>
            {loadingOrder || loadingVehicleStatus || loadingFuelStatus ? <p id='getInfoStatus'>Ładowanie...</p> :
            error ? <p id='getInfoStatus'>Błąd podczas pobierania danych!</p> :
                (status==='finished' || status==='interrupted') ? <FinishedOrder order={order}/> : 
                status === 'in_progress' ? <AcceptedOrder order={order} statusesMV={statuses} fuelStatuses={fuelStatuses} 
                    farmId={farm_id} userId={props.userId} setContent={props.setContent}/> :
                status === 'pending' && <PendingOrder order={order} farmId={farm_id} userId={props.userId}/>}
        </div>
    </div></section>)
}

export default OwnOrderInfo;