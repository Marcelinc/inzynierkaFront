import React, { useState } from 'react';

const Notifications = () => {

    const [styleNotification,setStyle] = useState({})

    const readHandler = (id) => {
        let note = document.getElementById('note'+id);
        if(note)
            note.classList.add('seenNotification');
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Powiadomienia</h3>
            <div className='noticeboard'>
                <div className='notification' id='note0'>
                    <span>Pracownik {'name'} zakończył zlecenie nr. {'5'}</span>
                    <button className='readNotice' onClick={() => readHandler(0)}>Odczytaj</button>
                </div>
                <div className='notification' id='note1'>
                    <span>Pracownik {'name'} przerwał zlecenie nr. {'5'}</span>
                    <button className='readNotice' onClick={() => readHandler(1)}>Odczytaj</button>
                </div>
                <div className='notification' id='note2'>
                    <span>Pracownik {'name'} przyjął zlecenie nr. {'5'}</span>
                    <button className='readNotice' onClick={() => readHandler(2)}>Odczytaj</button>
                </div>
                <div className='notification' id='note2'>
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