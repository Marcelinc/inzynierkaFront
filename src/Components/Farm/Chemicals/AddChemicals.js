import React, { useState } from 'react';

const AddChemicals = (props) => {

    const [farm_id,setFarm] = useState(props.farmId);
    const [name,setName] = useState('');
    const [expiration_date,setExpDate] = useState('');
    const [product_quantity_in_package,setQuantity] = useState(0);
    const [usedChem,setUsedChem] = useState(0);//?
    const [designation,setDesignation] = useState(3);//dopisane, oznaczenie
    const [unit_id,setUnit] = useState(1);
    const [ppp_type_id,setType] = useState(1);

    const addHandler = (e) => {
        e.preventDefault();
        document.querySelector('#addChemicalInfo').innerHTML='Dodawanie...';


        fetch(process.env.REACT_APP_SERVER+'/api/farm-ppp/update-or-create',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({farm_id,name,product_quantity_in_package,unit_id,ppp_type_id,expiration_date})
        })
        .then(response => response.json())
        .then(res => {console.log(res); props.setTrigger(false)})
        .catch(err => {console.log(err);document.querySelector('#addChemicalInfo').innerHTML='Błąd podczas dodawania';})
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie środka chemicznego</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Nazwa* <input type='text' onChange={e => setName(e.target.value)}/></label>
                    <label>Typ*
                        <select value={ppp_type_id} onChange={e => setType(e.target.value)}>
                            <option value={1}>Nawóz</option>
                            <option value={2}>Oprysk</option>
                        </select>
                    </label>
                    <label>Ilość/opakowanie* <input type='number' onChange={e => setQuantity(e.target.value)}/></label>
                    <label>Jednostka* 
                        <select value={ppp_type_id} onChange={e => setUnit(e.target.value)}>
                            <option value={1}>Litr</option>
                            <option value={2}>Kilogram</option>
                        </select>
                    </label>
                    <label>Termin ważności* <input type='date' onChange={e => setExpDate(e.target.value)}/></label>
                    <label>Ilość zużytego środka <input type='number' onChange={e => setUsedChem(e.target.value)}/></label>
                    <label>Oznaczenie opakowania <input type='text' onChange={e => setDesignation(e.target.value)}/></label>
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addChemicalInfo'></h3>
            </section>
        </section>
    </div> : "")
}

export default AddChemicals;