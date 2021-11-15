import React from 'react';
import { useState } from 'react';

const UserEdit = (props) => {

    const [name,setName] = useState(props.user.name);
    const [surname,setSurname] = useState(props.user.surname);
    const [email,setEmail] = useState(props.user.email);
    const [country_id,setCountry] = useState(props.user.country.id);
    const [town,setTown] = useState(props.user.town);
    const [street,setStreet] = useState(props.user.street);
    const [house_number,setHouse] = useState(props.user.house_number);
    const [flat_number,setFlat] = useState(props.user.flat_number);

    const [act_name,setActName] = useState(props.user.name);
    const [act_surname,setActSurname] = useState(props.user.surname);
    const [act_email,setActEmail] = useState(props.user.email);
    const [act_country_id,setActCountry] = useState(props.user.country.id);
    const [act_town,setActTown] = useState(props.user.town);
    const [act_street,setActStreet] = useState(props.user.street);
    const [act_house_number,setActHouse] = useState(props.user.house_number);
    const [act_flat_number,setActFlat] = useState(props.user.flat_number);

    const [error,setError] = useState(false);
    const [noChanges,setNoChanges] = useState(false);
    const [loading,setLoading] = useState(false);

    const editHandler = () => {
        //Set body and validate
        let body= {};
        let validated = false;
        if(act_name!==name){
            body['name']=name;
            validated=true;
        }
        if(act_surname!==surname){
            body['surname']=surname;
            validated=true;
        }
        if(act_email!==email){
            body['email']=email;
            validated=true;
        }
        if(act_country_id!==country_id){
            body['country_id']=country_id;
            validated=true;
        }
         if(act_town!==town){
             body['town']=town;
             validated=true;
         } 
         if(act_street!==street){
             body['street']=street;
             validated=true;
         }
         if(act_house_number!==house_number){
             body['house_number']=house_number;
             validated=true;
         }
         if(act_flat_number!==flat_number){
             body['flat_number']=flat_number;
             validated=true;
         }    
 
         if(validated){
             setLoading(true);
             fetch(process.env.REACT_APP_SERVER+'/api/user/update',{
                 method: 'POST',
                 headers: {'Content-Type':'application/json'},
                 body: JSON.stringify(body),
                 credentials:'include'
             })
             .then(response => response.json())
             .then(res => {console.log(res.message);if(res.message === 'Success') {
                 const updatedUser = props.user;
                 Object.keys(body).forEach(key => {updatedUser[key]=body[key];})
                 props.setUser(updatedUser);
                 //setNoChanges(true)
                 setLoading(false);
                 props.setMode(false);
             }})
             .catch(err => {console.log(err);
                 setError(true)});
        } else setNoChanges(true);
     }


    const onCancelHandler = () => {
        props.setMode(false);
        setError(false);
        setNoChanges(false);
    }

    return(<div className='popup'>
    <div className='popupGarageEdit'> 
        <p>Edycja danych</p>       
        <section className='popupForm'>
            <form className='editForm'>
                <label>Imie <input type='text' value={name} onChange={(e) => setName(e.target.value)}/></label>
                <label>Nazwisko <input type='text' value={surname} onChange={(e) => setSurname(e.target.value)}/></label>
                <label>Email <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                <label>Kraj <select onChange={(e) => setCountry(e.target.value)}>
                    <option value={country_id}>{props.user.country.name}</option>    
                </select></label>
                <label>Miasto <input type='text' value={town} onChange={(e) => setTown(e.target.value)}/></label>
                <label>Ulica <input type='text' value={street} onChange={(e) => setStreet(e.target.value)}/></label>
                <label>Numer domu <input type='text' value={house_number} onChange={(e) => setHouse(e.target.value)}/></label>
                <label>Numer mieszkania <input type='text' value={flat_number} onChange={(e) => setFlat(e.target.value)}/></label>
                
            </form>
            <section className='vehicle-actions'>
                <button onClick={editHandler}>Zapisz</button>
                <button onClick={onCancelHandler}>Anuluj</button>
                <h3 className='info' id='editVehicleInfo'>{loading ? 'Zapisywanie zmian...' : 
                    (error ? 'Wystąpił problem podczas edycji!' : (noChanges ? 'Wprowadź jakieś zmiany!' : !noChanges && ''))}                    
                </h3>
            </section>
        </section>
    </div>
</div>)
}

export default UserEdit;