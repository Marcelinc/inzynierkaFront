import React, { useState } from 'react';

const FarmCreator = (props) => {
    const [name,setName] = useState('');
    const [town,setTown] = useState('');
    const [street,setStreet] = useState('');
    const [house_number,setHouse] = useState('');
    const [budget,setBudget] = useState(0);
    const [access_code,setCode] = useState('');

    const createFarm = (e) => {
        e.preventDefault();
        console.log(name+' '+town+' '+street+' '+house_number+' '+budget+' '+access_code);

        let user_id=props.user;

        fetch(process.env.MIX_CUSTOM_URL+"/api/farm",{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            //credentials: 'include',
            body: JSON.stringify({user_id,name,town,street,house_number,budget,access_code})
        })
    }

    return(<section className='data'>
        <h2>Kreator gospodarstwa</h2>
        <form onSubmit={createFarm}>
            <input type='text' placeholder='Nazwa' name='name' onChange={e => setName(e.target.value)}/>
            <input type='text' placeholder='Miejscowość' name='towm' onChange={e => setTown(e.target.value)}/>
            <input type='text' placeholder='Ulica' name='street' onChange={e => setStreet(e.target.value)}/>
            <input type='text' placeholder='Nr domu' name='house_number' onChange={e => setHouse(e.target.value)}/>
            <input type='text' placeholder='Budżet' onChange={e => setBudget(e.target.value)}/>
            <input type='text' placeholder='Kod dostępu' onChange={e => setCode(e.target.value)}/>
            <button type='submit'>Załóż</button>
        </form>
    </section>)
}

export default FarmCreator;