import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Loader from "./Loader";
import Navigation from "./Navigation";

const Chat = (props) => {

    const [farm_id,setFarm] = useState(props.farmId);
    const [user_id,setUserId] = useState(props.id);
    const [message, setMessage] = useState('');
    const [sending,setSending] = useState(false);

    const [contacts,setContacts] = useState([]);
    const [workers,setWorkers] = useState([]);
    const [displayedWorkers,setDisplayedWorkes] = useState([]);
    const [searchingWorkers,setSearching] = useState('');
    const [loadingWorkers,setLoadingWorkers] = useState(true);
    const [loadingContacts,setLoadingContacts] = useState(true);
    const [loadingMessages,setLoadingMessages] = useState(false);
    const [error,setError] = useState(false);
    const [active,setActive] = useState(null);

    const [messages,setMessages] = useState([]);
    const [newMessages,setNewMessages] = useState([]);

    const [checkStatus,setCheckMessages] = useState(false);
    const [activeChatBar,setActiveBar] = useState(false);

    const [counter,setCounter] = useState(5);

    useEffect(() => {
        
        if(!props.loading && props.log){
            console.log(props.id)
            console.log(props.farmId)
            //get workers
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${props.farmId}/get-workers-names`,{
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message === 'Success'){
                    setWorkers(res.data);
                } else
                setLoadingWorkers(false);
                document.querySelector('#last') && document.querySelector('#last').scrollIntoView(true)
            })
            .catch(err => console.log(err));

            //get contcts
            fetch(process.env.REACT_APP_SERVER+`/api/chat/get-user-groups`,{
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message === 'Success'){
                    setContacts(res.data);
                } else setError(true);
                setLoadingContacts(false);
            })
            .catch(err => console.log(err));
        }
        return(() => {
            setContacts([]);
            setLoadingWorkers(true);
            setLoadingContacts(true);
            setError(false);
            setActive(null);
            setSearching('')
            setMessage('');
            setCheckMessages(false);
        })
    },[props.loading])

    useEffect(() => {
        if(!error && active){
            let status = !checkStatus;
            checkNewMessages(active.id);
            setTimeout(() => setCheckMessages(status),5000)
        }
    },[checkStatus])

    useEffect(() => {
        if(counter > 0){
            setTimeout(() => {
                let count = counter-1;
                setCounter(counter-1);
            },1300)
        }
    },[props.log,counter])

    //Creating new chat room 
    const createChatRoom = (user) => {
        fetch(process.env.REACT_APP_SERVER+`/api/chat/createGroup`,{
            method: 'POST',
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify({'guest_id':user.id}),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.message === 'Success'){
                if(res.data.isCreated){
                    setContacts([res.data.group,...contacts])
                }
                setChatRoom(res.data.group)
            } else setError(true);
        })
        .catch(err => console.log(err));
    }

    const checkNewMessages = (group_id) => {
    console.log('sprawdzanie')
        fetch(process.env.REACT_APP_SERVER+`/api/chat/group/${group_id}/get-group-messages`,{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                if(res.data){
                    setMessages(res.data)
                    console.log(res.data)
                }
            }
            //let bottom = document.querySelector('.messages').lastElementChild;
            //if(bottom) bottom.scrollIntoView(false);
        })
        .catch(err => console.log(err));
    }

    const setChatRoom = (contact) => {
        setActive(contact);
        setLoadingMessages(true)

        //get room's messages
        fetch(process.env.REACT_APP_SERVER+`/api/chat/group/${contact.id}/get-group-messages`,{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                if(res.data){
                    setMessages(res.data)
                } 
                else {
                    setMessages([]);
                }
                setCheckMessages(true);
            } else setError(true);
            setLoadingMessages(false);
            let bottom = document.querySelector('.messages').lastElementChild;
            if(bottom) bottom.scrollIntoView(false);
            
        })
        .catch(err => console.log(err));
    }

    const sendMessage = () => {
        console.log(message)
        let msg = {'message':message,'sender_id':user_id};

        setSending(true);
        //send message
        fetch(process.env.REACT_APP_SERVER+`/api/chat/group/${active.id}/send-message`,{
            method:'POST',
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify({message}),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                setMessages([...messages,msg]); 
            } else {
                msg = {'message':message+'(Wiadomość nie została wysłana)','sender_id':user_id}
                setMessages([...messages,msg]);
            }
            console.log(msg)
            setSending(false);
            setMessage('');
            let bottom = document.querySelector('.messages').lastElementChild;
            bottom.scrollIntoView(false);
        })
        .catch(err => console.log(err));

        
    }

    //search worker
    const filterHandler = (event) => {
        let reg = new RegExp(event.target.value,'i');
        let searched = workers.filter(w => w.name.match(new RegExp(event.target.value,'i'))||w.surname.match(new RegExp(event.target.value,'i')));
        setDisplayedWorkes(searched);
    }

    const slideChatBar = () => {
        const chatBar = document.querySelector('.chatBar')
        if(chatBar){
            chatBar.classList.toggle('chatBar-active')
            let activeBar = activeChatBar;
            setActiveBar(!activeBar)
        }
    }

    return(<div className='content'>
        <Navigation log={props.log} setLog={props.setLog} title={props.title} outside={true}/>
        {props.loading ? <div className="text">ŁADOWANIE...</div> : props.log ? <div className='chatContent'>
            <section className='chatBar'>
                <h3>Kontakty</h3>
                <div className='chatSearch' onChange={(e) => {filterHandler(e); setSearching(e.target.value)}}>
                    <input type='text' placeholder='Szukaj...'></input>
                    {searchingWorkers !== '' && <p id='searchWorker'>Wyniki:</p>}
                </div>
                <div className='chatContacts'>
                    {searchingWorkers !== '' && displayedWorkers.length > 0 &&
                    displayedWorkers.map(worker => <div key={worker.id} className='contact' onClick={e => createChatRoom(worker)}>
                        {worker.name + ' ' + worker.surname}
                    </div>)}
                    {searchingWorkers === '' && contacts.map(
                        (contact,index) => <div key={index} className='contact' onClick={e => setChatRoom(contact)}>
                    {contact.name + ' ' + contact.surname}
                    </div>)}
                    {loadingWorkers && loadingContacts ? 'Ładowanie..' : searchingWorkers === '' && contacts.length === 0 ? 'Brak kontaktów' :
                    searchingWorkers !== '' && displayedWorkers.length === 0 && 'Brak pracowników'}
                </div>
            </section>
            <section id='slideChatBar' onClick={slideChatBar}>{activeChatBar ? '<' : '>'}</section>
            <section className='chatData'>
                <div className='equipment-content'>
                    <h3>{active !== null ? 'Pokój rozmów: '+active.name+' '+active.surname : 'Wybierz pokój rozmów'}</h3>
                    {active && <div className='chatRoom'>
                        <div className='messages'>
                            {loadingMessages ? 'Wczytywanie...' : messages.length > 0 ? messages.map((msg,index) => 
                                <div key={index} className={msg.sender_id === user_id ? 'msg sendedMessage' : 'msg receivedMessage'}>
                                    {msg.message}
                                </div>)
                            : 'Początek rozmowy'}
                        </div>
                        <div className='inputMessages'>
                            <textarea id='msgInputArea' onChange={e => setMessage(e.target.value)} value={message} placeholder="Napisz wiadomość..">

                            </textarea>
                            <button id='sendMsgButton' onClick={sendMessage} disabled={sending}>{sending ? 'Wysyłanie...' : 'Wyślij'}</button>
                        </div>
                    </div>}
                </div>
            </section>  
        </div> : <section id='notLogged'>
            <p>Nie jesteś zalogowany</p>
            <p>{counter > 0 ? 'Przekierowanie na stronę logowania za... ' + counter : 'Przekierowywanie..' && <Redirect to='/logowanie'/>}</p>
        </section>}
    </div> )
}

export default Chat;