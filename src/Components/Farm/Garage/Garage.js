import React, { useEffect, useState, useContext } from 'react';
import AddVehicle from './AddVehicle';
import '../../../css/garage.css';
import AddMachine from './AddMachine';
import { useHistory } from 'react-router';
import { JobTitleContext } from '../../User';

const Garage = (props) => {

    const job_title = useContext(JobTitleContext);

    const [machines,setMachines] = useState([]);
    const [vehicles,setVehicles] = useState([]);

    const [loading,setloading] = useState(true);
    const [displayed,setDisplayed] = useState([]);

    var machineResources='';
    const [triggerAddV,setTriggerAddV] = useState(false);
    const [triggerAddM,setTriggerAddM] = useState(false);
   

    const [equipmentID,setEquipmentID] = useState(0);
    const [vehicle,setV] = useState({});
    const [machine,setM] = useState({});
    
    const [machineFilter,setMF] = useState(true);
    const [vehicleFilter,setVF] = useState(true);

    const history = useHistory();

    useEffect(() => {
        console.log(job_title)
        fetch(process.env.REACT_APP_SERVER+'/api/garage',{
            method:"POST",
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            setMachines(res.data.machines);
            setVehicles(res.data.vehicles);
            //setDisplayed(res.data.vehicles.concat(res.data.machines));
            //renderMachines(res.data.vehicles,'vehicle');
            //renderMachines(res.data.machines,'machine');
            console.log(res.data)
            setloading(false);
        })
        .catch(err => document.querySelector('.getDataStatus').innerHTML='Błąd podczas pobierania');

        return(() => {
            setMachines([]);
            setVehicles([]);
            setloading(true);
        })
    },[]);

    const renderMachines = (machine,type) => {
        machine.map(m => {
            machineResources=` <div class='unit ${type}'>
            <span>${m.name}</span>
            <span>${m.id}</span>
            <button class='MachInfo'>Więcej</button>
            <button class='MachEdit'>Edytuj</button>
            <button class='MachDelete'>Usuń</button>
            </div>`;
            document.querySelector('#machines').insertAdjacentHTML('beforeend',machineResources);
            console.log('Dodano '+m.name)
            
           /* let divUnit = document.createElement('div')//.classList.add(`unit ${type}`);
            let name = document.createElement('span')
            name.appendChild(document.createTextNode(m.name));
            let number = document.createElement('span')
            number.appendChild(document.createTextNode(m.id));
            let info = document.createElement('button');
            let edit = document.createElement('button').appendChild(document.createTextNode('Edytuj')); 
            let deleteB = document.createElement('button').appendChild(document.createTextNode('Usuń')); 
            info.appendChild(document.createTextNode('Więcej'));
            info.setAttribute('class','MachInfo'); 
            info.setAttribute('onclick',onInfoClick)
            divUnit.appendChild(name);
            divUnit.appendChild(number);
            divUnit.appendChild(info);
            divUnit.appendChild(edit)
            divUnit.setAttribute('class',`unit ${type}`)
            document.querySelector('#machines').appendChild(divUnit);
            //console.log(machineResources)*/
            //document.querySelector('#machines').insertAdjacentHTML('beforeend',machineResources);
        })

        
    }

    const onInfoClick = function onInfoHandler(id,type){
        console.log('info clicked '+id);
        setEquipmentID(id);
        if(type === 'v'){
            setV(vehicles.find(v => v.id === id));
            props.setContent('vehicle');
            window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/pojazd/${id}`);
        }
        else if(type === 'm'){
            setM(machines.find(m => m.id === id));
            props.setContent('machine');
            window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/sprzet/${id}`);
        }
    }

    const filterHandler = (e) => {
        const {name,checked} = e.target;
        console.log(name+': '+checked)
        if(name === 'machineFilter'){
            setMF(checked);
            if(checked)
                document.querySelectorAll('.machine').forEach(unit => unit.style.display='grid');//renderMachines(machines,'machine');
            else document.querySelectorAll('.machine').forEach(unit => unit.style.display='none');
            //document.querySelectorAll('.machine').forEach(unit => unit.remove());
        } 
        else {
            setVF(checked);
            if(checked)
            document.querySelectorAll('.vehicle').forEach(unit => unit.style.display='grid');//renderMachines(vehicles,'vehicle');
            else document.querySelectorAll('.vehicle').forEach(unit => unit.style.display='none');
        }
    }


    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Pojazdy i sprzęt rolniczy</h3>
            <div id='garageMenu'>
                <div id='options'>
                <label><input type='checkbox' name='vehicleFilter' checked={vehicleFilter} onChange={filterHandler}/> Pojazdy</label>
                <label><input type='checkbox' name='machineFilter' checked={machineFilter} onChange={filterHandler}/> Sprzęt rolniczy</label>
                </div>
                {(job_title === 'Pracownik biurowy' || job_title === 'Właściciel') &&
                <div className='addButtons'>
                    <span className='addContent' onClick={() => setTriggerAddV(true)}>+Pojazd</span>
                    <span className='addContent' onClick={() => setTriggerAddM(true)}>+Sprzęt</span>
                </div>}
            </div>
            <div id='garageLegend' className='legend'>
                    <span>Nazwa</span>
                    <span>Numer</span>
                    <span>Status</span>
                </div>
            <div id='machines'>
                {loading ? <p className='getDataStatus'>Ładowanie danych...</p>: machines.map(m => (
                        <div key={m.id} className='unit machine' onClick={() => onInfoClick(m.id,'m')}>
                            <span>{m.name}</span>
                            <span>{m.number}</span>
                            <span className='garageList_Status'>{m.status.status}</span>
                            <span className='garageList_Fuel'>-</span>
                    </div>))}
                    {vehicles.map(v => (
                        <div key={v.id} className='unit vehicle' onClick={() => onInfoClick(v.id,'v')}>
                            <span>{v.name}</span>
                            <span>{v.number}</span>
                            <span className='garageList_Status'>{v.status.status}</span>
                            <span className='garageList_Fuel'>{v.fuel_level.name}</span>
                    </div>))}
                    {/*displayed.map(d => <div key={d.id} className='unit vehicle' onClick={() => onInfoClick(d.id,'v')}>
                            <span>{d.name}</span>
                            <span>{d.number}</span>
                            <span className='garageList_Status'>{d.status.status}</span>
                </div>)*/}
            </div>
            <AddVehicle trigger={triggerAddV} setTrigger={setTriggerAddV} vehicles={vehicles} setVehicles={setVehicles} farmId={props.farmId}/>
            <AddMachine trigger={triggerAddM} setTrigger={setTriggerAddM} machines={machines} setMachines={setMachines} farmId={props.farmId}/>
        </div>
    </section>)
}

export default Garage;