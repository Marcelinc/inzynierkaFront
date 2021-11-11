import React from "react";

const PlotsDelete = (props) => {

    const deleteHandler = () => {
        document.querySelector('#deletePlotInfo').innerHTML='Usuwanie...'
        fetch(process.env.REACT_APP_SERVER+'/api/field/delete',{
            method:"POST",
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            body: JSON.stringify({'field_id':props.id,'farm_id':props.farmId}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success')
            props.setContent();
            else document.querySelector('#deletePlotInfo').innerHTML='Błąd podczas usuwania działki!'
        })
        .catch(err => console.log(err));
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybraną działkę?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
            <h3 className='info' id='deletePlotInfo'></h3>
        </section>
    </div> : "")
}

export default PlotsDelete;