import React, { useState } from 'react';

const AddPlot = (props) => {

    const [number,setNumber] = useState('');
    const [area,setArea] = useState('');
    const [localization,setLocalization] = useState('');
    const [actCrop,setActCrop] = useState('');

    const addHandler = () => {
        console.log(number)
        console.log(area);
        console.log(localization)
        console.log(actCrop)
        /*fetch(process.env.MIX_CUSTOM_URL+'/api/vehicle',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name,production_date,technical_examination_date,vehicle_number,vehicle_type_id})
        })
        .then(response => response.json())
        .then(res => console.log(res))*/
        props.setTrigger(false)
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie działki</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Numer ewidencyjny <input type='text' onChange={e => setNumber(e.target.value)}/></label>
                    <label>Powierzchnia <input type='text' onChange={e => setArea(e.target.value)}/></label>
                    <label>Lokalizacja <input type='text' onChange={e => setLocalization(e.target.value)}/></label>
                    <label>Aktualna roślina
                        <select onChange={e => setActCrop(e.target.value)}>
                            <option value='ciagnik'>Pszenica</option>
                            <option value='kombajn'>Owies</option>
                        </select>
                    </label>
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
            </section>
        </section>
    </div> : "")
}

export default AddPlot;