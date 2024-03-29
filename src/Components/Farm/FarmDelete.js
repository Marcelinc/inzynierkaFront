import React from 'react';

const FarmDelete = (props) => {
    
    const deleteHandler = () => {
        document.querySelector('#deleteInfo').innerHTML='Przetwarzanie...'
        fetch(process.env.REACT_APP_SERVER+'/api/farm/delete',{
            method:"POST",
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            body: JSON.stringify({'farm_id':props.id}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success')
            props.setContent('');
            else if(res.message==='Only owner can delete farm.') document.querySelector('#deleteInfo').innerHTML='Tylko właściciel może usunąć gospodarstwo!'
            else document.querySelector('#deleteInfo').innerHTML='Błąd podczas usuwania gospodarstwa!'
        })
        .catch(err => console.log(err));
        
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy na pewno usunąć gospodarstwo?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
            <h3 className='info' id='deleteInfo'></h3>
        </section>
    </div> : "")
}

export default FarmDelete;