import React, { useState } from 'react';

const CropDelete = (props) => {

    const deleteHandler = () => {
        document.querySelector('#cropDeleteInfo').innerHTML='Usuwanie...'
        fetch(process.env.REACT_APP_SERVER+'/api/farm-crop/delete',{
            method:"POST",
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            body: JSON.stringify({'farm_crop_id':props.id}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success')
            props.setContent();
            else document.querySelector('#cropDeleteInfo').innerHTML='Błąd podczas usuwania plonu!'
        })
        .catch(err => console.log(err));
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybrany plon?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
            <h3 className='info' id='cropDeleteInfo'></h3>
        </section>
    </div> : "")
}

export default CropDelete;