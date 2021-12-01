import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

const Chat = (props) => {

    const [farm_id,setFarm] = useState(props.farmId);

    const [contacts,setContacts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [active,setActive] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-workers-names`,{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                setContacts(res.data);
                console.log(res.data);
            } else setError(true);
            setLoading(false);
        })
        .catch(err => console.log(err));
    },[])

    const setChatRoom = (user) => {
        setActive(user);
    }

    return(<div className='content'>
        <Navigation log={props.log} setLog={props.setLog} title={props.title} outside={true}/>
        <div className='chatContent'>
            <section className='chatBar'>
                <h3>Kontakty</h3>
                <div className='chatSearch'>
                    <input type='text' placeholder='Szukaj...'></input>
                </div>
                <div className='chatContacts'>
                    {contacts.map(contact => <div key={contact.id} className='contact' onClick={e => setActive(contact)}>
                        {contact.name + ' ' + contact.surname}
                    </div>)}
                </div>
            </section>
            <section class='chatData'>
                <div className='equipment-content'>
                    <h3>{active !== null ? 'Pokój rozmów: '+active.name+' '+active.surname : 'Wybierz pokój rozmów'}</h3>
                </div>
            </section>  
        </div>
    </div>)
}

export default Chat;