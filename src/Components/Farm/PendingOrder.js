import React, { useState } from 'react';

const PendingOrder = (props) => {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const [farm_id,setFarm] = useState(props.farmId)
    const [order_id,setOrder] = useState(props.order.id)
    const [user_id,setUser] = useState(props.userId)

    const onCancelClick = () => {
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
            } else setError(true);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    return(<section className='pendingOrder-info'>
        <h3>Informacje ogólne</h3>
        <p><span>Zadanie</span> {props.order.work_type.name}</p>
        <p><span>Miejsce</span> {props.order.field.localization}</p>
        <p><span>Przewidywany czas rozpoczęcia</span> 2020-05-21</p>
        <p><span>Przewidywany czas zakończenia</span> 2020-05-21</p>
        <p><span>Pojazd</span>Fendt 209S</p>
        <p><span>Sprzęt</span>Opryskiwacz Agrola</p>

        {props.order.dose && <p><span>Środek chemiczny</span>KristaLeaf Foto</p> &&
        <p><span>Dawka na 1ha</span>3kg</p> && 
        <p><span>Woda na 1ha</span> 600l</p>}
        <p><span>Uwagi</span> {props.order.description ? props.order.description : 'Brak dodatkowych informacji'}</p>

        <section className='order-actions'>
            <button className='MachEdit' onClick={() => onCancelClick()}>Przyjmij</button>
            <p className='startOrderStatus'>{loading ? 'Przetwarzanie..' : error ? 'Błąd podczas przetwarzania!' : 
                success ? 'Przyjęto zlecenie! Możesz je znaleźć w zakładce Moje zlecenia.' : ''}</p>
        </section>
    </section>)
}

export default PendingOrder;