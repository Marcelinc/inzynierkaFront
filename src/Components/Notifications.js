import React, { useState, useEffect } from 'react';

const Notifications = (props) => {

    const [styleNotification,setStyle] = useState({})
    const [error,setError] = useState(false)
    const [loading,setloading] = useState(true)
    const [farm_id,setFarm] = useState(props.farmId)

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/worker/${props.id}/notification/get-all`,{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                setNotifications(res.data);
                console.log(res.data)
            } else setError(true);
            setloading(false);
        })
        .catch(err => console.log(err));
    }, [])

    const readHandler = (id) => {
        let note = document.getElementById('note'+id);
        if(note)
            note.classList.add('seenNotification');
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Powiadomienia</h3>

            <div className='noticeboard'>
                {!loading && notifications.map(n => <div key={n.id} className='notification' id={`note${n.id}`}>
                    <span>{n.notification}</span>
                    <button className='readNotice' onClick={() => readHandler(n.id)}>Odczytaj</button>
                </div>)}
                <p className='getDataStatus'>{loading ? 'Ładowanie...' : !loading && !notifications.length ? 'Brak powiadomień' : 
                    !loading && error ? 'Błąd podczas wczytywania!' : ''}</p>
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