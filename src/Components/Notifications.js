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
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/worker/${props.id}/notification/${id}/mark-as-shown`,{
            method:'POST',
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Powiadomienia</h3>

            <div className='noticeboard'>
                {!loading && notifications.map(n => <div key={n.id} className={n.wasShown ? 'notification seenNotification' : 
                'notification'} id={`note${n.id}`}>
                    <span className='notificationContent'>{n.notification}</span>
                    <button className='readNotice' onClick={() => readHandler(n.id)}>Odczytaj</button>
                </div>)}
                <p className='getDataStatus'>{loading ? 'Ładowanie...' : !loading && !notifications.length ? 'Brak powiadomień' : 
                    !loading && error ? 'Błąd podczas wczytywania!' : ''}</p>
            </div>
        </div>
    </section>)
}

export default Notifications;