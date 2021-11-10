import React from 'react';
import { useState } from 'react';

const UserEdit = (props) => {

    const [name,setName] = useState(props.user.name);
    const [surname,setSurname] = useState(props.user.surname);
    const [email,setEmail] = useState(props.user.email);
    const [country_id,setCountry] = useState(1);
    const [town,setTown] = useState(props.user.town);
    const [street,setStreet] = useState(props.user.street);
    const [house_number,setHouse] = useState(props.user.house_number);
    const [flat_number,setFlat] = useState(props.user.flat_number);

    const [act_name,setActName] = useState(props.user.name);
    const [act_surname,setActSurname] = useState(props.user.surname);
    const [act_email,setActEmail] = useState(props.user.email);
    const [act_country_id,setActCountry] = useState(1);
    const [act_town,setActTown] = useState(props.user.town);
    const [act_street,setActStreet] = useState(props.user.street);
    const [act_house_number,setActHouse] = useState(props.user.house_number);
    const [act_flat_number,setActFlat] = useState(props.user.flat_number);

    const editHandler = () => {
        console.log(props.trigger)
    }

    return(props.trigger ? <div className='popup'>
    <div className='popupGarageEdit'> 
        <p>Edycja danych</p>       
        <section className='popupForm'>
            <form className='editForm'>
                <label>Imie <input type='text' value={name} onChange={(e) => setName(e.target.value)}/></label>
                <label>Nazwisko <input type='text' value={surname} onChange={(e) => setSurname(e.target.value)}/></label>
                <label>Email <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                <label>Kraj <select onChange={(e) => setCountry(e.target.value)}></select></label>
                <label>Miasto <input type='text' value={town} onChange={(e) => setTown(e.target.value)}/></label>
                <label>Ulica <input type='text' value={street} onChange={(e) => setStreet(e.target.value)}/></label>
                <label>Numer domu <input type='text' value={house_number} onChange={(e) => setHouse(e.target.value)}/></label>
                <label>Numer mieszkania <input type='text' value={flat_number} onChange={(e) => setFlat(e.target.value)}/></label>
                
            </form>
            <section className='vehicle-actions'>
                <button onClick={editHandler}>Zapisz</button>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <h3 className='info' id='editVehicleInfo'></h3>
            </section>
        </section>
    </div>
</div>: '')
}

export default UserEdit;