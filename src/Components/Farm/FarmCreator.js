import React, { useState } from 'react';

const FarmCreator = (props) => {
    const [name,setName] = useState('');
    const [town,setTown] = useState('');
    const [street,setStreet] = useState('');
    const [house_number,setHouse] = useState('');
    const [budget,setBudget] = useState(0);

    const createFarm = (e) => {
        e.preventDefault();
        console.log(name+' '+town+' '+street+' '+house_number+' '+budget);

        let user_id=props.user;
        let farmBody = new URLSearchParams();
        farmBody.append('name',name);
        farmBody.append('town',town);
        farmBody.append('street',street);
        farmBody.append('house_number',house_number);
        farmBody.append('budget',budget);

        fetch(process.env.MIX_CUSTOM_URL+"/api/farm",{
            method: 'PUT',
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            body: farmBody,
            credentials:'include'
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
            <button type='submit'>Załóż</button>
        </form>
    </section>)
}

export default FarmCreator;