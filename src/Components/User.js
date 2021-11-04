import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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

const User = (props) => {

    const [id,setId] = useState(0);
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [user,setUser] = useState({
        name:'',
        surname:'',
        job_title:'',
        country:'',
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

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+"/api/get_user_data",{
            method: 'POST',
            headers: {'Content-Type':'application/json',
            'X-Requested-With':'XMLHttpRequest'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res =>  {console.log(res);if(res.message !== 'Unauthenticated.' && res.message !== 'error') {setName(res.data.name); setSurname(res.data.surname); setId(res.data.id); setUser(res.data)} setLoad(false);})
        return(() => {setName('');setSurname('');setId(0);setUser({});setLoad();setContent('')})
    },[])

    

    if(load)
        return(<Loader log={props.log} setLog={props.setLog} title={user.job_title}/>)

        return(<div className='content'>
                <Navigation log={props.log} setLog={props.setLog} title={user.job_title}/>
                {props.log && name ?
                    <main className='user'>
                        <Dashboard name={name} surname={surname} setLogIn={props.setLog} content={setContent} title={user.job_title}/>
                        {content === 'farm' && <Farm content={setContent} hasFarm={user.farm_id}/>}
                        {content === 'zlecenia' && <OwnOrders/>}
                        {content === '' &&
                            <section className='data'>
                                <div className='userInfo'>
                                    <h3>Dane osobowe</h3>
                                    <p className='uData'>Imie: {user.name}</p>
                                    <p className='uData'>Nazwisko: {user.surname}</p>
                                    <p className='uData'>Kraj: {user.country}</p>
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
                                    <button>Edytuj dane</button>
                                </div>
                            </section>
                        }
                        {content === 'stats' && <Stats/>}
                        {content === 'note' && <Notifications/>}
                        {content === 'garage' && <Garage farmId={farmId} type='list' setContent={setContent}/>}
                        {content === 'vehicle' && <VehicleInfo setContent={setContent}/>}
                        {content === 'machine' && <MachineInfo setContent={setContent}/>}
                        {content === 'crops' && <Crops farmId={user.farm_id} setContent={setContent}/>}
                        {content === 'crop' && <CropInfo setContent={setContent}/>}
                        {content === 'chemicals' && <Chemicals farmId={user.farm_id}/>}
                        {content === 'workers' && <Workers/>}
                        {content === 'plot' && <Plots/>}
                        {content === 'manage' && <FarmManage/>}
                        {content === 'creator' && <FarmCreator user={id}/>}
                    </main>
                : <main className='user'><p>You are not logged</p></main>}
            </div>
        )
}

export default User;
