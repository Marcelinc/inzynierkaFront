import React, { useState } from 'react';

const PendingOrder = (props) => {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const [farm_id,setFarm] = useState(props.farmId)
    const [order_id,setOrder] = useState(props.order.id)
    const [user_id,setUser] = useState(props.userId)

    const [disabled,setDisabled] = useState(false);

    const onAcceptClick = () => {
        setLoading(true);
        setError(false);
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/order/${order_id}/worker/${user_id}/start-order`,{
            method:'POST',
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.message === 'Success'){
                setSuccess(true);
                setDisabled(true);
                let butt = document.getElementById('acceptOrderButton');
                if(butt) {butt.style.opacity=0.8; butt.style.cursor='default'}
            } else setError(true);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    return(<section className='pendingOrder-info'>
        <h3>Informacje ogólne</h3>
        <p><span>Zadanie</span> {props.order.work_type.name}</p>
        <p><span>Miejsce</span> {props.order.field.localization}</p>
        <p><span>Przewidywany czas rozpoczęcia</span>{props.order.reserved_from}</p>
        <p><span>Przewidywany czas zakończenia</span>{props.order.reserved_to}</p>
        <p><span>Pojazd</span>{props.order.vehicles.length ? props.order.vehicles[0].name+' nr. '+props.order.vehicles[0].number : 'Nie wybrano'}</p>
        <p><span>Sprzęt</span>{props.order.machines.length ? props.order.machines[0].name+' nr. '+props.order.machines[0].number : 'Nie wybrano'}</p>

        {props.order.dose && props.order.dose.plant_protection_product!==null && <p><span>Środek chemiczny</span>
            {props.order.dose.plant_protection_product.name}</p>}
        {props.order.dose && props.order.dose.product_quantity !== null && <p><span>Dawka na 1ha</span>{props.order.dose.product_quantity}kg</p>}
        {props.order.dose && props.order.dose.water_amount && <p><span>Woda na 1ha</span>{props.order.dose.water_amount}l</p>}
        <p><span>Uwagi</span> {props.order.description ? props.order.description : 'Brak dodatkowych informacji'}</p>

        <section className='order-actions'>
            <button className='MachEdit' id='acceptOrderButton' onClick={() => onAcceptClick()} disabled={disabled}>Przyjmij</button>
            <p className='startOrderStatus'>{loading ? 'Przetwarzanie..' : error ? 'Błąd podczas przetwarzania!' : 
                success ? 'Przyjęto zlecenie! Możesz je znaleźć w zakładce Moje zlecenia.' : ''}</p>
        </section>
    </section>)
}

export default PendingOrder;