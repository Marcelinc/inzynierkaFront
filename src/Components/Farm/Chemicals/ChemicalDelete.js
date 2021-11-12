import React, { useEffect, useState } from 'react';

const ChemicalDelete = (props) => {

    const [error,setError] = useState(true);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        return(() => {setLoading(false); setError('')})
    },[props.trigger])

    const deleteHandler = () => {
        setLoading(true);
        fetch(process.env.REACT_APP_SERVER+'/api/farm-ppp/delete',{
            method:'POST',
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify({'farm_ppp_id':props.id}),
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res.message); if(res.message==='Success')
            props.setContent(); else setError(true); setLoading(false);
        })
        .catch(err => console.log(err));
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybrany środek chemiczny?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
            <h3 className='info' id='deleteChemicalInfo'>{loading && !error ? 'Usuwanie...' : (error ? 'Błąd podczas usuwania sprzętu!': '')}</h3>
        </section>
    </div> : "")
}

export default ChemicalDelete;