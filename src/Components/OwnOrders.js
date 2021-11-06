import React, { useState } from 'react';
import { useHistory } from 'react-router';
import OwnOrderInfo from './OwnOrderInfo';

const OwnOrders = () => {

    const [dataType,setType] = useState('list');
    const history = useHistory();

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-content'>
            <h3>Moje zlecenia</h3>
            <div className='legend' id='ordersLegend'>
                <span>Nazwa</span>
                <span>Przewidywany czas rozpoczęcia</span>
                <span>Status</span>
            </div>
            <div id='myOrders'>
                <div className='mOrder unit' onClick={() => {setType('order'); history.push(`/user/zlecenia/${1}`)}}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Przerwane</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Przyjęte</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
            </div>
        </div>}
        {dataType === 'order' && <OwnOrderInfo setType={setType}/>}
    </section>)
}

export default OwnOrders;