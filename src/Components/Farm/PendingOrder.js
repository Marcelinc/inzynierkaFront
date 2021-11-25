import React from 'react';

const PendingOrder = (props) => {
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
    </section>)
}

export default PendingOrder;