import React, { useState } from 'react';

const AddCrops = (props) => {

    const [crop_id,setCropName] = useState(1);
    const [quantity,setQuantity] = useState(0);
    const [unit_id,setDenomination] = useState(1);

    const [farm_id,setFarmId] = useState(props.farmId)

    const addHandler = (e) => {
        e.preventDefault();
        console.log(crop_id)
        console.log(quantity);
        console.log(unit_id);
        document.querySelector('#addCropInfo').innerHTML='Dodawanie...';

        fetch(process.env.REACT_APP_SERVER+'/api/farm-crop/update-or-create',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({crop_id,farm_id,quantity,unit_id})
        })
        .then(response => response.json())
        .then(res => {console.log(res); props.setTrigger(false)})
        .catch(err => {console.log(err); document.querySelector('#addCropInfo').innerHTML='Błąd podczas dodawania'})
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie plonu</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                <label>Plon 
                        <select onChange={e => setCropName(e.target.value)}>
                            <option value={crop_id}>Pszenica</option>    
                        </select>
                    </label>
                    <label>Ilość <input type='number' onChange={e => setQuantity(e.target.value)}/></label>
                    <label>Jednostka
                        <select onChange={e => setDenomination(e.target.value)}>
                            <option value='1'>Kilogram</option>
                        </select>
                    </label>
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addCropInfo'></h3>
            </section>
        </section>
    </div> : "")
}

export default AddCrops;