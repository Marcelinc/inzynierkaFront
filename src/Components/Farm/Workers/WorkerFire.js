import React, { useState } from 'react';

const WorkerFire = (props) => {

    const fireHandler = () => {
        document.querySelector('#fireWorkerInfo').innerHTML='Przetwarzanie...'
        fetch(process.env.REACT_APP_SERVER+'/api/farm/detach-worker',{
            method:"POST",
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            body: JSON.stringify({'worker_id':props.id}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success')
            props.return();
            else document.querySelector('#fireWorkerInfo').innerHTML='Błąd podczas zwalniania pracownika'
        })
        .catch(err => console.log(err));
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy zwolnić pracownika {props.name}?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={fireHandler}>Potwierdź</button>
            </section>
            <h3 className='info' id='fireWorkerInfo'></h3>
        </section>
    </div> : "")
}

export default WorkerFire;