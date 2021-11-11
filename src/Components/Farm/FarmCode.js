import React, {useEffect, useState} from 'react';

export const FarmCode = (props) => {
    
    const [loading,setLoading] = useState(true);
    const [code,setCode] = useState('');
    const [farm_id,setFarm] = useState(props.id);
    const [error,setError] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-code`,{
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res); if(res.message ==='Success') setCode(res.data);
            else setError(true); setLoading(false);})
        .catch(err => {console.log(err); setError(true);})
    },[])
    const confirmHandler = () => {
        props.setTrigger(false);
    }

    return(<div className='popup'>
        <section className='popup-delete'>
            {loading && !error ? <p id='getCodeInfo'>Pobieranie kodu...</p> : <section id='getCodeResult'>
                {error ? <p>Błąd podczas pobierania kodu!</p> : <div>
                    <h3 id='farmCodeValue'>Kod: {code}</h3>
                    <span>Skopiuj go i przekaż właściwej osobie. (Kod jednorazowy)</span>    
                </div>}
            </section>}
            <section className='popupButtons'>
                <button onClick={confirmHandler}>OK</button>
            </section>
        </section>
    </div>)
} 