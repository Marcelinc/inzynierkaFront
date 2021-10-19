import React, { useState } from 'react';

const AddCrops = (props) => {

    const [cropName,setCropName] = useState('');
    const [quantity,setQuantity] = useState('');
    const [denomination,setDenomination] = useState('');
    const [actCrop,setActCrop] = useState('');

    const addHandler = () => {
        console.log(cropName)
        console.log(quantity);
        //console.log(localization)
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
            <p>Dodawanie plonu</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Nazwa <input type='text' onChange={e => setCropName(e.target.value)}/></label>
                    <label>Ilość <input type='text' onChange={e => setQuantity(e.target.value)}/></label>
                    <label>Jednostka
                        <select onChange={e => setDenomination(e.target.value)}>
                            <option value='ciagnik'>Tona</option>
                            <option value='kombajn'>Kilogram</option>
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

export default AddCrops;