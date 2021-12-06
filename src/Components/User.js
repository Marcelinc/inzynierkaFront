import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import Dashboard from "./Dashboard";
import Loader from "./Loader";
import Farm from './Farm';
import OwnOrders from "./OwnOrders";
import Stats from "./Stats";
import Notifications from "./Notifications";
import '../css/farm.css';
import Garage from "./Farm/Garage/Garage";
import Crops from "./Farm/Crops/Crops";
import Chemicals from "./Farm/Chemicals/Chemicals";
import Plots from "./Farm/Plots/Plots";
import FarmManage from "./Farm/FarmManage";
import Workers from "./Farm/Workers/Workers";
import FarmCreator from "./Farm/FarmCreator";
import Navigation from "./Navigation";
import VehicleInfo from "./Farm/Garage/VehicleInfo";
import MachineInfo from "./Farm/Garage/MachineInfo";
import CropInfo from "./Farm/Crops/CropInfo";
import ChemicalsInfo from "./Farm/Chemicals/ChemicalsInfo";
import WorkerInfo from "./Farm/Workers/WorkerInfo";
import PlotsInfo from "./Farm/Plots/PlotsInfo";
import OwnOrderInfo from "./OwnOrderInfo";
import UserEdit from "./UserEdit";
import FarmOrders from "./FarmOrders";
import FarmOrderInfo from "./Farm/FarmOrderInfo";

const User = (props) => {

    const [id,setId] = useState(0);
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [user,setUser] = useState({
        name:'',
        surname:'',
        job_title:'',
        country:{id:0,name:''},
        town:'',
        email:'',
        street:'',
        house_number:'',
        flat_number:'',
        farm_id:null
    });
    const [farmId,setFarm] = useState(props.farmId);
    const [load,setLoad] = useState(true);
    const [content,setContent] = useState(props.content);
    const [editMode,setMode] = useState(false);

    const [counter,setCounter] = useState(5);

    useEffect(() => {
        //get user data
            setLoad(true)
            fetch(process.env.REACT_APP_SERVER+"/api/get_user_data",{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                'X-Requested-With':'XMLHttpRequest'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res =>  {console.log(res);if(res.message !== 'Unauthenticated.' && res.message !== 'error') { if(res.data){
                setName(res.data.name); setSurname(res.data.surname); setId(res.data.id); setUser(res.data);} 
            } setLoad(false);})
        
        return(() => {setName('');setSurname('');setId(0);setUser({});setLoad(false);setContent('');setCounter(5)})
    },[]) 

    useEffect(() => {
        if(counter > 0){
            setTimeout(() => {
                let count = counter-1;
                setCounter(counter-1);
            },1300)
        }
    },[props.log,counter])

        return(
            load ? <Loader log={props.log} setLog={props.setLog} title={user.job_title}/> : 
            <div className='content'>
                <Navigation log={props.log} setLog={props.setLog} title={user.job_title} setContent={setContent}/>
                {props.log && name ?
                    <main className='user'>
                        <Dashboard name={name} surname={surname} setLogIn={props.setLog} content={setContent} title={user.job_title} farmId={user.farm_id} id={user.id}/>
                        {content === 'farm' && <Farm content={setContent} hasFarm={user.farm_id} job_title={user.job_title}/>}
                        {content === 'myorders' && <OwnOrders setContent={setContent} userId={user.id} farmId={user.farm_id}/>}
                        {content === 'myorder' && <OwnOrderInfo setContent={setContent} farmId={user.farm_id} userId={user.id}/>}
                        {content === '' &&
                            <section className='data'>
                                <div className='userInfo'>
                                    <h3>Dane osobowe</h3>
                                    <p className='uData'>Imie: {user.name}</p>
                                    <p className='uData'>Nazwisko: {user.surname}</p>
                                    <p className='uData'>Kraj: {user.country.name}</p>
                                    <p className='uData'>Aktualne stanowisko: {user.job_title}</p>
                                    
                                </div>
                                <div className='userContact'>
                                    <h3>Dane kontaktowe</h3>
                                    <p className='uData'>Email: {user.email}</p>
                                    <p className='uData'>Miejscowość: {user.town}</p>
                                    <p className='uData'>Ulica:  {user.street}</p>
                                    <p className='uData'>Nr.domu: {user.house_number}</p>
                                    <p className='uData'>Nr. mieszkania {user.flat_number}</p>

                                </div>
                                <div className='userInfoButtons'>
                                    <button onClick={() => setMode(true)}>Edytuj dane</button>
                                </div>
                                {editMode && <UserEdit setMode={setMode} user={user} setUser={setUser}/>}
                            </section>
                        }
                        {content === 'stats' && <Stats/>}
                        {content === 'note' && <Notifications id={user.id} farmId={user.farm_id}/>}
                        {content === 'garage' && <Garage farmId={user.farm_id} type='list' setContent={setContent}/>}
                        {content === 'vehicle' && <VehicleInfo setContent={setContent}/>}
                        {content === 'machine' && <MachineInfo setContent={setContent}/>}
                        {content === 'crops' && <Crops farmId={user.farm_id} setContent={setContent}/>}
                        {content === 'crop' && <CropInfo setContent={setContent} farmId={user.farm_id}/>}
                        {content === 'chemicals' && <Chemicals farmId={user.farm_id} setContent={setContent}/>}
                        {content === 'chemical' && <ChemicalsInfo setContent={setContent}/>}
                        {content === 'workers' && <Workers farmId={user.farm_id} setContent={setContent}/>}
                        {content === 'worker' && <WorkerInfo setContent={setContent} farmId={user.farm_id} title={user.job_title}/>}
                        {content === 'plots' && <Plots farmId={user.farm_id} setContent={setContent}/>}
                        {content === 'plot' && <PlotsInfo setContent={setContent} farmId={user.farm_id} title={user.job_title}/>}
                        {content === 'farmOrders' && <FarmOrders setContent={setContent} farmId={user.farm_id} title={user.job_title}/>}
                        {content === 'farmOrder' && <FarmOrderInfo  setContent={setContent} farmId={user.farm_id} userId={user.id}/>}
                        {content === 'manage' && <FarmManage setContent={setContent} farmId={user.farm_id}/>}
                        {content === 'creator' && <FarmCreator user={id}/>}
                    </main>
                : <main className='user'>
                    <section id='notLogged'>
                        <p>Nie jesteś zalogowany</p>
                        <p>{counter > 0 ? 'Przekierowanie na stronę logowania za... ' + counter : 'Przekierowywanie..' && <Redirect to='/logowanie'/>}</p>
                    </section>
                </main>}
            </div>
        )
}

export default User;
