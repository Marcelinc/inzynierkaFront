import React, { useState } from 'react';
import { useHistory } from 'react-router';
import OwnOrderInfo from './OwnOrderInfo';

const OwnOrders = (props) => {

    const history = useHistory();

    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('myorder');
        window.history.pushState({'id':id},'MyFarm',`/uzytkownik/zlecenie/${id}`);

    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Moje zlecenia</h3>
            <div className='legend' id='ordersLegend'>
                <span>Nazwa</span>
                <span>Przewidywany czas rozpoczęcia</span>
                <span>Status</span>
            </div>
            <div id='myOrders'>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Przerwane</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Przyjęte</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
            </div>
        </div>
    </section>)
}

export default OwnOrders;