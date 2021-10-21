import React, { useState } from 'react';

const DeleteVehicle = (props) => {

    const deleteHandler = () => {
        fetch(process.env.REACT_APP_SERVER+'/api/vehicle/delete',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'id':props.id})
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success') {
            const updatedVehicles = props.vehicles.filter(v => v.id !== props.id);
            props.setVehicle(updatedVehicles);
            props.setTrigger(false);
            props.setDataType('list');
        }})
        .catch(err => console.log('Błąd podczas usuwania pojazdu: '+err));
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybrany pojazd?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
        </section>
    </div> : "")
}

export default DeleteVehicle;