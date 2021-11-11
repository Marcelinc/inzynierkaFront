import React, { useState } from 'react';

const DeleteMachine = (props) => {

    const deleteHandler = () => {
        console.log(props.id);
        document.querySelector('#deleteMachineInfo').innerHTML='Usuwanie...'
        fetch(process.env.REACT_APP_SERVER+'/api/machine/delete',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'id':props.id}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success') {
            props.setContent();
        }})
        .catch(err => {console.log(err); document.querySelector('#deleteMachineInfo').innerHTML='Błąd podczas usuwania sprzętu'});
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybrany sprzęt?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
            <h3 className='info' id='deleteMachineInfo'></h3>
        </section>
    </div> : "")
}

export default DeleteMachine;