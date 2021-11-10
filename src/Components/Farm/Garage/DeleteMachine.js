import React, { useState } from 'react';

const DeleteMachine = (props) => {

    const deleteHandler = () => {
        console.log(props.id);
        fetch(process.env.REACT_APP_SERVER+'/api/machine/delete',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'id':props.id}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success') {
            const updatedMachines = props.machines.filter(m => m.id !== props.id);
            props.setMachine(updatedMachines);
            props.setTrigger(false);
            props.setDataType('list')
            
        }})
        .catch(err => console.log('Błąd podczas usuwania pojazdu: '+err));
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybrany sprzęt?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
        </section>
    </div> : "")
}

export default DeleteMachine;