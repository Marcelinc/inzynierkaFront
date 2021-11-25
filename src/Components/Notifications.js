import React, { useState } from 'react';

const Notifications = () => {

    const [styleNotification,setStyle] = useState({})

    const readHandler = (id) => {

    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Powiadomienia</h3>
            <div className='noticeboard'>
                <div className='notification'>
                    <span>Pracownik {'name'} zakończył zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
                <div className='notification'>
                    <span>Pracownik {'name'} przerwał zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
                <div className='notification'>
                    <span>Pracownik {'name'} przyjął zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
                <div className='notification'>
                    <span>Pracownik {'name'} zakończył zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
                <div className='notification'>
                    <span>Pracownik {'name'} przerwał zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
                <div className='notification'>
                    <span>Pracownik {'name'} przyjął zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
                <div className='notification'>
                    <span>Pracownik {'name'} przerwał zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
                <div className='notification'>
                    <span>Pracownik {'name'} przyjął zlecenie nr. {'5'}</span>
                    <button className='readNotice'>Odczytaj</button>
                </div>
            </div>
        </div>
    </section>)
}

export default Notifications;