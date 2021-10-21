import React, { useState } from 'react';

const AddChemicals = (props) => {

    const [name,setName] = useState('');
    const [exp_date,setExpDate] = useState('');
    const [quantity,setQuantity] = useState('');
    const [usedChem,setUsedChem] = useState(0);
    const [designation,setDesignation] = useState(3);//dopisane

    const addHandler = () => {
        console.log(name)
        console.log(exp_date);
        console.log(quantity)
        console.log(usedChem)
        console.log(designation)
        /*fetch(process.env.REACT_APP_SERVER+'/api/vehicle',{
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
            <p>Dodawanie środka chemicznego</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Nazwa <input type='text' onChange={e => setName(e.target.value)}/></label>
                    <label>Rodzaj pojazdu 
                        <select>
                            <option value='ciagnik'>Oprysk</option>
                            <option value='kombajn'>Nawóz</option>
                        </select>
                    </label>
                    <label>Termin ważności <input type='date' onChange={e => setExpDate(e.target.value)}/></label>
                    <label>Ilość środka w opakowaniu <input type='number' onChange={e => setQuantity(e.target.value)}/></label>
                    <label>Jednostka 
                        <select>
                            <option value='ciagnik'>Litr</option>
                            <option value='kombajn'>Kilogram</option>
                        </select>
                    </label>
                    <label>Ilość zużytego środka <input type='number' onChange={e => setUsedChem(e.target.value)}/></label>
                    <label>Oznaczenie opakowania <input type='text' onChange={e => setDesignation(e.target.value)}/></label>
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
            </section>
        </section>
    </div> : "")
}

export default AddChemicals;