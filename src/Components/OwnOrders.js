import React, { useState } from 'react';
import OwnOrderInfo from './OwnOrderInfo';

const OwnOrders = () => {

    const [dataType,setType] = useState('list');

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-list'>
            <p>Moje zlecenia</p>
            <div id='myOrders'>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                </div>
                <div className='mOrder unit' onClick={() => setType('order')}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                </div>
            </div>
        </div>}
        {dataType === 'order' && <OwnOrderInfo setType={setType}/>}
    </section>)
}

export default OwnOrders;