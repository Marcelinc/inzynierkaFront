import React, { useState } from 'react';

const DeleteVehicle = (props) => {

    const deleteHandler = () => {
        document.querySelector('#deleteVehicleInfo').innerHTML='Usuwanie...'
        fetch(process.env.REACT_APP_SERVER+'/api/vehicle/delete',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'id':props.id}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success') {
            props.setContent();
        }})
        .catch(err => {console.log(err); document.querySelector('#deleteVehicleInfo').innerHTML='Błąd podczas usuwania pojazdu'});
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybrany pojazd?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
            <h3 className='info' id='deleteVehicleInfo'></h3>
        </section>
    </div> : "")
}

export default DeleteVehicle;