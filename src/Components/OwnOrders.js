import React, { useState } from 'react';
import { useHistory } from 'react-router';
import OwnOrderInfo from './OwnOrderInfo';

const OwnOrders = () => {

    const [dataType,setType] = useState('list');
    const history = useHistory();

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-list'>
            <p>Moje zlecenia</p>
            <div id='myOrders'>
                <div className='mOrder unit' onClick={() => {setType('order'); history.push(`/user/zlecenia/${1}`)}}>
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