import React from 'react';

const FinishedOrder = (props) => {

    return(<section className='finishedOrder-info'>
        <h3>Informacje ogólne </h3>
        <div className='overallOrderDTO'>
            
            <p><span>Wykonawca</span>Andrzej Rolny</p>
            <p><span>Status zlecenia</span> {props.order.order_status.human_readable_name}</p>
            <p><span>Zadanie</span> {props.order.work_type.name}</p>
            <p><span>Miejsce</span> {props.order.field.localization}</p>
            <p><span>Przewidywany czas rozpoczęcia</span>{props.order.reserved_to}</p>
            <p><span>Przewidywany czas zakończenia</span>{props.order.reserved_from}</p>
            {props.order.dose && props.order.dose.plant_protection_product!==null && <p><span>Środek chemiczny</span>
            {props.order.dose.plant_protection_product.name}</p>}
            {props.order.dose && props.order.dose.product_quantity !== null && <p><span>Dawka na 1ha</span>{props.order.dose.product_quantity}kg</p>}
            {props.order.dose && props.order.dose.water_amount && <p><span>Woda na 1ha</span>{props.order.dose.water_amount}l</p>}
            <p><span>Uwagi</span> {props.order.description ? props.order.description : 'Brak dodatkowych informacji'}</p>
        </div>
        <h3>Informacje zwrotne</h3>
        <div className='feedbackOrderDTO'>
            <p><span>Czas rozpoczęcia</span>{props.order.started_at}</p>
            <p><span>Czas zakończenia</span>{props.order.finished_at}</p>
            {(props.order.work_type.name === 'Sadzenie' || props.order.work_type.name === 'Siew') && <p><span>Plon</span>{props.order.dose.farm_crop.crop}</p>}
            {(props.order.work_type.name === 'Sadzenie' || props.order.work_type.name === 'Siew') && <p><span>Ilość</span>{props.order.dose.seed_quantity+props.order.dose.farm_crop.short_unit}</p>}
            <p><span>Pojazd</span>{props.order.vehicles.length ? props.order.vehicles[0].name+' nr. '+props.order.vehicles[0].number : 'Nie wybrano'}</p>
            {/*<p><span>Status pojazdu</span> Sprawny</p>
            <p><span>Stan paliwa</span> Połowa zbiornika</p>*/}
            <p><span>Sprzęt</span>{props.order.machines.length ? props.order.machines[0].name+' nr. '+props.order.machines[0].number : 'Nie wybrano'}</p>
            {/*<p><span>Status sprzętu</span> Sprawny</p>*/}

            <p><span>Informacje zwrotne</span>{props.order.feedback ? props.order.feedback : 'Brak'}</p>
        </div>
        
</section>)
}

export default FinishedOrder;