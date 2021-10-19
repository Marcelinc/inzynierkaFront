import React, { useState, useEffect } from 'react';

const AddMachine = (props) => {

    const [name,setName] = useState('');
    const [number,setNumber] = useState(0);
    const [production_date,setDate] = useState('');
    //const [working_width,setWorkingWidth] = useState(null); opcjonalnie
    //const [image_path,setNumber] = useState(0); opcjonalne
    const [vehicle_type_id,setType] = useState(1);
    const [farm_id,setFarm] = useState(0);

    useEffect(() => {
        setFarm(props.farmId);
    },[])

    const addHandler = () => {
        console.log(name)
        console.log(production_date);
        console.log(number)
        console.log(vehicle_type_id);
        console.log(farm_id);

        fetch(process.env.MIX_CUSTOM_URL+'/api/machine/create',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name,production_date,number,vehicle_type_id,farm_id})
        })
        .then(response => response.json())
        .then(res => {console.log(res.data);
            const updateMachines= [...props.machines,res.data];
            props.setMachines(updateMachines);
        })
        props.setTrigger(false)
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie sprzętu</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Nazwa <input type='text' onChange={e => setName(e.target.value)}/></label>
                    <label>Rok produkcji <input type='date' onChange={e => setDate(e.target.value)}/></label>
                    <label>Numer <input type='number' onChange={e => setNumber(e.target.value)}/></label>
                    <label>Rodzaj pojazdu 
                        <select onChange={e => setType(e.target.value)}>
                            <option value='1'>Ciągnik</option>
                            <option value='2'>Opryskiwacz</option>
                            <option value='3'>Pług</option>
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

export default AddMachine;