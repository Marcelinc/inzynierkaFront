import React, { useState } from 'react';

const FarmCreator = (props) => {
    const [name,setName] = useState('');
    const [town,setTown] = useState('');
    const [street,setStreet] = useState('');
    const [house_number,setHouse] = useState('');
    const [budget,setBudget] = useState(0);

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [badBudget,setBadBudget] = useState(false);
    const [emptyName,setEmptyName] = useState(false);
    const [emptyTown,setEmptyTown] = useState(false);
    const [emptyStreet,setEmptyStreet] = useState(false);
    const [emptyHouse_number,setEmptyHouse_number] = useState(false);

    const createFarm = (e) => {
        e.preventDefault();
        console.log(name+' '+town+' '+street+' '+house_number+' '+budget);

        if(validation())
        {
            let user_id=props.user;
            setLoading(true);
            setError(false);
            fetch(process.env.REACT_APP_SERVER+"/api/farm",{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                    'Accept':'application/json'},
                body: JSON.stringify({name,town,street,house_number,budget}),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {
                console.log(res); 
                if(res.message && res.message === 'Success') 
                    window.location.reload();
                else
                    setError(true);
                setLoading(false);})
        }
    }

    const validation = () => {
        let validated = true;

        if(isNaN(budget)){
            setBadBudget(true);
            validated=false;
        }  
        else setBadBudget(false);

        if(!name){
            setEmptyName(true);
            validated=false;
        }
        else setEmptyName(false);

        if(!town){
            setEmptyTown(true);
            validated=false;
        }
        else setEmptyTown(false);

        if(!street){
            setEmptyStreet(true);
            validated=false;
        }
        else setEmptyStreet(false);

        if(!house_number){
            setEmptyHouse_number(true);
            validated=false;
        }
        else setEmptyHouse_number(false);

        return validated;
    }

    return(<section className='creatorContent'>
            <h2>Kreator gospodarstwa</h2>
            <form onSubmit={createFarm} className='creatorForm'>
                <input type='text' placeholder='Nazwa' name='name' onChange={e => setName(e.target.value)}/>
                <span className='info'>{emptyName ? 'Wprowadź nazwę' : ''}</span>
                <input type='text' placeholder='Miejscowość' name='towm' onChange={e => setTown(e.target.value)}/>
                <span className='info'>{emptyTown ? 'Wprowadź miejscowość' : ''}</span>
                <input type='text' placeholder='Ulica' name='street' onChange={e => setStreet(e.target.value)}/>
                <span className='info'>{emptyStreet ? 'Wprowadź ulicę' : ''}</span>
                <input type='text' placeholder='Nr domu' name='house_number' onChange={e => setHouse(e.target.value)}/>
                <span className='info'>{emptyHouse_number ? 'Wprowadź numer domu' : ''}</span>
                <input type='text' placeholder='Budżet' onChange={e => setBudget(e.target.value)}/>
                <span className='info'>{badBudget ? 'Niepoprawna wartość budżetu' : ''}</span>
                <button type='submit' className='createSubmit'>Załóż</button>
                <span className='info'>{loading ? 'Przetwarzanie...' : error ? 'Błąd podczas tworzenia gospodarstwa' : ''}</span>
            </form>
    </section>)
}

export default FarmCreator;